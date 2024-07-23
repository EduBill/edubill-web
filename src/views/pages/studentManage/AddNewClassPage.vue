<template>
  <page-header :title="'새로운 반 추가'" back />
  <div class="page-content has-bottom-tabbar">
    <ui-form ref="refForm" class="form-passport">
      <ul>
        <li class="text-field">
          <label for="phone-number">{{ '수업명' }}</label>
          <div class="input-box">
            <ui-text-input
              id="phone-number"
              type="text"
              inputmode="numeric"
              pattern="^\d*$"
              :maxlength="11"
              :placeholder="'반 및 레벨명을 참고해서 입력해주세요'"
            />
          </div>
          <p v-if="false">{{ '에러처리' }}</p>
        </li>
        <li class="text-field">
          <h2>{{ '수업 대상' }}</h2>
          <div class="classtarget-box">
            <div class="classtarget-option-background">
              <ul class="classtarget-option-school">
                <li
                  v-for="option in options"
                  :key="option.no"
                  :value="option.value"
                  @click="selectClasses(option)"
                >
                  {{ option.text }}
                </li>
              </ul>
            </div>
            <div class="classtarget-option-background">
              <ul class="classtarget-option-school">
                <li v-for="classItem in selectedClasses" :key="classItem">
                  {{ classItem }}
                </li>
                <!-- <button v-if=""></button> -->
              </ul>
            </div>
          </div>
          <p v-if="false">{{ '에러처리' }}</p>
        </li>
        <li class="text-field">
          <h2>{{ '수업 시간' }}</h2>
          <div class="classtime-box">
            <div class="">
              <ul class="weekend-button-box">
                <li class="btn-weekend-area">
                  <Buttons
                    variants="long"
                    color="disabled"
                    text="월"
                    onclick=""
                  />
                </li>
                <li class="btn-weekend-area">
                  <Buttons
                    variants="long"
                    color="disabled"
                    text="화"
                    onclick=""
                  />
                </li>
                <li class="btn-weekend-area">
                  <Buttons
                    variants="long"
                    color="disabled"
                    text="수"
                    onclick=""
                  />
                </li>
                <li class="btn-weekend-area">
                  <Buttons
                    variants="long"
                    color="disabled"
                    text="목"
                    onclick=""
                  />
                </li>
                <li class="btn-weekend-area">
                  <Buttons
                    variants="long"
                    color="disabled"
                    text="금"
                    onclick=""
                  />
                </li>
                <li class="btn-weekend-area">
                  <Buttons
                    variants="long"
                    color="disabled"
                    text="토"
                    onclick=""
                  />
                </li>
                <li class="btn-weekend-area">
                  <Buttons
                    variants="long"
                    color="disabled"
                    text="일"
                    onclick=""
                  />
                </li>
              </ul>
              <div class="settime-box">
                <div class="input-box">
                  <ui-text-input
                    id="time-set"
                    type="text"
                    inputmode="numeric"
                    pattern="^\d*$"
                    :maxlength="11"
                    :placeholder="'00:00'"
                  />
                </div>
                <span>~</span>
                <div class="input-box">
                  <ui-text-input
                    id="time-set"
                    type="text"
                    inputmode="numeric"
                    pattern="^\d*$"
                    :maxlength="11"
                    :placeholder="'24:00'"
                  />
                </div>
              </div>
            </div>
            <div class="btn-plus-area">
              <button class="btn-plus">+</button>
            </div>
          </div>
          <p v-if="false">{{ '에러처리' }}</p>
        </li>
        <li class="text-field">
          <label for="phone-number">{{ '수강료' }}</label>
          <div class="input-box">
            <ui-text-input
              id="phone-number"
              type="text"
              inputmode="numeric"
              pattern="^\d*$"
              :maxlength="11"
              :placeholder="'000,000'"
            />
          </div>
          <p v-if="false">{{ '에러처리' }}</p>
        </li>
        <li class="text-field">
          <label for="phone-number">{{ '메모' }}</label>
          <div class="input-box">
            <ui-text-input
              id="phone-number"
              type="text"
              inputmode="numeric"
              pattern="^\d*$"
              :maxlength="11"
              :placeholder="'입력해주세요'"
            />
          </div>
          <p v-if="false">{{ '에러처리' }}</p>
        </li>
      </ul>
    </ui-form>
    <div class="button-area">
      <button class="btn-text" type="button" :disabled="true">
        {{ '작성 완료' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import PageHeader from '@/components/commons/headers/PageHeader.vue';
import UiForm from '@/components/molecules/forms/Form.vue';
import Buttons from '@/components/resources/buttons/Buttons.vue';

const selected = ref('1');

const options = ref([
  {
    text: '초등학교',
    value: '1',
    no: '0',
    class: ['1학년', '2학년', '3학년', '4학년', '5학년', '6학년'],
  },
  {
    text: '중학교',
    value: '2',
    no: '1',
    class: ['1학년', '2학년', '3학년'],
  },
  {
    text: '고등학교',
    value: '3',
    no: '2',
    class: ['1학년', '2학년', '3학년'],
  },
  { text: '기타', value: '4', no: '3' },
]);

const selectedClasses = ref<string[]>([]);

const selectClasses = option => {
  selectedClasses.value = option.class ?? [];
};
</script>

<style lang="scss" scoped>
.page-content {
  padding: unit(20);
  padding-top: unit(20) + $page-header-height;
  white-space: pre-wrap;

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
      h2 {
        font-weight: 600;
        font-size: unit(18);
        margin-bottom: unit(16);
      }

      .classtarget-box {
        width: 100%;
        display: flex;
        gap: unit(4);

        .classtarget-option-background {
          width: 50%;
          height: unit(142);
          background-color: $color-gray-200;
          border-radius: unit(8);
          padding: unit(16) unit(58);
          overflow-y: scroll;
        }
        .classtarget-option-school {
          display: flex;
          flex-direction: column;
          gap: unit(10);
          align-items: center;

          :deep() {
            li {
              color: $color-gray-500;
              font-size: unit(14);
              height: unit(20);
            }
          }
        }
      }

      .classtime-box {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .btn-plus-area {
          height: 100%;
          border-radius: unit(20);
          display: flex;
          align-items: center;
          justify-content: center;
          /* padding: unit(10) unit(20); */
          background-color: #f2edff;
          .btn-plus {
            width: unit(32);
            height: unit(32);
            font-size: unit(24);
            color: #7535ff;
          }
        }
        .settime-box {
          display: flex;
          width: unit(290);
          margin-top: unit(10);
          align-items: center;
          gap: unit(4);

          span {
            font-size: unit(15);
          }
          :deep() {
          }
        }
      }

      .weekend-button-box {
        display: flex;
        align-items: center;
        padding-top: unit(3);
        height: unit(38);
        /* width: unit(295); */
        gap: unit(4);

        .btn-weekend-area {
          height: 100%;
          width: unit(38);
          & button {
            font-weight: 400;
          }
        }

        .btn-weekend {
          width: 100%;
          height: 100%;
          border-radius: unit(8);
          background-color: $color-gray-200;
          color: $color-gray-500;
        }
      }

      .input-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: unit(3);
        height: unit(41);
        padding: 0 unit(18);
        border: 1px solid $color-gray-200;
        border-radius: unit(10);
        overflow: hidden;
      }

      .ui-text-input {
        margin-left: 0;
        margin-right: unit(16);
        flex: 1;

        :deep() {
          input::placeholder {
            color: $color-gray-500;
          }
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
    }
  }
}
.button-area {
  width: 100%;
  height: unit(48);
  margin-top: unit(16);
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-content: center;
  .btn-text {
    font-size: unit(16);
    color: $color-primary;
    flex-shrink: 0;
    line-height: unit(48);
    text-align: center;
    width: unit(335);
    border: 1px solid $color-primary;
    border-radius: unit(10);
  }

  .btn-text:disabled {
    color: $color-gray-500;
    background-color: $color-gray-200;
    border: none;
  }
}
</style>
