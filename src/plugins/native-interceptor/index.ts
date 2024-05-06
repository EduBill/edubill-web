import { useWNInterface, WNInterface } from '../vue-wni';
import {
  clearWatch,
  getCurrentLocation,
  getLocationPermission,
  watchLocation,
} from './modules/web.location';

const wni = useWNInterface();

export function useNativeInterceptor() {
  const nativeInterceptor = new NativeInterceptor();
  nativeInterceptor.initialize();
  return nativeInterceptor;
}

export class NativeInterceptor {
  _wni: WNInterface;
  _bindedCommands: any;
  _loaded: boolean;
  _nativeComponents: any;

  get isNative() {
    return this._wni.isNative;
  }

  constructor() {
    this._wni = useWNInterface();
    this._loaded = false;
    this._nativeComponents = {};
  }

  unload() {
    this._loaded = true;
  }

  initialize() {
    this._loaded = true;

    this._bindedCommands = {
      wnLocationPermission: this.wnLocationPermission,
      wnLocationCurrent: this.wnLocationCurrent,
      wnLocationUpdating: this.wnLocationUpdating,
      wnLocationUpdatingStop: this.wnLocationUpdatingStop,
      wnOpenURL: this.wnOpenURL,
      wnEmailSend: this.wnEmailSend,
      wnMediaPhotoUpload: this.wnMediaPhotoUpload,
      wnPopupOpen: this.wnPopupOpen,
      wnPopupClose: this.wnPopupClose,
      wnClipboardCopy: this.wnClipboardCopy,
      wnOpenAppSetting: this.wnOpenAppSetting,
      wnPermission: this.wnPermission,
      wnAnalyticsAmplitudeSendEvent: this.wnAnalyticsAmplitudeSendEvent,
      wnPushRegister: this.wnPushRegister,
    };
  }

  canDelegate(command, options) {
    if (this._loaded && this._bindedCommands[command]) {
      return true;
    }

    return false;
  }

  get isShowNativeComponents() {
    return Object.keys(this._nativeComponents).length > 0;
  }

  closeNativeComponents() {
    if (this._nativeComponents.wnQRScanner) {
      this.execute('wnCloseQRScanner', {});
    } else if (this._nativeComponents.wnPopup) {
      this.execute('wnPopupClose', {});
    }
  }

  execute(command, options) {
    if (command === 'wnPopupOpen') {
      this._nativeComponents.wnPopup = true;
    } else if (command === 'wnPopupClose') {
      this._nativeComponents.wnPopup = null;
      delete this._nativeComponents.wnPopup;
    }

    if (this._bindedCommands[command]) {
      if (this._wni.isNative) {
        this._wni.execute(command, options);
      } else {
        this._bindedCommands[command](options);
      }
    }
  }

  async wnLocationPermission(options) {
    const status = await getLocationPermission();
    options.callback({
      status,
    });
  }

  async wnLocationCurrent(options) {
    const { latitude, longitude } = (await getCurrentLocation({})) as any;
    options.callback({
      status: 'SUCCESS',
      latitude,
      longitude,
    });
  }

  async wnLocationUpdating(options) {
    const { watch_id, latitude, longitude } = (await watchLocation({
      handler: ({ watch_id, latitude, longitude }) => {
        options.callback({
          status: 'UPDATING',
          watch_id,
          latitude,
          longitude,
        });
      },
    })) as any;

    options.callback({
      status: 'SUCCESS',
      watch_id,
      latitude,
      longitude,
    });
  }

  async wnLocationUpdatingStop(options) {
    await clearWatch();
    options.callback({
      status: 'SUCCESS',
    });
  }

  wnOpenURL(options) {
    window.open(options.url, '__WN_BLANK__');
  }

  wnPopupOpen(options) {
    window.open(options.url, '__WN_POPUP__');
  }

  wnPopupClose(options) {
    //  @TODO: __WN_POPUP__ 팝업 닫기 필요
    return true;
  }

  wnMediaPhotoUpload(options) {
    // @TODO: 웹용으로 구현 필요
    return true;
  }

  wnClipboardCopy(options) {
    navigator.clipboard.writeText(options.text).then(() => {
      console.log('success copy');
    });

    // console.log(options.text);
    // if (options.text) {
    //   navigator.clipboard
    //     .writeText(options.text)
    //     .then(() => {
    //       toastModule.show({ type: ToastType.ALERT, message: $t('주소가 클립보드에 복사되었어요') });
    //     })
    //     .catch(() => {
    //       toastModule.show({ type: ToastType.ERROR, message: $t('클립보드 복사 중에 오류가 발생했어요') });
    //     });
    // } else {
    //   toastModule.show({ type: ToastType.ERROR, message: $t('주소를 입력해 주세요') });
    // }
  }
  wnEmailSend(options) {}

  wnOpenAppSetting() {}

  wnPermission(options) {
    const type = {
      camera: 'camera',
      location: 'geolocation',
    };

    if (navigator.permissions) {
      navigator.permissions.query({ name: type[options.type] }).then(result => {
        //prompt인 상태값만 받아오는 permission API이므로 GRANTED로 보내준후 권한 허용 여부 선택 하도록 하기위해 PROMPT또한 GRANTED로 상태값 보냄
        if (
          result.state.toUpperCase() === 'GRANTED' ||
          result.state.toUpperCase() === 'PROMPT'
        ) {
          options.callback({
            status: 'GRANTED',
          });
        } else {
          options.callback({
            status: result.state.toUpperCase(),
          });
        }
      });
    } else {
      options.callback({
        status: 'GRANTED',
      });
    }
  }

  wnAnalyticsAmplitudeSendEvent() {
    console.log('####');
  }

  wnPushRegister(options) {
    console.log('####');
  }
}
