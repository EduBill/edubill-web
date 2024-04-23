<template>
    <div class="payment_container">
        <div class="row_container">
            <div>최수영 2839</div>
            <div>+30000</div>
        </div>
        <div class="timestamp">22:14</div>
    </div>
    <button @click="click">버튼 클릭시 api 호출</button>
</template>

<script setup lang="ts">
// import axios from '../../../modules/axios/index';
import axios from 'axios';

const click = async () => {
    console.log('click');
    await fetchData();
};
const fetchData = async()=>{
    try{
        const response = await axios.get(`https://api.edu-bill.co.kr/v1/payment/paidHistories/2024-4`,{
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRoIjoiQUNBREVNWSIsInN1YiI6IjAxMDI3ODkyMTY1IiwiaWF0IjoxNzEyMTU2NzIxLCJleHAiOjQ4NjU3NTY3MjF9.p0vjwBv25irPuk0Cbd4iGTRoHbIsN1QJ3W2KC5Dcoaw'
            }
        });
        console.log(response.data);
    }catch(error){
        console.error('fetch error!!!!!!!!!!', error);
    }
};




</script>

<style scoped lang="scss">
.payment_container{
    display:flex;
    flex-direction: column;
    width:100%;
    padding: unit(17);
    gap: unit(3);
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