<template>
  <view class="notice_container">
    <z-paging
      class="list_scroll"
      :fixed="false"
      :scroll-y="true"
      :scroll-view="true"
      :show-scrollbar="false"
    >
      <view class="card" v-for="n in 10" :key="n">
        <NoticeCard />
      </view>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import NoticeCard from '@/components/card/notice.vue'
</script>

<style lang="scss" scoped>
.notice_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  .list_scroll {
    padding: 10px 15px;
    box-sizing: border-box;

    :deep(.zp-paging-container-content) {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .card {
      margin-bottom: 25px;
    }
  }
}
</style>
