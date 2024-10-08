// 웹용 위치정보 모듈

export enum LOCATION_PERMISSION {
  UNKNOWN = 'unknown',
  PROMPT = 'prompt',
  DENIED = 'denied',
  GRANTED = 'granted',
  LIMITED = 'limited',
  RESTRICTED = 'restricted',
}

// Before
export function getLocationPermission() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      let permission: String = LOCATION_PERMISSION.UNKNOWN;
      switch (result.state.toUpperCase()) {
        case 'DENIED':
          permission = LOCATION_PERMISSION.DENIED;
          break;
        case 'GRANTED':
          permission = LOCATION_PERMISSION.GRANTED;
          break;
        case 'PROMPT':
          permission = LOCATION_PERMISSION.PROMPT;
          await getCurrentLocation({ maximumAge: 0 });
          permission = LOCATION_PERMISSION.GRANTED;
          break;
        default:
          permission =
            (result.state && result.state.toUpperCase()) ||
            LOCATION_PERMISSION.UNKNOWN;
          break;
      }
      resolve(permission);
    } catch (e) {
      reject(e);
    }
  });
}

export function getCurrentLocation(options) {
  // eslint-disable-next-line require-await, no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof navigator?.geolocation?.getCurrentPosition !== 'function') {
        throw new Error('Not Found Coords(getCurrentLocation)');
      }

      const success = result => {
        if (!result?.coords) {
          reject(new Error('Not Found Coords(coords)'));
          return;
        }

        // eslint-disable-next-line no-unsafe-optional-chaining
        const { latitude, longitude } = result?.coords;
        resolve({
          latitude,
          longitude,
        });
      };

      const error = e => {
        reject(e);
      };

      navigator.geolocation?.getCurrentPosition(success, error, {});
    } catch (e) {
      reject(e);
    }
  });
}

let __LOCATION_WATCH_ID__: number | null = null;

export function watchLocation(options: { handler: Function }) {
  // eslint-disable-next-line require-await, no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof navigator?.geolocation?.watchPosition !== 'function') {
        reject(new Error('Not Found Coords(watchPosition)'));
        return;
      }

      // eslint-disable-next-line prefer-const
      let watchId: number;
      let isSent = false;

      if (__LOCATION_WATCH_ID__) {
        navigator?.geolocation?.clearWatch(__LOCATION_WATCH_ID__);
        __LOCATION_WATCH_ID__ = null;
      }

      const success = result => {
        if (!result || !result?.coords) {
          reject(new Error('Not Found Coords(coords)'));
          return;
        }

        const { latitude, longitude } = result.coords;

        if (options.handler) {
          options.handler({
            watch_id: watchId.toString(),
            latitude,
            longitude,
          });
        }

        if (!isSent) {
          isSent = true;

          resolve({
            watch_id: watchId.toString(),
            latitude,
            longitude,
          });
        }
      };

      const error = e => {
        if (!isSent) {
          reject(e);
        } else {
          console.error(e);
        }
      };

      watchId = navigator.geolocation?.watchPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
      __LOCATION_WATCH_ID__ = watchId;
    } catch (e) {
      reject(e);
    }
  });
}

export function clearWatch() {
  // eslint-disable-next-line require-await, no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof navigator?.geolocation?.clearWatch !== 'function') {
        reject(new Error('Not Found Coords(clearWatch)'));
        return;
      }

      if (__LOCATION_WATCH_ID__) {
        navigator?.geolocation?.clearWatch(__LOCATION_WATCH_ID__);
        __LOCATION_WATCH_ID__ = null;
      }

      resolve({ watch_id: __LOCATION_WATCH_ID__ });
    } catch (e) {
      reject(e);
    }
  });
}
