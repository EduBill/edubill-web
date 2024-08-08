<template>
  <page-header :title="'새로운 반 추가'" :back="true" />
  <div class="page-content has-bottom-tabbar">
    <ui-form ref="refForm" class="form-passport">
      <ul class="text-field-form">
        <li class="text-field">
          <label for="group-name">{{ '수업명' }}</label>
          <div class="input-box">
            <ui-text-input
              id="group-name"
              v-model:value="newClassInfo.groupName"
              type="text"
              inputmode="text"
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
                >
                  <Buttons
                    variants="long"
                    :color="
                      newClassInfo.schoolType.includes(option.text)
                        ? 'selected'
                        : 'disabled'
                    "
                    :text="option.text"
                    @click="() => selectSchoolType(option)"
                  />
                  <span class="rightTriangle">
                    <svg-icon name="rightTriangle" />
                  </span>
                </li>
              </ul>
            </div>
            <div class="classtarget-option-background overflowyScroll">
              <ul class="classtarget-option-school">
                <li v-for="classItem in selectedClasses" :key="classItem">
                  <Buttons
                    variants="long"
                    :color="
                      newClassInfo.schoolLevel.includes(classItem)
                        ? 'selected'
                        : 'disabled'
                    "
                    :text="classItem"
                    @click="() => selectSchoolLevel(classItem)"
                  />
                </li>
              </ul>
            </div>
          </div>
          <p v-if="false">{{ '에러처리' }}</p>
          <div
            v-if="newClassInfo.schoolLevel.includes('직접 입력')"
            class="school-level-input-box"
          >
            <div class="input-box">
              <ui-text-input
                id="school-level"
                v-model:value="newClassInfo.groupName"
                type="text"
                inputmode="text"
                pattern="^\d*$"
                :placeholder="'예) 영어 유치원'"
              />
            </div>
          </div>
        </li>
        <li class="text-field">
          <h2>{{ '수업 시간' }}</h2>
          <div class="classtime-box">
            <div class="">
              <ul class="weekend-button-box">
                <li
                  v-for="day in weekend"
                  :key="day.id"
                  class="btn-weekend-area"
                >
                  <Buttons
                    variants="long"
                    :color="day.selected ? 'selected' : 'disabled'"
                    :text="day.value"
                    @click="toggleDisabled(day.id)"
                  />
                </li>
              </ul>
              <div class="settime-box">
                <div class="input-box">
                  <ui-text-input
                    id="time-set-forward"
                    v-model:value="newClassInfo.forwardTime"
                    type="text"
                    inputmode="numeric"
                    :maxlength="5"
                    placeholder="00:00"
                    @keyup="e => onChangeTimeFormat(e, 'forwardTime')"
                  />
                </div>
                <span>~</span>
                <div class="input-box">
                  <ui-text-input
                    id="time-set-backward"
                    v-model:value="newClassInfo.backwardTime"
                    type="text"
                    inputmode="numeric"
                    :maxlength="5"
                    placeholder="24:00"
                    @keyup="e => onChangeTimeFormat(e, 'backwardTime')"
                  />
                </div>
              </div>
            </div>
            <div class="btn-plus-area">
              <button class="btn-plus" @click="addTime">+</button>
            </div>
          </div>
          <p v-if="false">{{ '에러처리' }}</p>
        </li>
        <ul v-if="newClassInfo.schoolTime.length !== 0" class="time-add-field">
          <li
            v-for="time in newClassInfo.schoolTime"
            :key="time.day"
            class="time-add-box"
          >
            <div>
              <p class="time-add-day">{{ time.day }}</p>
              <p class="time-add-period">{{ time.time }}</p>
            </div>
            <span class="close" @click="() => deleteSelectedClasses(time.id)">
              <svg-icon name="purpleClose" />
            </span>
          </li>
        </ul>

        <li class="text-field">
          <label for="tuition">{{ '수강료' }}</label>
          <div class="input-box">
            <ui-text-input
              id="tuition"
              v-model:value="newClassInfo.tuition"
              type="text"
              inputmode="numeric"
              pattern="^\d*$"
              :maxlength="11"
              :placeholder="'000,000'"
            />
            <span class="won">원</span>
          </div>
          <p v-if="false">{{ '에러처리' }}</p>
        </li>
        <li class="text-field">
          <label for="memo">{{ '메모' }}</label>
          <div class="input-box">
            <ui-text-input
              id="memo"
              v-model:value="newClassInfo.memo"
              type="text"
              inputmode="text"
              pattern="^\d*$"
              :maxlength="20"
              :placeholder="'입력해주세요'"
            />
          </div>
          <p v-if="false">{{ '에러처리' }}</p>
        </li>
      </ul>
    </ui-form>
    <div class="button-area">
      <Buttons
        class="btn-text"
        variants="long"
        :disabled="!isFormValid"
        :color="isFormValid ? 'selected' : 'disabled'"
        :text="'작성 완료'"
        @click="handleModalClick"
      />
    </div>
  </div>
  <ClassAddInfoModal
    :use-modal="useModal"
    :handle-modal-click="handleModalClick"
    :class-info="newClassInfo"
  />
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import Modal from '../../../components/modules/modal/Modal.vue';
import PageHeader from '@/components/commons/headers/PageHeader.vue';
import UiForm from '@/components/molecules/forms/Form.vue';
import Buttons from '@/components/resources/buttons/Buttons.vue';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';
import ClassAddInfoModal from '@/components/resources/class/ClassAddInfoModal.vue';
import { useAddNewClassInfo } from '@/stores/modules/addNewClass';

