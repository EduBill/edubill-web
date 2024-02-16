import _ from 'lodash';
import debug from 'debug';

const logger = {
  log: debug('wni:log'),
};

const WNInterfaceVersion = '0.8.6';

interface NativeInterface {
  postMessage: Function;
}

declare global {
  namespace NodeJS {
    export interface Process {
      env: any;
    }
  }

  interface Window {
    WNInterface: any;

    VirtualInterface?: NativeInterface;
    NativeAndroid?: NativeInterface;
    webkit?: {
      messageHandlers: {
        NativeiOS: NativeInterface;
      };
    };
  }
}

const InterfaceType = {
  Android: 'Android',
  iOS: 'iOS',
  Emulator: 'Emulator',
  Unknown: 'Unknown',
};

const InterfaceEvent = {
  Ready: 'init-page',
  Appear: 'appear-page',
  Disappear: 'disappear-page',
  Pause: 'pause-page',
  Resume: 'resume-page',
  Back: 'back',
  RemoteNotification: 'remote-notification',
  Keyboard: 'keyboard',
  Link: 'link',
  Custom: 'custom',
};

const utils = {
  isJSONString(str: string): boolean {
    if (typeof str === 'string' && str.length > 1) {
      const firstChat = str.substring(0, 1);
      if (firstChat === '{' || firstChat === '[') {
        return true;
      }
    }
    return false;
  },

  objectFromString(str: string | any): any {
    if (utils.isJSONString(str)) {
      try {
        const obj = JSON.parse(str);
        for (const key in obj) {
          obj[key] = utils.objectFromString(obj[key]);
        }
        return obj;
      } catch (e) {
        return str;
      }
    }
    return str;
  },
};

class NativeProxyInterface {
  private _customUserAgent: string;
  private _type: string;

  get userAgent() {
    if (window && window.navigator && window.navigator.userAgent) {
      return window.navigator.userAgent + ' ' + this._customUserAgent;
    }
    return this._customUserAgent;
  }

  get type() {
    return this._type;
  }

  _detectInterfaceType() {
    const userAgent = this.userAgent.toUpperCase();
    if (userAgent.match(/wnemulator/i)) {
      return InterfaceType.Emulator;
    } else if (userAgent.match(/iphone|ipad|ipod/i)) {
      return InterfaceType.iOS;
    } else if (userAgent.match(/android/i)) {
      return InterfaceType.Android;
    }
    return InterfaceType.Unknown;
  }

  constructor(userAgent: string) {
    this._customUserAgent = userAgent || '';
    this._type = this._detectInterfaceType();
  }

  execute(payload: any) {
    // logger.log('NativeProxyInterface - execute', payload)

    return new Promise((resolve, reject) => {
      const message = JSON.stringify(payload);

      if (this._type === InterfaceType.Android) {
        if (window.NativeAndroid) {
          try {
            const result = window.NativeAndroid.postMessage(message);
            resolve(result);
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error('No native API founds.'));
        }
      } else if (this._type === InterfaceType.iOS) {
        if (
          window.webkit?.messageHandlers &&
          window.webkit?.messageHandlers.NativeiOS
        ) {
          try {
            const result =
              window.webkit?.messageHandlers.NativeiOS.postMessage(message);
            resolve(result);
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error('No native API founds.'));
        }
      } else if (this._type === InterfaceType.Emulator) {
        if (window.VirtualInterface) {
          try {
            const result = window.VirtualInterface.postMessage(message);
            resolve(result);
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error('VirtualInterface is not found.'));
        }
      } else {
        reject(new Error('No native API founds.'));
      }
    });
  }
}

class WNRequestInvoker {
  private _target: any;
  private _interfaceVersion: string;
  private _command: string;
  private _data: any;
  private _async: boolean;
  private _error: Error | null;

  _mappingFunctions(data: any) {
    const mappingData: any = {};
    for (const key in data) {
      const value = data[key];
      logger.log('_mappingFunctions', key, typeof value);

      if (typeof value === 'function') {
        mappingData[key] = window.WNInterface.cb(value);
      } else {
        mappingData[key] = value;
      }
    }
    return mappingData;
  }

  constructor(target: any, interfaceVersion: string, options: any) {
    logger.log(target, interfaceVersion, options);

    const { command, data } = options;

    this._target = target;
    this._interfaceVersion = interfaceVersion || '';
    this._command = command || '';
    this._data = data || {};
    this._async = false; // 쓸일이...
    this._error = null;
  }

  execute() {
    logger.log('WNRequestInvoker - execute', this._command, this._data);
    return this._target.execute({
      version: this._interfaceVersion,
      payload: {
        command: this._command,
        data: this._mappingFunctions(this._data),
      },
    });
  }
}

class WNResponse {
  private _responder: WNResponder;
  private _context: any;
  private _group: string;
  private _event: string;
  private _key: string;
  private _expired: boolean;
  private _progressing: boolean;
  private _handler: Function;

  get group() {
    return this._group;
  }

