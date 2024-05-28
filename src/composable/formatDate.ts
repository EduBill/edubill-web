export function useFormatDate(year: number, month: number) {
  let formatDate = '';
  // month가 한자리 수일 경우 앞에 0 붙이기
  if (month < 10) {
    formatDate = `${year}-0${month}`;
  } else {
    formatDate = `${year}-${month}`;
  }
  console.log('현재 날짜' + formatDate);
  return formatDate;
}