const useModal = ref(false);
const selectedClasses = ref<any[]>([]);
let idCounter = 0;

const newClassInfo = useAddNewClassInfo();

const weekend = ref([
  { id: 0, value: '월', selected: true },
  { id: 1, value: '화', selected: false },
  { id: 2, value: '수', selected: false },
  { id: 3, value: '목', selected: false },
  { id: 4, value: '금', selected: false },
  { id: 5, value: '토', selected: false },
  { id: 6, value: '일', selected: false },
]);

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
  { text: '기타', value: '4', no: '3', class: ['직접 입력'] },
]);

function handleModalClick() {
  useModal.value = !useModal.value;
}

function selectSchoolType(option) {
  selectedClasses.value = option.class ?? [];
  newClassInfo.schoolType = option.text;
  if (newClassInfo.schoolLevel) {
    newClassInfo.schoolLevel = '';
  }
}

function deleteSelectedClasses(id) {
  newClassInfo.schoolTime = newClassInfo.schoolTime.filter(
    time => time.id !== id
  );
}

const isFormValid = computed(() => {
  return (
    newClassInfo.groupName !== '' &&
    newClassInfo.schoolTime.length > 0 &&
    newClassInfo.schoolType !== '' &&
    newClassInfo.schoolLevel !== '' &&
    newClassInfo.tuition !== ''
  );
});

function selectSchoolLevel(schoolType) {
  newClassInfo.schoolLevel = schoolType;
}

function addTime() {
  newClassInfo.schoolTime.push({
    id: idCounter++,
    day: `${newClassInfo.day}요일`,
    time: `${newClassInfo.forwardTime}~${newClassInfo.backwardTime}`,
  });
  newClassInfo.forwardTime = '';
  newClassInfo.backwardTime = '';
}

function toggleDisabled(id: number) {
  const selectedDay = weekend.value.find(day => day.id === id);
  if (selectedDay) {
    newClassInfo.day = selectedDay.value;
    selectedDay.selected = !selectedDay.selected;
    if (selectedDay.selected) {
      weekend.value.forEach(day => {
        if (day.id !== id && day.selected) {
          day.selected = false;
        }
      });
    }
  }
}

function onChangeTimeFormat(e, stateKey) {
  const formatValue = e.target.value.replace(/\D/g, '');
  let formattedValue = '';
  if (formatValue.length >= 3) {
    formattedValue = formatValue.slice(0, 2) + ':' + formatValue.slice(2, 4);
  } else if (formatValue === 2) {
    formattedValue = formatValue + ':';
  } else {
    formattedValue = formatValue;
  }
  newClassInfo[stateKey] = formattedValue;
}
</script>

<style lang="scss" scoped>
.page-content {
  padding: unit(20);
  padding-top: unit(20) + $page-header-height;
  white-space: pre-wrap;

  .form-passport {
    .time-add-field {
      margin-top: unit(20);
      .time-add-box {
        width: 100%;
        height: unit(36);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f2edff;
        border: 1px solid #7535ff;
        color: #7535ff;
        font-weight: 600;
        font-size: unit(15);
        border-radius: unit(8);
        padding: unit(7.5) unit(20);

        .close {
          cursor: pointer;
          width: unit(24);
          height: unit(24);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .time-add-day {
          margin-right: unit(20);
        }
        .close-btn {
          text-align: right;
        }

        :deep() {
          div {
            display: flex;
          }
        }
      }

      :deep(li:not(:last-child)) {
        margin-bottom: unit(10);
      }
    }

    .text-field {
      position: relative;
      /* padding-top: unit(32); */
      margin-top: unit(40);

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

      .school-level-input-box {
        margin-top: unit(10);
      }
      .won {
        color: $color-gray-500;
      }
      .classtarget-box {
        width: 100%;
        display: flex;
        gap: unit(4);

        .classtarget-option-background {
          width: 50%;
          background-color: $color-gray-200;
          border-radius: unit(8);
          padding: unit(11) unit(10);
          overflow-y: scroll;
        }
        .overflowyScroll {
          max-height: unit(142);
          overflow-y: scroll;
        }
        .classtarget-option-school {
          display: flex;
          flex-direction: column;
          align-items: center;

          .rightTriangle {
            position: absolute;
            right: unit(8);
            top: 0;
            bottom: 0;
            width: unit(4);
            height: unit(6);
            margin: auto;
          }

          :deep() {
            li {
              position: relative;
              color: $color-gray-500;
              font-size: unit(14);
              height: unit(30);
              width: 100%;

              button {
                font-weight: 400;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .disabled {
                color: $color-gray-500;
                font-weight: 400;
                background-color: $color-gray-200;
              }
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
  bottom: unit(40);
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: unit(335);
    border: 1px solid $color-primary;
    border-radius: unit(10);
  }

  .btn-text:disabled {
    color: $color-gray-500;
    background-color: $color-gray-200;
    border: none;
  }
  .selected {
    color: white;
  }
}
</style>