  get event() {
    return this._event;
  }

  get key() {
    return this._key;
  }

  get isExpired() {
    return this._expired;
  }

  get isProgressing() {
    return this._progressing;
  }

  constructor(responder: WNResponder, options: any) {
    const { group, event, context, callback } = options;

    this._responder = responder;
    this._group = group || responder.generateGroup();
    this._event = event || responder.generateEvent();
    this._key = responder.generateKey();
    this._context = context;
    this._handler = callback;
    this._expired = false;
    this._progressing = false;

    // @TODO: _progressing 처리 필요
  }

  execute() {
    // logger.log('WNResponse - execute', this._group, this._event, this._key)

    const params: any[] = [];
    _.each(arguments, arg => {
      const param = typeof arg === 'string' ? utils.objectFromString(arg) : arg;
      params.push(param);
    });

    if (this._expired) {
      console.warn('WNInterface Response ', this.toString(), ' was expired.');
      return;
    }

    this._progressing = true;
    this._handler.apply(this._context, params);
    this._progressing = false;
  }

  expire(inGroup: boolean = false) {
    if (inGroup === true) {
      this._responder.invalidate(this.group, this.event);
    } else {
      this._expired = true;
    }
  }

  toString() {
    return `WNInterface.responder.pool[\'${this.group}\'][\'${this.event}\'][\'${this.key}\'].execute`;
  }
}

class WNResponder {
  private _pool: any;
  private _initialInfo: any;
  private _responseIndex: number;

  get pool() {
    return this._pool;
  }

  get initialInfo() {
    return this._initialInfo || null;
  }

  seed(seed?: number) {
    seed = seed === undefined ? +new Date() : seed;
    seed = Math.sin(seed) * 10000;
    return seed - Math.floor(seed);
  }

  generateKey() {
    this._responseIndex = this._responseIndex + 1;
    return 'key' + this._responseIndex;
  }

  generateEvent() {
    return 'e' + Math.round(this.seed(+new Date() / 1000) * 10000);
  }

  generateGroup() {
    return 'g' + Math.round(this.seed(+new Date() / 1000) * 10000);
  }

  constructor() {
    this._responseIndex = 0;
    this._initialInfo = null;
    this._pool = {};
  }

  add(response: WNResponse) {
    const group = response.group;
    const event = response.event;
    const key = response.key;

    if (this._pool[group] === undefined) {
      this._pool[group] = {};
    }

    if (this._pool[group][event] === undefined) {
      this._pool[group][event] = {};
    }

    this._pool[group][event][key] = response;
  }

  remove(response: WNResponse) {
    const group = response.group;
    const event = response.event;
    const key = response.key;

    if (
      this._pool[group] &&
      this._pool[group][event] &&
      this._pool[group][event][key]
    ) {
      const response = this._pool[group][event][key];
      response.expire();

      this._pool[group][event][key] = null;
      delete this._pool[group][event][key];
    }
  }

  clear(group: string, event?: string, key?: string) {
    if (
      this._pool[group] &&
      event &&
      this._pool[group][event] &&
      key &&
      this._pool[group][event][key]
    ) {
      const response = this._pool[group][event][key];
      response.expire();

      this._pool[group][event][key] = null;
      delete this._pool[group][event][key];
    } else if (this._pool[group] && event && this._pool[group][event]) {
      for (const k in this._pool[group][event]) {
        const response = this._pool[group][event][k];
        response.expire();
      }

      this._pool[group][event] = null;
      delete this._pool[group][event];
    } else if (this._pool[group]) {
      for (const e in this._pool[group]) {
        for (const k in this._pool[group][e]) {
          const response = this._pool[group][e][k];
          response.expire();
        }
      }

      this._pool[group] = null;
      delete this._pool[group];
    }
  }

  invalidate(group: string, event?: string, key?: string) {
    if (
      this._pool[group] &&
      event &&
      this._pool[group][event] &&
      key &&
      this._pool[group][event][key]
    ) {
      const response = this._pool[group][event][key];
      response.expire();
    } else if (this._pool[group] && event && this._pool[group][event]) {
      for (const k in this._pool[group][event]) {
        const response = this._pool[group][event][k];
        response.expire();
      }
    } else if (this._pool[group]) {
      for (const e in this._pool[group]) {
        for (const k in this._pool[group][e]) {
          const response = this._pool[group][e][key];
          response.expire();
        }
      }
    }
  }

  batch(event: string, data: any) {
    // logger.log('WNResponder - batch', group)

    for (const group in this._pool) {
      if (this._pool[group][event]) {
        for (const key in this._pool[group][event]) {
          const response = this._pool[group][event][key];
          response.execute(data);
        }
      }
    }
  }

  onInitPage(eventString: string) {
    const info = JSON.parse(eventString);
    this._initialInfo = info;
    this.batch(InterfaceEvent.Ready, info);
  }

  onAppearPage(eventString: string) {
    const info = JSON.parse(eventString);
    this.batch(InterfaceEvent.Appear, info);
  }

