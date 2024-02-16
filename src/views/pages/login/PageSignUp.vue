<template>
  <page-header title="회원가입" />
  <h2 class="content-title" v-html="title"></h2>
  <div class="page-content has-bottom-tabbar">
    <ui-form ref="refForm" class="form-passport" @submit="">
      <div class="text-field">
        <label for="display-name">{{ '이름' }}</label>
        <div class="input-box">
          <ui-text-input
            id="display-name"
            maxlength="20"
            v-model:value="state.displayName"
            type="text"
            @keyup="checkDisplayName"
          />
          <!-- @focus="onFocus"
              ref="textareaRef" -->
        </div>
      </div>
    </ui-form>
  </div>
  <div class="page-footer">
    <div class="actions">
      <button
        type="submit"
        class="submit-button btn-large btn-filled"
        :disabled="!state.displayName"
        @click="onClickCheckTerms"
      >
        <span>{{ '다음' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/commons/headers/PageHeader.vue';
import { useDrawerModule } from '@/components/modules/drawer';
import UiForm from '@/components/molecules/forms/Form.vue';
import { UiTextInput } from '@/plugins/vue-ui-components';
import { reactive, computed } from 'vue';
import TermsVue from '@/components/resources/terms/Terms.vue';

const drawer = useDrawerModule();

const state = reactive({
  displayName: '',
});

const title = computed(() => {
  return '이름을 입력해 주세요';
});

function checkDisplayName(e) {
  const value = e.target.value;
  const minLength = 2;
}

function onClickCheckTerms() {
  drawer.present({
    component: TermsVue,
    data: {},
    events: {},
  });
}
</script>

<style lang="scss" scoped>
.page-content {
  padding: unit(20);
  padding-top: unit(20) + $page-header-height;
  white-space: pre-wrap;
  .content-title {
    font-size: unit(24);
    font-weight: 600;
    letter-spacing: -0.6px;
    line-height: 1.5;
    // padding-top: unit(32);
    /* @include text-variant(headline1); */
    // font-size: unit(24);
  }
  .text-field {
    position: relative;
    padding-top: unit(32);

    label {
      display: block;
      font-weight: 600;
      font-size: unit(18);
      margin-bottom: unit(16);
    }

    .input-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: unit(48);
      /* padding: 0 unit(18); */
      border: 1px solid $color-gray-500;
      border-radius: unit(10);
      overflow: hidden;

      .ui-select {
        max-width: unit(120);

        :deep() {
          > .body {
            select {
              padding-right: unit(20);
              padding-left: 0;
            }
          }
        }
      }
    }
  }
}
.page-footer {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .actions {
    width: $page-content-width;
    padding: unit(16);

    .submit-button {
      span {
        /* color: $color-black; */
        font-size: unit(16);
      }
    }
  }
}
</style>
