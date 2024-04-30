<template>
    <div class="payment_container">
        <div class="date">{{ dateState.month }}월 {{ dateState.date }}일</div>
        <div v-if="paymentData.length === 0">데이터가 없습니다.</div>
        <div class="list_container" v-for="(paymentListData, index) in paymentData " :key="index">
            <div class="row_container">
                <div>{{paymentListData.studentName}}</div>
                <div>+{{ paymentListData.paidAmount }}</div>
            </div>
            <div class="timestamp">{{paymentListData.paidDateTime}}</div>
        </div>
        <div className='targetRef' id="target"></div>
    </div>
</template>

<script setup lang="ts">


import { PaymentListApi } from '@/api/PaymentListApi';
import { onMounted, ref, reactive } from 'vue';
import { PaymentData } from '@/api/PaymentListApi';

const paymentListApi = new PaymentListApi();
const paymentData = ref<PaymentData[]>([]);
const dateState = reactive({
    year:'',
    month:'',
    date:'',
})

let page = 0;
let hasMoreData = true;

onMounted(async () => {
    fetchData();
    console.log('다시');
});

//api 호출 
const fetchData = async()=>{
    //날짜 조회 
    const date = new Date();
        dateState.year = date.getFullYear().toString();
        dateState.month = (date.getMonth() + 1).toString().padStart(2, '0');
        dateState.date = date.getDate().toString().padStart(2,'0');
        const formatDate = `${dateState.year}-${dateState.month}`;
        const res = await paymentListApi.getPaymentList({ yearMonth: formatDate, page: page, size: 5 });
        
    // 받은 데이터를 paymentData에 저장
    if (Array.isArray(res.data.content)) {
        if(res.data.content.length === 0 ){
            hasMoreData=false;
        }
        paymentData.value = [...paymentData.value, ...res.data.content];

    } else {
        paymentData.value = res.data.content;
    }
    }

//무한스크롤 
const observer = new IntersectionObserver(async (entries) => {
    if (hasMoreData && entries[0].isIntersecting) {
        console.log('무한 스크롤 실행');
        page++; // 페이지 증가
        fetchData();
    }
}, { root: null, rootMargin: '0px', threshold: 1.0 });

onMounted(() => {
    const targetElement = document.getElementById('target');
    if (targetElement) {
        observer.observe(targetElement);
    }
});

</script>

<style scoped lang="scss">
.date{
    font-size: unit(14);
    font-weight:500;
}
.payment_container{
    display:flex;
    flex-direction: column;
    width:100%;
    padding: unit(17);
    gap: unit(4);
    margin: unit(16) 0;
}
.list_container{
    display:flex;
    flex-direction: column;
    gap:unit(4);
    margin: unit(16) 0;

}
.row_container{
    display:flex;
    justify-content: space-between;
    font-size: unit(18);
    font-weight: 600;
}
.timestamp{
    font-size: unit(14);
    font-weight: 500;
}

</style>