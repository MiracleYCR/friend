<script setup lang="ts">
import { TUIChatKit } from './TUIKit'
import { TUITranslateService } from '@tencentcloud/chat-uikit-engine'
// #ifndef MP-WEIXIN
import { locales } from './TUIKitSDK/locales'
// #endif
import TIMPushConfigs from './TUIKitSDK/timpush-configs.json'
// #ifdef APP-PLUS
// register TencentCloud-TIMPush
import { IEnterChatConfig, loginFromStorage, openChat } from './TUIKitSDK/loginChat'
import TUIChatEngine from '@tencentcloud/chat-uikit-engine'
import { getNotificationAuth } from './TUIKitSDK/utils/getNotificationAuth'
const TIMPush: any = uni.requireNativePlugin('TencentCloud-TIMPush')
console.warn(`TencentCloud-TIMPush: uni.requireNativePlugin ${TIMPush ? 'success' : 'fail'}`)
uni.$TIMPush = TIMPush
uni.$TIMPushConfigs = TIMPushConfigs
const enterChatConfig: IEnterChatConfig = {
  isLoginChat: false,
  conversationID: '',
}
// register TencentCloud-TUICallKit
const TUICallKit: any = uni.requireNativePlugin('TencentCloud-TUICallKit')
console.warn(`TencentCloud-TUICallKit: uni.requireNativePlugin ${TUICallKit ? 'success' : 'fail'}`)
uni.$TUICallKit = TUICallKit
// #endif

// #ifdef APP-ANDROID
const notificationChannelInfo = {
  notificationChannelList: [
    {
      channelID: 'tuikit', // 控制台配置 oppo 的 channelID
      channelName: 'tuikit', // 自定义名称
      channelDesc: '自定义铃音', // 自定义描述
      channelSound: 'private_ring', // 自定义铃音的名称且不需要后缀名
    },
  ],
}
uni.$TIMPush.createNotificationChannels(notificationChannelInfo)
// #endif

// #ifndef MP-WEIXIN
TUITranslateService.provideLanguages(locales)
TUITranslateService.useI18n()
// #endif

TUIChatKit.init()
const SDKAppID = 1600073144 // Your SDKAppID
const secretKey = 'a86f6b8102c5c379b78baf4961923ade96af7d3ec4c34fb317099942067e63c7' // Your secretKey

uni.$chat_SDKAppID = SDKAppID
uni.$chat_secretKey = secretKey

onLaunch(() => {
  // #ifdef APP-PLUS
  // 在 App.vue, 生命钩子 onLaunch 中监听
  if (typeof uni.$TIMPush === 'undefined') {
    console.warn(
      '如果您使用推送功能，需集成 TIMPush 插件，使用真机运行并且自定义基座调试，请参考官网文档：https://cloud.tencent.com/document/product/269/103522',
    )
  } else {
    getNotificationAuth()
    uni.$on('uikitLogin', () => {
      enterChatConfig.isLoginChat = true
      openChat(enterChatConfig)
    })
    uni.$TIMPush.setOfflinePushListener((data) => {
      const { notification = '' } = data?.data || {}
      if (!notification) {
        return
      }
      const { entity } = JSON.parse(notification)
      const type =
        entity.chatType === 1 ? TUIChatEngine.TYPES.CONV_C2C : TUIChatEngine.TYPES.CONV_GROUP
      enterChatConfig.conversationID = `${type}${entity.sender}`
      if (enterChatConfig.isLoginChat && entity.sender) {
        openChat(enterChatConfig)
      }
    })
    loginFromStorage()
  }
  // #endif
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
</style>
