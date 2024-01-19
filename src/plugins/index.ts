import _ from 'lodash';
import VueSvgIcon from './svg-icon';
import VueWNInterface from './vue-wni';
import VueUiComponents from './vue-ui-components';

// require("default-passive-events");

const plugin = {
  install: (app: any, options: any) => {
    app.use(VueSvgIcon);
    app.use(VueWNInterface);
    app.use(VueUiComponents);
  },
};

export default plugin;
