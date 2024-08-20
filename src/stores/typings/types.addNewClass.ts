export interface State {
  groupName: string;
  schoolLevel: string;
  schoolTime: SchoolTime[];
  day: string;
  forwardTime: string;
  backwardTime: string;
  tuition: string;
  memo: string;
  schoolType: string;
  check: boolean;
  groupId?: number;
}
export interface SchoolTime {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}
