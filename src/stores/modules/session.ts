import { defineStore } from 'pinia';
import { setAccessToken } from '@/modules/axios';
import { StorageModule } from '@/modules/storage';

const storage = new StorageModule();

const __SESSION_TOKEN__ = '__SESSION_TOKEN__';

interface SessionState {
  profile: any;
  token: string;
  terms: any;

  sdkToken: string;
  sdkProfile: any;
}

export const useSessionStore = defineStore({
  id: 'session',
  state: (): SessionState => ({
    profile: null,
    token: '',
    sdkProfile: null,
    sdkToken: '',
    terms: null,
  }),
  getters: {
    isLogged: state => {
      return state.token && state.profile && state.profile.role_level > 0
        ? true
        : false;
    },
    accessToken: state => {
      return state.token;
    },
  },
  actions: {
    init() {
      console.log('init');

      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          let token = await storage.get(__SESSION_TOKEN__);

          if (token === 'null') {
            token = '';
          }

          this.token = (token || '') as string;

          setAccessToken(this.token);

          resolve(this);
        } catch (e) {
          reject(e);
        }
      });
    },

    verify(payload: any) {
      console.log('verify');

      // eslint-disable-next-line require-await, no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          resolve(this);
        } catch (e) {
          reject(e);
        }
      });
    },

    register(payload: { profile: any; token: any }) {
      console.log('register');

      // eslint-disable-next-line require-await, no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          resolve(this);
        } catch (e) {
          reject(e);
        }
      });
    },

    unregister(payload: any) {
      console.log('unregister');

      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          await storage.set(__SESSION_TOKEN__, '');

          this.profile = {};
          this.token = '';

          setAccessToken('');

          resolve(this);
        } catch (e) {
          reject(e);
        }
      });
    },

    clearSession() {
      console.log('clearSession');

      // no-async-promise-executor
      // eslint-disable-next-line no-async-promise-executor, require-await
      return new Promise(async (resolve, reject) => {
        try {
          this.unregister({});

          resolve(this);
        } catch (e) {
          reject(e);
        }
      });
    },

    getProfile() {
      console.log('getProfile');

      return new Promise((resolve, reject) => {
        try {
          resolve(this);
        } catch (e) {
          reject(e);
        }
      });
    },
  },
});
