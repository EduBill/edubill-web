import _ from 'lodash';
import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import { ToastItem, ToastType, ToastMargin, ToastState } from './types';

export * from './types';

export interface ToastState {
  items: ToastItem[];
  hasActions: boolean;
  hasActionBox: boolean;
}

export const useToastModule = defineStore({
  id: 'toast',
  state: (): ToastState => ({
    items: [],
    margin: {
      top: null,
      right: null,
      bottom: null,
      left: null,
    },
    hasActionBox: false,
    hasActions: false,
  }),
  getters: {},
  actions: {
    clear() {
      this.items = [];
    },

    alert({ message }) {
      this.show({ type: ToastType.ALERT, message: message });
    },

    success({ message }) {
      this.show({ type: ToastType.SUCCESS, message: message });
    },

    error({ error }) {
      console.error(error);
      this.show({ type: ToastType.ERROR, message: error });
    },

    show(payload: {
      type: ToastType;
      message: any;
      duration?: number;
      clear?: boolean;
    }) {
      const item: ToastItem = {
        id: _.uniqueId(),
        type: payload.type ?? ToastType.ALERT,
        message: payload.message ?? '',
        duration: payload.duration ?? 3500,
      };

      if (payload.clear === true) {
        this.clear();
      }

      setTimeout(() => {
        this.items.push(item);
      }, 0);

      return item;
    },

    hide(payload: { id: string }) {
      const { id } = payload;

      this.items = this.items.filter(item => item.id !== id);
    },

    setMargin(payload: ToastMargin) {
      this.margin = payload;
    },
  },
});
