import _ from 'lodash';
import _wni, { WNInterface as _WNInterface } from './lib/WNInterface';

export class WNInterface extends _WNInterface {
  isReady: boolean | undefined;
  appVersion: string | undefined;
  debug(payload: any) {
    if (this.isNative) {
      const message: string = _.isString(payload)
        ? payload
        : JSON.stringify(payload);
      this.execute('wnLog', { message });
    }
  }
}

const plugin = {
  install: (app: any, options = {}) => {
    const wni = _wni as WNInterface;

    if (window.WNInterface.isNative) {
      window.addEventListener('DOMContentLoaded', async event => {
        await window.WNInterface.execute('wnWebContentLoaded', {});
      });
    }

    wni.onReady((e: any) => {
      if (wni.interfaceVersion === e.interfaceVersion) {
        wni.isReady = true;
        wni.appVersion = e.appVersion;
      }
    });

    if (typeof app === 'function') {
      // Vue 2
      app.wni = wni;

      Object.defineProperties(app.prototype, {
        wni: {
          get() {
            return app.wni;
          },
        },
        debug: {
          get() {
            return app.wni.debug;
          },
        },
      });
    } else if (app.config) {
      // Vue 3
      app.config.globalProperties.wni = wni;
    }
  },
};

export function useWNInterface(): WNInterface {
  return window.WNInterface;
}

export default plugin;
