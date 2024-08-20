import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { State } from '../typings/types.addNewClass';

export const useAddNewClassInfo = defineStore('newClassInfo', () => {
  const state = reactive<State>({
    groupName: '',
    schoolType: '',
    schoolLevel: '',
    schoolTime: [],
    day: '월',
    forwardTime: '',
    backwardTime: '',
    tuition: '',
    memo: '',
    check: false,
  });

  return {
    ...state,
  };
});
