import VueSvgIcon from './lib/SvgIcon.vue';

const plugin = {
  install: (app, options) => {
    app.component('SvgIcon', VueSvgIcon);
  },
};

export default plugin;
