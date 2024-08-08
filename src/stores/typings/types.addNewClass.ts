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
}
interface SchoolTime {
  id: number;
  day: string;
  time: string;
}
