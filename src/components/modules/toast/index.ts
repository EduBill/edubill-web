import _ from 'lodash';
import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import { ToastItem, ToastType, ToastMargin, ToastState } from './types';

export * from './types';

export interface ToastStates extends ToastState {
  items: ToastItem[];
  hasActions: boolean;
  hasActionBox: boolean;
}

export const useToastModule = defineStore({
  id: 'toast',
  state: (): ToastStates => ({
    items: [],
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
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
      this.show({ type: ToastType.ALERT, message });
    },

    success({ message }) {
      this.show({ type: ToastType.SUCCESS, message });
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
