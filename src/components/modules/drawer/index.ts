import _ from 'lodash';
import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import {
  DrawerCloseButtonPosition,
  DrawerItem,
  DrawerPosition,
  DrawerSize,
  DrawerState,
  DrawerTransitionName,
} from './types';

export * from './types';

export const useDrawerModule = defineStore({
  id: 'drawer',
  state: (): DrawerState => ({
    items: [],
    observers: [],
  }),
  getters: {},
  actions: {
    clear() {
      this.items = [];
      this.observers = [];
    },

    addObserver(handler: Function) {
      const observer = {
        id: _.uniqueId(),
        handler,
      };
      this.observers[observer.id] = observer;
      return observer;
    },

    removerObserver(observer: any) {
      if (this.observers[observer.id]) {
        this.observers[observer.id] = null;
        delete this.observers;
      }
    },

    notifyObservers(action: string, options: any) {
      this.observers.forEach((observer: any) => {
        observer.handler(action, options);
      });
    },

    present(payload: DrawerItem) {
      const item = {
        id: payload.id ?? _.uniqueId(),

        ...payload,

        useModal: payload.useModal ?? true,
        useCloseButton: payload.useCloseButton ?? true,
        canCloseForModal: payload.canCloseForModal ?? true,

        closeButtonPosition: payload.closeButtonPosition ?? DrawerCloseButtonPosition.INNER,
        position: payload.position ?? DrawerPosition.BOTTOM,
        size: payload.size ?? DrawerSize.AUTO,

        backgroundColor: payload.backgroundColor ?? 'white',
        noPadding: payload.noPadding ?? false,

        //@TODO: AnimationDuration 값을 옵션널 처리 필요
        // animationDuration: payload.animationDuration ?? 600,

        animationName: payload.animationName ?? DrawerTransitionName.DEFAULT,

        component: markRaw(payload.component),
        componentName: payload.component.__name,
      };

      this.notifyObservers('will-present', {
        ...item,
        component: item.componentName,
      });

      setTimeout(() => {
        this.items.push(item);

        this.notifyObservers('did-present', {
          ...item,
          component: item.componentName,
        });
      }, 0);

      return item;
    },

    dismiss(payload: any) {
      const { id } = payload;

      const drawerItem = this.items.find((item) => item.id === id);

      if (drawerItem) {
        if (drawerItem?.events?.onClose) {
          drawerItem!.events!.onClose(drawerItem);
        }
      }

      this.notifyObservers('will-dismiss', {
        ...drawerItem,
        component: drawerItem?.componentName,
      });

      this.items = this.items.filter((item) => item.id !== id);

      this.notifyObservers('did-dismiss', {
        ...drawerItem,
        component: drawerItem?.componentName,
      });
    },
  },
});
