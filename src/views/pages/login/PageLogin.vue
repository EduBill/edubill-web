<template>
  <page-header :title="'로그인'" />

  <div class="page-content has-bottom-tabbar">
    <h2 class="content-title" v-html="title"></h2>

    <ui-form ref="refForm" class="form-passport" @submit="onSubmit">
      <ul>
        <li class="text-field">
          <label for="phone-number">{{ '휴대폰 번호' }}</label>
          <div class="input-box">
            <ui-text-input
              id="phone-number"
              v-model:value="state.phoneNumber"
              type="text"
              inputmode="numeric"
              pattern="^\d*$"
              :maxlength="11"
              :placeholder="'휴대폰 번호 입력'"
              @keyup="checkPhoneLength"
            />
          </div>

          <p v-if="state.phoneNumberError" class="helper-message error">
            {{ '휴대폰번호를 확인해주세요.' }}
          </p>
        </li>

        <li v-if="state.isRequestCertified" class="text-field">
          <label for="certified-number">{{ '인증번호' }}</label>
          <div class="input-box">
            <ui-text-input
              id="certified-number"
              v-model:value="state.verificationNumber"
              type="number"
              inputmode="numeric"
              pattern="\d*"
              maxlength="6"
              :disabled="state.isTimeout"
              :placeholder="'인증번호 입력'"
            />
            <!-- <timer ref="timer" v-if="!state.isTimeout" :time="180" @timeout="onTimerTimeout" /> -->
            <button
              v-if="!state.isTimeout"
              class="btn-text"
              type="button"
              @click="onClickCertified"
            >
              <span class="timer">{{ formatTime(remainingTime) }}</span>
            </button>
          </div>
          <p v-if="state.isTimeout" class="helper-message error">
            {{ '제한시간이 만료되었습니다. 다시 인증해주세요.' }}
          </p>
          <p v-if="state.isFailCertified" class="helper-message error">
            {{ '인증번호를 확인해주세요.' }}
          </p>
          <p v-if="state.isSuccessCertified" class="helper-message success">
            {{ '인증이 완료되었어요!' }}
          </p>
        </li>
      </ul>
    </ui-form>
    <div class="button-area">
      <button
        class="btn-text"
        type="button"
        :disabled="!state.isPhoneNumber"
        @click="onClickRequestCertified(state.phoneNumber)"
      >
        {{ phoneCertifiedButtonLabel }}
      </button>
    </div>
  </div>

  <div class="page-footer">
    <div class="actions">
      <button
        type="submit"
        class="submit-button btn-large btn-filled"
        :disabled="state.verificationNumber.length !== 6 ? true : false"
        @click="onClickSubmit"
      >
        <span>{{ '인증 완료' }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { AuthApi } from '@/api/AuthApi';
import PageHeader from '@/components/commons/headers/PageHeader.vue';
import { UiButton, UiTextInput } from '@/plugins/vue-ui-components';
import UiForm from '@/components/molecules/forms/Form.vue';
import router from '@/router';
import { setAccessToken } from '@/modules/axios';
const authApi = new AuthApi();
const refForm = ref(null);
const state = reactive({
  mode: 'login',
  requestId: '',
  phoneNumber: '',
  verificationNumber: '',
  selectedPhoneDialCode: '+82/KR',
  phoneNumberError: false, // 핸드폰 번호가 올바른지
  isPhoneNumber: false, // 휴대폰 번호가 11자리가 채워졌는지
  isRequestCertified: false, // 인증요청을 했었는지
  isTimeout: false, // 타이머의 시간이 끝났는지
  isPassportValidation: false, // 폼 양식이 검증 결과
  isFailCertified: false, // 인증 요청이 실패했는지
  isSuccessCertified: false, // 인증 요청이 성공했는지
  loading: false,
  terms: [], // 약관
  termsAgreeList: [],
});

const title = computed(() => {
  if (state.mode === 'register') {
    return '휴대폰 번호와 이름을\n입력해 주세요';
  }

  return '휴대폰 번호를\n입력해 주세요';
});

const phoneCertifiedButtonLabel = computed(() => {
  if (state.isRequestCertified) {
    return '재요청';
  }

  return '인증요청';
});

// 인증번호 타이머
const timer = ref(300); // 5분
const timerActive = ref(false);
const isTimeout = ref(false);

let interval;

const startTimer = () => {
  timer.value = 300;
  timerActive.value = true;

  interval = setInterval(() => {
    timer.value--;
    if (timer.value <= 0) {
      clearInterval(interval);
      timerActive.value = false;
      isTimeout.value = true;
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(interval);
  timerActive.value = false;
};

const remainingTime = computed(() => timer.value);

watch(remainingTime, newValue => {
  if (newValue === 0) {
    timerActive.value = false;
    isTimeout.value = true;
    state.isTimeout = true;
    state.isFailCertified = false;
    state.isSuccessCertified = false;
  }
});

function checkPhoneLength(e) {
  const value = e.target.value;
  const minLength = 11;

  if (value.length >= minLength) {
    state.isPhoneNumber = true;
  } else {
    state.isPhoneNumber = false;
  }
}

function onClickCertified() {
  console.log('onClickCertified');

  if (!timerActive.value) {
    startTimer();
  } else {
    stopTimer();
  }
}
function isNumber(value) {
  const numberPattern = /^\d+$/;
  return numberPattern.test(value);
}
async function onClickRequestCertified(e) {
  console.log('onClickRequestCertified');
  if (isNumber(e)) {
    console.log('is number');
    state.isRequestCertified = true;

    const res = await authApi.authPhoneVerifySend({ phoneNumber: e });
    state.requestId = res.data.requestId;
    state.verificationNumber = res.data.verificationNumber;
    startTimer();
  } else {
    console.log('is not number');
    // toastModule.show({ type: ToastType.ERROR, message: $t('휴대폰 번호에 숫자만 입력해주세요') });
    return;
  }

  // await doSendVerifyNumber();
}

function onSubmit(e) {
  console.log('onSubmit');

  setTimeout(async () => {
    if (!state.isRequestCertified) {
    } else {
    }
  }, 0);
  return false;
}

async function onClickSubmit() {
  const res = await authApi.authPhoneVerify({
    requestId: state.requestId,
    verificationNumber: state.verificationNumber,
    phoneNumber: state.phoneNumber,
  });
  if (res.status === 200 && res.data === state.requestId) {
    console.log('res status 200');
    const isUser = await authApi.authCheckUser({
      phoneNumber: state.phoneNumber,
      requestId: state.requestId,
    });
    if (isUser.data) {
      await authApi
        .authLogin({
          requestId: state.requestId,
          phoneNumber: state.phoneNumber,
        })
        .then(res => {
          if (res.status === 200) {
            sessionStorage.setItem(
              'Token',
              res.data.jwtToken.accessToken.replace('Bearer ', '')
            );
            // setAccessToken(
            //   res.data.jwtToken.accessToken.replace('Bearer ', '')
            // );
            router.push({
              name: 'Home',
            });
          }
        });
    } else {
      router.push({
        name: 'Signup',
        query: {
          phoneNumber: state.phoneNumber,
          requestId: state.requestId,
        },
      });
    }
  }
  // router.push({
  //   name: 'Signup',
  // });
}

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${String(secs).padStart(2, '0')}`;
};
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

  .form-passport {
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
        padding-top: unit(3);
        height: unit(48);
        padding: 0 unit(18);
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

        .dial-codes {
          /* background: url('@/assets/icons/svg/arrow_down.svg') no-repeat 85% 50%; */

          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;

          :deep() {
            > .body {
              &::before {
                position: absolute;
                content: '';
                display: block;
                transform: rotate(180deg);
                font-size: 1.5em;
                color: var(--color_text);
                right: 0;
                top: 0;
                line-height: 2.25em;
                width: 2em;
                height: 2em;
                text-align: center;
                margin: 0;
                padding: 0;
                pointer-events: none;
                z-index: 1;
              }
            }
          }
        }

        .ui-text-input {
          margin-left: 0;
          margin-right: unit(16);
          flex: 1;

          :deep() {
            .input {
              border: none;

              input {
                text-indent: 0;
              }
            }
          }
        }

        &:focus-within {
          border-color: $color-gray-120;
        }

        :deep() {
          .text-input {
            margin-right: auto;
            width: 100%;
          }

          input {
            display: block;
            flex-grow: 1;
            font-size: unit(16);
            line-height: 26px;
            font-weight: 400;
            width: 100%;
          }
        }

        .certified-timer {
          font-style: normal;
          font-size: unit(14);
          line-height: unit(22);
          color: #2c6790;
          font-weight: 400;
          flex-shrink: 0;
        }

        .btn-text {
          font-size: unit(16);
          color: $color-primary;
          flex-shrink: 0;

          .timer {
            color: $color-primary;
            text-align: right;
            font-size: unit(14);
            font-style: normal;
            font-weight: 400;
            line-height: unit(22);

            margin-right: unit(6);
          }
        }

        .btn-text:disabled {
          color: #c8c8c8;
        }
      }

      .helper-message {
        margin-top: unit(8);
        font-size: unit(14);
        line-height: unit(22);
        font-weight: 400;

        &.error {
          color: #d04b2e;
        }

        &.success {
          color: $color-primary;
        }
      }
    }

    .text-field-for-agree {
      // &:last-child {
      //   padding-bottom: unit(100);
      // }

      .check-box {
        font-size: 18px;
        line-height: 26px;
        font-weight: 400;
        width: 100%;

        display: flex;

        margin-bottom: unit(12);

        input {
          position: absolute;
          left: unit(-9999);
        }

        label {
          display: flex;
          align-items: center;

          .svg-icon {
            display: block;
          }

          .check {
            background-color: #e0e0e0;
          }

          h3 {
            display: block;
            margin-left: unit(10);
            margin-right: auto;

            span {
              color: $color-primary;
            }
          }
        }
        .arrow {
          opacity: 0.5;
          width: unit(12);
          height: unit(12);
          margin-left: auto;
        }

        input:checked + label .check {
          background-color: $color-primary;
        }
      }
    }
    .text-field-for-all-agree {
      padding-top: unit(32);

      // &:last-child {
      //   padding-bottom: unit(100);
      // }

      h3 {
        font-weight: 600;
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
.button-area {
  width: 100%;
  height: unit(48);
  margin-top: unit(16);
  .btn-text {
    font-size: unit(16);
    color: $color-primary;
    flex-shrink: 0;
    line-height: unit(48);
    text-align: center;
    width: 100%;

    border: 1px solid $color-primary;
    border-radius: unit(10);
    .timer {
      color: $color-primary;
      text-align: right;
      font-size: unit(14);
      font-style: normal;
      font-weight: 400;
      line-height: unit(22);

      margin-right: unit(6);
    }
  }

  .btn-text:disabled {
    color: $color-gray-300;
    border: 1px solid $color-gray-300;
  }
}
</style>