  onDisappearPage(eventString: string) {
    const info = JSON.parse(eventString);
    this.batch(InterfaceEvent.Disappear, info);
  }

  onPausePage(eventString: string) {
    const info = JSON.parse(eventString);
    this.batch(InterfaceEvent.Pause, info);
  }

  onResumePage(eventString: string) {
    const info = JSON.parse(eventString);
    this.batch(InterfaceEvent.Resume, info);
  }

  onBackPage(eventString: string) {
    const info = JSON.parse(eventString);
    this.batch(InterfaceEvent.Back, info);
  }

  onRemoteNotification(eventString: string) {
    const info = JSON.parse(eventString);
    this.batch(InterfaceEvent.RemoteNotification, info);
  }

  onLink(eventString: string) {
    const info = JSON.parse(eventString);
    this.batch(InterfaceEvent.Link, info);
  }

  onKeyboard(eventString: string) {
    const info = JSON.parse(eventString);
    this.batch(InterfaceEvent.Keyboard, info);
  }

  onCustom(eventString: string) {
    const info = JSON.parse(eventString);
    this.batch(InterfaceEvent.Custom, info);
  }
}

export class WNInterface {
  private _nativeInterface: NativeProxyInterface;
  private _responder: WNResponder;

  get version() {
    return WNInterfaceVersion;
  }

  get interfaceVersion() {
    return 'v1';
  }

  get native() {
    return this._nativeInterface;
  }

  get responder() {
    return this._responder;
  }

  get isNative() {
    return this._nativeInterface.userAgent.indexOf('WNInterface') !== -1
      ? true
      : false;
  }

  get isEmulator() {
    return this._nativeInterface.type === InterfaceType.Emulator;
  }

  get isIOS() {
    return this._nativeInterface.type === InterfaceType.iOS;
  }

  get isAndroid() {
    return this._nativeInterface.type === InterfaceType.Android;
  }

  constructor(props: any) {
    const { customUserAgent } = props;

    this._responder = new WNResponder();
    this._nativeInterface = new NativeProxyInterface(customUserAgent);
  }

  async execute(command: string, data: any) {
    logger.log('WNInterface - execute', command, data);

    try {
      const invoker = new WNRequestInvoker(
        this._nativeInterface,
        this.interfaceVersion,
        { command, data }
      );
      return await invoker.execute();
    } catch (e) {
      logger.log('error', e);
    }
  }

  on(eventName: string, callback: Function, context?: any) {
    const response = new WNResponse(this._responder, {
      context: context || this,
      group: context ? context.toString() : 'global',
      event: eventName,
      callback,
    });

    this._responder.add(response);

    return response;
  }

  off(eventName: string, context?: any) {
    const group = context ? context.toString() : 'global';
    this._responder.clear(group, eventName);
  }

  cb(callback: Function, context?: any) {
    const response = new WNResponse(this._responder, {
      context: context || this,
      group: context ? context.toString() : 'global',
      callback,
    });

    this._responder.add(response);

    return response.toString();
  }

  clear(context?: any) {
    const group: string = context ? context.toString() : 'global';
    this._responder.clear(group);
  }

  clearEvent(eventName: string, context?: any) {
    const group: string = context ? context.toString() : 'global';
    this._responder.clear(group, eventName);
  }

  clearEvents(context?: any) {
    const group: string = context ? context.toString() : 'global';
    this._responder.clear(group);
  }

  onReady(callback: Function, context?: any) {
    if (this._responder.initialInfo) {
      setTimeout(() => {
        callback(this._responder.initialInfo);
      }, 0);
      return;
    }

    this.on(InterfaceEvent.Ready, callback, context);
  }

  onAppear(callback: Function, context?: any) {
    this.on(InterfaceEvent.Appear, callback, context);
  }

  onDisappear(callback: Function, context?: any) {
    this.on(InterfaceEvent.Disappear, callback, context);
  }

  onPause(callback: Function, context?: any) {
    this.on(InterfaceEvent.Pause, callback, context);
  }

  onResume(callback: Function, context?: any) {
    this.on(InterfaceEvent.Resume, callback, context);
  }

  onBack(callback: Function, context?: any) {
    this.on(InterfaceEvent.Back, callback, context);
  }

  onRemoteNotification(callback: Function, context?: any) {
    this.on(InterfaceEvent.RemoteNotification, callback, context);
  }

  onKeyboard(callback: Function, context?: any) {
    this.on(InterfaceEvent.Keyboard, callback, context);
  }

  onLink(callback: Function, context?: any) {
    this.on(InterfaceEvent.Link, callback, context);
  }

  onCustom(callback: Function, context?: any) {
    this.on(InterfaceEvent.Custom, callback, context);
  }
}

const wni = new WNInterface({
  customUserAgent: process.env.VUE_APP_USE_WNEMULATOR
    ? 'WNEmulator WNInterface/v1'
    : '',
});

window.WNInterface = wni;

export default wni;
