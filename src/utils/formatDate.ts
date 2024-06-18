export function formatYearMonthDate(year, month) {
  let formatDate = '';
  // month가 한자리 수일 경우 앞에 0 붙이기
  if (month < 10) {
    formatDate = `${year}-0${month}`;
  } else {
    formatDate = `${year}-${month}`;
  }
  return formatDate;
}

export function formatFullDate(originalDate) {
  const year = originalDate?.getFullYear();
  const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
  const day = ('0' + originalDate.getDate()).slice(-2);
  const hours = ('0' + originalDate.getHours()).slice(-2);
  const minutes = ('0' + originalDate.getMinutes()).slice(-2);

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
}
