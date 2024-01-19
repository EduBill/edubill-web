import _ from 'lodash';
import VueSvgIcon from './svg-icon';

// require("default-passive-events");

const plugin = {
  install: (app: any, options: any) => {
    app.use(VueSvgIcon);
  },
};

export default plugin;
