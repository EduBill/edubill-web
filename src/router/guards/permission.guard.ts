import { useSessionStore } from '@/stores/modules/session';
import { parseQuery as routerParseQuery } from 'vue-router';

class PermissionGuard {
  _permissionHandler: Function = () => {};

  #setPermissionHandler(handler: Function) {
    this._permissionHandler = handler;
  }

  #clearPermissionHandler() {
    this._permissionHandler = () => {};
  }

  get permissionHandler() {
    return this._permissionHandler;
  }

  async checkPermission(to: any, from: any) {
    this.#clearPermissionHandler();
    const { auth } = to.meta ?? {};

    const session = useSessionStore();

    await session.init();

    const isLoggedIn = session.accessToken;

    if (auth) {
      if (!isLoggedIn) {
        return this.#setPermissionHandler((next: Function) => {
          // console.log('#### router 1 : ', to.path, to.query);
          // console.log('#### router 2 : ', location.pathname, location.search);
          const queryString = parseQuery(to.query);
          next({
            name: 'Login',
            query: {
              redirect: encodeURIComponent(to.path + '?' + queryString),
            },
          });
          // next({ name: 'Onboarding', query: { redirect: encodeURIComponent(location.pathname + '?' + location.search) } });
        });
      }
    }

    return this.#setPermissionHandler((next: Function) => next(true));
  }
}

function parseQuery(query) {
  return '';
}

const guard = new PermissionGuard();
export default guard;
