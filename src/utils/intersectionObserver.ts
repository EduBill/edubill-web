import { ref } from 'vue';
export const intersectionObserver = (hasMoreData, page, fetchData) =>
  new IntersectionObserver(
    async (entries, observer) => {
      if (hasMoreData.value && entries[0].isIntersecting) {
        await fetchData();
        console.log('fetchData', page.value);
        // 더 이상 데이터가 없으면 옵저버 해제
        if (!hasMoreData.value) {
          console.log('데이터 없음');
          observer.disconnect();
        }
      }
      console.log('end');
    },
    { root: null, rootMargin: '0px', threshold: 0.5 }
  );
