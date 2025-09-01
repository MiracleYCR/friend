<template>
  <view class="tech_container" :style="{ padding: pagePadding }">
    <view class="header">
      <wd-img
        class="w-60px h-60px rounded-xl overflow-hidden"
        src="/static/app/icons/1024x1024.png"
      />
      <view class="title">梦缘婚恋</view>
    </view>

    <z-paging
      class="list_scroll"
      :fixed="false"
      :scroll-y="true"
      :scroll-view="true"
      :show-scrollbar="false"
    >
      <view class="subTitle">隐私政策</view>
      <rich-text class="ql-editor" :nodes="htmlContent"></rich-text>
      <view class="copyright">
        <view class="line">— 欢迎来到梦缘婚恋 —</view>
        <view class="line">©版权（copyright）梦缘婚恋有限公司</view>
      </view>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getPolicyDetail } from '@/api/policy'

const { pagePadding } = setPagePadding(10, 10, 10, 10)

const htmlContent = ref('')

onLoad(async () => {
  const { data }: any = await getPolicyDetail({ code: 'PRIVACY_POLICY' })
  htmlContent.value = decodeURIComponent(data.content)
})
</script>

<style lang="scss" scoped>
.tech_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../static/images/background4.png');

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .header {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    .title {
      font-size: 35px;
      margin-left: 20px;
      font-weight: bold;
    }
  }

  .list_scroll {
    flex: 1;

    :deep(.zp-paging-container-content) {
      display: flex;
      flex-direction: column;
    }

    .subTitle {
      font-size: 20px;
      font-weight: bold;
      margin: 10px 0 10px 10px;
    }

    .ql-editor {
      color: #666666;
      font-size: 14px;
    }

    .copyright {
      height: 55px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: env(safe-area-inset-bottom);
      font-weight: 400;
      font-size: 12px;
      color: #999999;
      line-height: 25px;
    }
  }
}
</style>
