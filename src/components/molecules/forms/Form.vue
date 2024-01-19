<template>
  <form
    ref="refForm"
    class="ui-form"
    spellcheck="false"
    autocomplete="off"
    @submit.prevent="onSubmit"
  >
    <slot />
  </form>
</template>

<script lang="ts" setup>
import _ from 'lodash';
import { ref } from 'vue';
import validator from './validators';

const props = defineProps([
  'formData',
  'submittable',
  'ignoreSubmit',
  'autoComplete',
]);
const emit = defineEmits([
  'update:formData',
  'update:submittable',
  'submit',
  'change',
  'error',
]);
const refForm = ref(null);

function onSubmit(e) {
  return submit();
}

function validate() {
  let hasError = false;

  const formData = props.formData;
  const result = {};
  const errorFields = {};

  _.forEach(formData, (field, key) => {
    const errors = validator.execute(field, key);

    field.error =
      errors.length > 0
        ? _.map(errors, (error: Error) => error.toLocaleString()).join(', ')
        : '';

    if (field.error) {
      hasError = true;
      errorFields[key] = errors;
    }

    result[key] = field;
  });

  emit('update:submittable', !hasError);
  emit('update:formData', result);

  if (hasError) {
    emit('error', errorFields);
  }

  return {
    submittable: !hasError,
  };
}

function submit() {
  if (validate()?.submittable !== true) {
    return false;
  }

  return emit('submit', refForm);
}

defineExpose({ validate, submit });
</script>
