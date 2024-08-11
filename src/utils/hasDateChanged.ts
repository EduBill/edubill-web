import { formatDate } from './formatDate';

//두 날짜가 같은 날짜인지 체크하는 함수
export function hasDateChanged(
  currentDate: string,
  prevDate: string | null
): boolean {
  if (prevDate === null) {
    return false;
  }
  const current = formatDate(new Date(currentDate), 'monthDay');
  const prev = formatDate(new Date(prevDate), 'monthDay');
  if (current === prev) {
    return false;
  } else {
    return true;
  }
}
