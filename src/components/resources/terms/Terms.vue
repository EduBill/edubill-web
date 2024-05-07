<template>
  <div class="resource">
    <li class="text-field-for-agree text-field-for-all-agree">
      <div class="check-box check-all">
        <input
          :id="`terms-check-all`"
          v-model="allChecked"
          name="terms-check"
          type="checkbox"
          @change="checkAll"
        />
        <label :for="`terms-check-all`">
          <span class="check">
            <svg-icon name="check" />
          </span>

          <h3>{{ '전체 동의하기' }}</h3>
        </label>
      </div>
    </li>

    <li v-for="term in state.terms" :key="term.id" class="text-field-for-agree">
      <div class="check-box check-single">
        <input
          :id="`terms-check-${term.id}`"
          v-model="agreeTerms"
          type="checkbox"
          :value="term"
          @change="checkItem(term.id)"
        />
        <label :for="`terms-check-${term.id}`">
          <span class="check">
            <svg-icon name="check" />
          </span>
          <h3>
            <span v-if="term.isNecessary">[필수] </span>
            <span v-else>[선택] </span>{{ term.title }}
          </h3>
          <!-- <span class="arrow" @click="moveToPageTerms(term.block_id, term.title)">
                <svg-icon name="arrow" />
              </span> -->
        </label>
        <span class="arrow" @click="">
          <svg-icon name="arrow" />
        </span>
      </div>
    </li>
  </div>
  <div class="page-footer">
    <div class="actions">
      <button
        type="submit"
        class="submit-button btn-large btn-filled"
        @click="onSubmit"
      >
        <span>{{ '가입완료' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const props = defineProps(['events']);
const emits = defineEmits(['close']);

const state = reactive({
  terms: [
    {
      id: 1,
      title: '서비스 이용약관 동의',
      block_id: 'terms',
      isNecessary: true,
    },
    {
      id: 2,
      title: '개인정보처리방침',
      block_id: 'privacy',
      isNecessary: true,
    },
    {
      id: 3,
      title: '마케팅 정보 수신 동의',
      block_id: 'marketing',
      isNecessary: false,
    },
  ], // 약관
  termsAgreeList: [],
});
const allChecked = ref(false);
const agreeTerms = ref([]);

function checkItem(e) {
  // console.log('check', agreeTerms.value);

  if (agreeTerms.value.length === state.terms.length) {
    allChecked.value = true;
  } else {
    allChecked.value = false;
  }
}

function checkAll() {
  if (allChecked.value) {
    agreeTerms.value = state.terms.map(term => term);
  } else {
    agreeTerms.value = [];
  }
}

function onSubmit() {
  emits('close');
  props.events.onConfirm();
}
</script>

<style lang="scss" scoped>
.resource {
  padding: unit(40) unit(16) 0 unit(16);
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
      flex-shrink: 0;

      margin-bottom: unit(20);

      &.check-all {
        height: unit(56);
        background-color: rgba(217, 217, 217, 0.5);
        padding: 0 unit(12);
        border-radius: unit(8);
        color: #000;

        font-family: 'Source Sans Pro';
        font-size: 15px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        margin-bottom: unit(24);
      }
      &.check-single {
        padding: 0 unit(12);
      }
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
          width: unit(19);
          height: unit(19);
          border-radius: unit(4);
          background-color: #e0e0e0;
          .svg-icon {
          }
        }

        h3 {
          color: #000;

          font-family: 'Source Sans Pro';
          font-size: 15px;
          font-style: normal;
          font-weight: 900;
          line-height: normal;
          margin-left: unit(6);
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
    /* padding-top: unit(32); */

    // &:last-child {
    //   padding-bottom: unit(100);
    // }

    h3 {
      font-weight: 600;
    }
  }
}
.page-footer {
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
