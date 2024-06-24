<template>
  <HomeNav />

  <div class="home">
    <div v-if="isLoading" class="home_title">
      <Loader />
    </div>
    <div v-else-if="!isLoading" class="home_title">
      <strong>{{
        userProfile?.username + ' (' + userProfile?.userType + ')'
      }}</strong
      >님, <br />반갑습니다.
    </div>
    <div v-else class="home_title">
      데이터 불러오기에 실패했어요. <br />페이지를 새로고침해주세요 !
    </div>
    <SendBillToast v-if="isPaymentDay" />
    <div>
      <CurrentPaymentStatus icon-img="payment" />
    </div>
    <div class="home_grid">
      <RectangleMenuButton
        title="납부 관리"
        content="시간별 납부 내역 확인"
        icon-name="wallet"
        back-color="#EEF5FF"
        @click="onClickPayManage"
      />
      <RectangleMenuButton
        title="원생 관리"
        content="시간별 납부 내역 확인"
        icon-name="chart"
        back-color="#F3F3FF"
      />
    </div>
    <div class="home_grid">
      <RectangleMenuButton
        title="서비스 안내"
        content="에듀빌만의 서비스"
        back-color="#F4F4F7"
      />
      <RectangleMenuButton
        title="고객센터"
        content="고객센터 안내"
        back-color="#F4F4F7"
      />
    </div>
    <div class="home_blank">더 많은 서비스를 기대해주세요!</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import { AuthApi } from '@/api/AuthApi';
import { UserProfile } from '@/stores/typings/types.userProfile';
import { useToastModule } from '@/components/modules/toast';
import HomeNav from '@/components/commons/navigation/HomeNav.vue';
import SendBillToast from '@/components/molecules/SendBillToast.vue';
import RectangleMenuButton from '@/components/resources/buttons/RectangleMenuButton.vue';
import CurrentPaymentStatus from '@/components/resources/payment/CurrentPaymentStatus.vue';
import router from '@/router';
import Loader from '@/components/atoms/Loader.vue';

const userProfile = ref<UserProfile | null>(null);
const authApi = new AuthApi();
const isLoading = ref(false);
const toast = useToastModule();

const getUserProfile = async () => {
  isLoading.value = true;
  try {
    const response = await authApi.getUserProfile();
    userProfile.value = response.data;
  } catch (error) {
    toast.error({ error });
  } finally {
    isLoading.value = false;
  }
};

// 결제일 확인
const isPaymentDay = ref(false);

const checkPaymentDay = () => {
  const today = new Date();
  const day = today.getDate();
  isPaymentDay.value = day === day;
};

onMounted(() => {
  getUserProfile();
  checkPaymentDay();
});

function onClickPayManage() {
  router.push({
    name: 'PayManage',
  });
}
</script>

<style lang="scss" scoped>
.home {
  padding: unit(20);
  white-space: pre-wrap;
  min-height: -webkit-fill-available;

  > div {
    margin: unit(16) unit(0);
  }

  &_title {
    @include text-variant('headline1');

    padding-top: unit(16);
    color: #000;
  }

  &_grid {
    display: grid;
    grid-template-columns: 0.8fr 0.8fr;
    grid-gap: unit(15.04);
  }

  &_blank {
    @include text-variant('subhead3');

    color: var(--Gray40, #bcbcbc);
    text-align: center;
    margin-top: unit(32);
  }
}
</style>
