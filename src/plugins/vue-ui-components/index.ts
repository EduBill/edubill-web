import UiButton from '@/components/atoms/Button.vue';
import UiCheckbox from '@/components/atoms/Checkbox.vue';
import UiLoader from '@/components/atoms/Loader.vue';
import UiPanel from '@/components/atoms/Panel.vue';
import UiRadio from '@/components/atoms/Radio.vue';
import UiSelect from '@/components/atoms/Select.vue';
import UiTab from '@/components/atoms/Tab.vue';
import UiTextInput from '@/components/atoms/TextInput.vue';

export {
  UiButton,
  UiCheckbox,
  UiLoader,
  UiPanel,
  UiRadio,
  UiSelect,
  UiTab,
  UiTextInput,
};

const component = {
  install: app => {
    app.component('UiButton', UiButton);
    app.component('UiCheckbox', UiCheckbox);
    app.component('UiLoader', UiLoader);
    app.component('UiPanel', UiPanel);
    app.component('UiRadio', UiRadio);
    app.component('UiSelect', UiSelect);
    app.component('UiTab', UiTab);
    app.component('UiTextInput', UiTextInput);
  },
};

export default component;
