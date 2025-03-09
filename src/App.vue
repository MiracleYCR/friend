<script setup lang="ts">
import registerTUIKit from '@/utils/registerTUIKit'

onLaunch(() => {
  // 注册腾讯聊天
  registerTUIKit()
})
</script>

<style lang="scss">
/* 每个页面公共css */
uni-page-body,
html,
body,
page {
  width: 100% !important;
  height: 100% !important;
  overflow: hidden;
}

.global-element {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: red;
  padding: 10px;
  color: white;
  z-index: 9999;
}
</style>
