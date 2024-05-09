<template>
  <div id="navigation" class="navigation">
    <ul>
      <li
        v-for="(item, i) in state.menuItems"
        :key="i"
        :class="{ selected: item.name === state.selectedMenuName }"
      >
        <button type="button" @click="onClickItem($event, item)">
          <svg-icon
            :name="
              item.name === state.selectedMenuName
                ? `${item.icon}-selected`
                : item.icon
            "
          />
          <span>{{ $t(item.label) }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash';
import { onBeforeMount, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SvgIcon from '@/plugins/svg-icon/lib/SvgIcon.vue';
import { $t } from '@/plugins/locale';
import { useAnalytics } from '@/plugins/analytics';

const route = useRoute();
const router = useRouter();
const analytics = useAnalytics();

const state = reactive({
  menuItems: [
    {
      name: 'Home',
      icon: 'menu-home',
      label: '홈',
    },
    {
      name: 'Explore',
      icon: 'menu-explore',
      label: '탐색',
    },
    {
      name: 'TicketList',
      icon: 'menu-ticket',
      label: '이용티켓',
    },
    {
      name: 'Mypage',
      icon: 'menu-mypage',
      label: '마이페이지',
    },
  ],
  selectedMenuName: '',
});

onBeforeMount(() => {
  const selectedItem = _.find(
    state.menuItems,
    item => route.name === item.name
  );
  state.selectedMenuName = selectedItem?.name ?? '';
});

function onClickItem(e: Event, item: any) {
  // console.log('###### gnb : ', item.label, convertGnbType(route.name));
  analytics.event('select_gnb_menu', {
    airbridge: {},
    common: {
      menu_name: item.label,
      home_name: convertGnbType(route.name),
    },
  });
  if (route.name === item.name) {
    return;
  }

  router.push({ name: item.name });
}

function convertGnbType(gnbType) {
  switch (gnbType) {
    case 'Home':
      return '홈';
    case 'Explore':
      return '탐색';
    case 'TicketList':
      return '이용티켓';
    case 'Mypage':
      return '마이페이지';
    default:
      return gnbType;
  }
}
</script>

<style lang="scss">
#navigation {
  @include backdrop(#fff, 0.9, 4px);

  position: fixed;
  z-index: 100;
  bottom: 0;
  left: auto;
  right: auto;

  width: 100%;
  max-width: $max-content-width;
  height: unit(94);
  // height: unit(58.5);
  // padding-bottom: env(safe-area-inset-bottom);
  border-top: 0.5px solid #e0e0e0;

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: unit(8);

        > .icon {
          font-size: unit(28);
          color: #a0a0a0;
        }

        > span {
          font-size: unit(12);
          font-weight: 500;
          color: #a0a0a0;
        }
      }

      &.selected {
        button {
          > .icon {
            color: #009ec1;
          }

          > span {
            font-weight: 600;
            color: #009ec1;
          }
        }
      }
    }
  }
}
</style>
