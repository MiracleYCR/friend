import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    color: '#9395A4',
    selectedColor: '#191C32',
    backgroundColor: '#FFFFFF',
    borderStyle: '#ffffff',
    height: '60px',
    fontSize: '10px',
    iconWidth: '30px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/home1.png',
        selectedIconPath: 'static/tabbar/home2.png',
        pagePath: 'pages/connect/index',
        text: '缘分',
      },
      {
        iconPath: 'static/tabbar/guangchang1.png',
        selectedIconPath: 'static/tabbar/guangchang2.png',
        pagePath: 'pages/square/index',
        text: '广场',
      },
      {
        iconPath: 'static/tabbar/message.png',
        selectedIconPath: 'static/tabbar/message.png',
        pagePath: 'pages/publish/index',
        text: '',
      },
      {
        iconPath: 'static/tabbar/xiaoxi1.png',
        selectedIconPath: 'static/tabbar/xiaoxi2.png',
        pagePath: 'pages/message/index',
        text: '消息',
      },
      {
        iconPath: 'static/tabbar/own1.png',
        selectedIconPath: 'static/tabbar/own2.png',
        pagePath: 'pages/own/index',
        text: '我的',
      },
    ],
  },
  pages: [
    {
      path: 'pages/asplash/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/login/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/connect/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/square/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/publish/index',
      type: 'page',
      style: {},
    },
    {
      path: 'pages/message/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/own/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/profile/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/baseInfo/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/search/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/postDetail/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/notice/index',
      type: 'page',
      style: {
        navigationBarTitleText: '消息通知',
        navigationBarBackgroundColor: '#ffffff',
      },
    },
    {
      path: 'pages/person/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/validate/index',
      type: 'page',
      style: {
        navigationBarTitleText: '认证中心',
        navigationBarBackgroundColor: '#f3f5f6',
      },
    },
    {
      path: 'pages/invite/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/inviteList/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/bindphone/index',
      type: 'page',
      style: {
        navigationBarTitleText: '手机号码换绑',
        navigationBarBackgroundColor: '#f3f5f6',
      },
    },
    {
      path: 'pages/realcheck/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/auditbook/index',
      type: 'page',
      style: {
        navigationBarTitleText: '授权书',
        navigationBarBackgroundColor: '#f3f5f6',
      },
    },
    {
      path: 'pages/wallet/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/withdraw/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/vip/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/settings/index',
      type: 'page',
      style: {
        navigationBarTitleText: '设置',
        navigationBarBackgroundColor: '#f3f5f6',
      },
    },
    {
      path: 'pages/block/index',
      type: 'page',
      style: {
        navigationBarTitleText: '黑名单',
        navigationBarBackgroundColor: '#f3f5f6',
      },
    },
    {
      path: 'pages/connectus/index',
      type: 'page',
      style: {
        navigationBarTitleText: '联系我们',
        navigationBarBackgroundColor: '#f3f5f6',
      },
    },
    {
      path: 'pages/autoapply/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/systemauth/index',
      type: 'page',
      style: {
        navigationBarTitleText: '系统权限管理',
        navigationBarBackgroundColor: '#f3f5f6',
      },
    },
    {
      path: 'pages/companyinfo/index',
      type: 'page',
      style: {
        navigationBarTitleText: '企业资质',
        navigationBarBackgroundColor: '#f3f5f6',
      },
    },
    {
      path: 'pages/suggestion/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },

    {
      path: 'pages/views/login',
      style: {
        navigationBarTitleText: '腾讯云 IM',
      },
    },
    {
      path: 'pages/views/profile',
      style: {
        navigationBarTitleText: '腾讯云 IM',
      },
    },
    {
      path: 'TUIKit/components/TUIConversation/index',
      style: {
        navigationBarTitleText: '腾讯云 IM',
      },
    },
    {
      path: 'TUIKit/components/TUIChat/index',
      style: {
        navigationBarTitleText: '腾讯云 IM',
      },
    },
    {
      path: 'TUIKit/components/TUIContact/index',
      style: {
        navigationBarTitleText: '腾讯云 IM',
      },
    },
    {
      path: 'TUIKit/components/TUIChat/video-play',
      style: {
        navigationBarTitleText: '腾讯云 IM',
      },
    },
    {
      path: 'TUIKit/components/TUIChat/web-view',
      style: {
        navigationBarTitleText: '腾讯云 IM',
      },
    },
    {
      path: 'TUIKit/components/TUIGroup/index',
      style: {
        navigationBarTitleText: '腾讯云 IM',
      },
    },
    {
      path: 'TUIKit/components/TUISearch/index',
      style: {
        navigationBarTitleText: '聊天记录',
      },
    },
  ],
})
