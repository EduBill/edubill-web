import _ from 'lodash';
import VueSvgIcon from './svg-icon';
import VueWNInterface from './vue-wni';

// require("default-passive-events");

const plugin = {
  install: (app: any, options: any) => {
    app.use(VueSvgIcon);
    app.use(VueWNInterface);
  },
};

export default plugin;
