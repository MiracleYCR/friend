<template>
  <view class="companyinfo_contianer">
    <z-paging
      class="list_scroll"
      :fixed="false"
      :scroll-y="true"
      :scroll-view="true"
      :show-scrollbar="false"
    >
      <view class="infoItem">
        <view class="title">营业执照</view>
        <wd-img class="w-100% h-280px" src="/static/images/banner.png"></wd-img>
      </view>
      <view class="infoItem">
        <view class="title">增值电信业务许可证</view>
        <wd-img class="w-100% h-280px" src="/static/images/banner.png"></wd-img>
      </view>
    </z-paging>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.companyinfo_contianer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #f3f5f6;
  padding: env(safe-area-inset-top) 10px 0 15px;

  .list_scroll {
    flex: 1;

    :deep(.zp-paging-container-content) {
      display: flex;
      flex-direction: column;
    }

    .infoItem {
      padding: 15px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      flex-direction: column;

      .title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
