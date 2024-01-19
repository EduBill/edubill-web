import { useWNInterface, WNInterface } from '../../plugins/vue-wni';

export function useStorageStore() {
  return new StorageModule();
}

export class StorageModule {
  private _isNative: boolean;
  private _cached: any;

  constructor() {
    this._isNative = useWNInterface().isNative;
    this._cached = {};
  }

  loadCaches(keys) {
    return new Promise((resolve, reject) => {
      if (this._isNative) {
        useWNInterface().execute('wnDataStorageGetAll', {
          // trunk-ignore(eslint/object-shorthand)
          keys: keys,
          callback: ({ status, values }) => {
            if (status !== 'SUCCESS') {
              reject(new Error(status));
              return;
            }

            for (const key in values) {
              this._cached[key] = decodeURIComponent(values[key]);
            }

            resolve(values);
          },
        });
      } else {
        const values = {};
        keys.forEach(key => {
          const value = window.localStorage.getItem(key);
          values[key] = decodeURIComponent(value);
        });
        resolve(values);
      }
    });
  }

  getCache(key) {
    return this._cached[key];
  }

  get(key) {
    return new Promise((resolve, reject) => {
      try {
        if (this._isNative) {
          useWNInterface().execute('wnDataStorageGet', {
            // trunk-ignore(eslint/object-shorthand)
            key: key,
            callback: ({ status, key, value }) => {
              if (status !== 'SUCCESS') {
                reject(new Error(status));
                return;
              }

              // this._cached[key] = value;
              resolve(decodeURIComponent(value));
            },
          });
        } else {
          const value = window.localStorage.getItem(key);
          resolve(decodeURIComponent(value));
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      try {
        if (this._isNative) {
          useWNInterface().execute('wnDataStorageSet', {
            key: key,
            value: encodeURIComponent(value),
            callback: ({ status }) => {
              if (status !== 'SUCCESS') {
                reject(new Error(status));
                return;
              }
              resolve(true);
            },
          });
        } else {
          window.localStorage.setItem(key, encodeURIComponent(value));
          resolve(true);
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}
