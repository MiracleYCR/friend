<template>
  <view class="square_container">
    <view class="tab_wrapper">
      <wd-tabs class="tab" v-model="tab">
        <wd-tab title="关注"></wd-tab>
        <wd-tab title="广场"></wd-tab>
        <wd-tab title="同城"></wd-tab>
      </wd-tabs>
    </view>

    <view class="body">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <view class="card" v-for="n in 10" :key="n">
          <StatusCard @click="handleGotoPostDetail" />
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import StatusCard from '@/components/card/status.vue'

const tab = ref<number>(1)

const handleGotoPostDetail = () => {
  uni.navigateTo({
    url: '/pages/postDetail/index',
  })
}
</script>

<style lang="scss" scoped>
.square_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: env(safe-area-inset-top) 15px 0 15px;
  background-color: #f3f5f6;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../static/images/background.png');

  .tab_wrapper {
    height: 50px;
    display: flex;
    align-items: center;
    .tab {
      width: 140px;
      background: transparent;

      :deep(.wd-tabs__nav-item.is-active) {
        font-size: 16px;
        font-weight: 600;
      }

      :deep(.wd-tabs__nav) {
        background: transparent;
      }

      :deep(.wd-tabs__line) {
        background: linear-gradient(90deg, #fb2c58 0%, rgba(251, 44, 88, 0) 100%) !important;
      }
    }
  }

  .body {
    flex: 1;
    padding-bottom: 15px;
    box-sizing: border-box;
  }
}
</style>
