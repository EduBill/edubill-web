<template>
    <div id="sendbill" class="sendbill" @click="onClickSendBill">
        <div>
            이번 달 청구서를 발송할 때가 되었어요!
        </div>
        <img src="@/assets/icons/svg/arrow_white.svg" />
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';

async function onClickSendBill() {
    router.push({
    name: 'Home',
    });
}
</script>

<style lang="scss" scoped>
#sendbill {
    width: 100%;
    height: 2.75rem;
    padding: 0rem 1.25rem;
    margin-top: 2.25rem;
    

    display: flex;
    justify-content: space-between;
    align-items: center;
    
    border-radius: 0.625rem;
    background: var(--Primary-Gradient, linear-gradient(90deg, #4600DD 0%, #7535FF 100%));

    div {
        color: #FFF;
        font-size: 1rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.75rem; /* 175% */
    }
}
</style>