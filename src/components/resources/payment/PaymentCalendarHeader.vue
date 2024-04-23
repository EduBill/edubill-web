<template>
  <div class="payCalHeader">
    <div class="payCalHeader_dateNav">
      <svg-icon class="chevron" name="chevronLeft" />
      <p class="payCalHeader_date">{{ calYear }}.{{ calMonth }}</p>
      <svg-icon class="chevron" name="chevronRight" />
    </div>
    <svg-icon class="calendarImg" name="calendar" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';

const props = defineProps({
  currentYear: {
    type: Number,
    default: 0,
  },
  currentMonth: {
    type: Number,
    default: 0,
  },
});

const calYear = ref(props.currentYear);
const calMonth = ref('');

onMounted(() => {
  console.log(
    '캘린더의 현재 날짜' + props.currentYear + '-' + props.currentMonth
  );
  setCalendarDate(props.currentYear, props.currentMonth);
});

const setCalendarDate = (year: number, month: number) => {
  // month가 한자리 수일 경우 앞에 0 붙이기
  if (month > 0 && month < 10) {
    calMonth.value = `0${month}`;
  } else {
    calMonth.value = `${month}`;
  }
};
</script>

<style lang="scss" scoped>
.payCalHeader {
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  position: relative;

  &_dateNav {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  &_date {
    color: var(--Gray-Gray-900, #19171a);
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    margin: 0 unit(17);
  }
}

.chevron {
  width: unit(16);
  height: unit(16);
}

.calendarImg {
  width: unit(32);
  height: unit(32);
}
</style>
