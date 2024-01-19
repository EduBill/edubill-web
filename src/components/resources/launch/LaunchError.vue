<template>
  <div class="resource launch-error">
    <div class="resource-content">
      <div class="title">
        <div class="emotion">
          <!-- <img src="/imgs/emoji/emoji-wow.png" alt="Wow!!" /> -->
        </div>
      </div>

      <div class="message">
        <ul>
          <li>
            <p v-html="error"></p>
          </li>
        </ul>
      </div>

      <div class="button btn-large btn-filled" @click="onClickRetry">
        {{ '다시 시도하기' }}
      </div>
    </div>

    <!-- <page-actions :float="true" class="page-actions">
      <ui-button ripple class="bottom-button btn-large btn-filled" @click="onClickRetry">
        <span>{{ $t('다시 시도하기') }}</span>
      </ui-button>
    </page-actions> -->
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  error: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
  },
});

const error = computed(() => {
  return props.error || 'Error';
});

function onClickRetry(e: Event) {
  location.reload();
}
</script>

<style lang="scss" scoped>
.resource.launch-error {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  min-height: 100%;
  background-color: #f0f3f3;

  .resource-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: unit(32) 0;
  }

  .title {
    margin-bottom: unit(32);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .emotion {
      img {
        width: unit(80);
        height: unit(80);
      }
    }

    p {
      padding: 0 unit(16);
      font-size: unit(38);
      text-align: center;
      font-weight: 400;
      word-wrap: break-word;
      word-break: keep-all;

      &:deep() {
        em {
          font-weight: 800;
        }
      }
    }
  }

  .message {
    padding-bottom: unit(32);
    white-space: pre-line;
    text-align: center;

    ul {
      p {
        font-size: unit(16);
        font-weight: 500;
      }
    }
  }

  .button {
    width: unit(200);
  }

  .page-actions-content {
    padding: 0;
  }
  .page-actions {
    padding: 0;
  }
}
</style>
