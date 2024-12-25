<template>
  <view class="logo">
    <wd-img class="icon" src="/static/app/icons/192x192.png" />
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: env(safe-area-inset-top);

  .icon {
    width: 50px;
    height: 50px;
  }
}
</style>
