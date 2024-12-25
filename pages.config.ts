import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f1f4fc',
    backgroundColorBottom: '#f1f4fc',
    'app-plus': {
      safeAreaInsets: {
        bottom: 'auto', // 自动处理底部安全区域
      },
    },
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
    color: '#666666',
    selectedColor: '#0085FF',
    backgroundColor: '#FFFFFF',
    borderStyle: '#EEEEEE',
    height: '44px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/homeHL.png',
        pagePath: 'pages/connect/index',
        text: '缘分',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
        pagePath: 'pages/square/index',
        text: '广场',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
        pagePath: 'pages/publish/index',
        text: '发布',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
        pagePath: 'pages/message/index',
        text: '消息',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
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
      path: 'pages/connect/index',
      type: 'page',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/square/index',
      type: 'page',
      style: {},
    },
    {
      path: 'pages/publish/index',
      type: 'page',
      style: {},
    },
    {
      path: 'pages/message/index',
      type: 'page',
      style: {},
    },
    {
      path: 'pages/own/index',
      type: 'page',
      style: {},
    },
  ],
})
