// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'
import path from 'node:path'
import { loadEnv } from 'vite'

// 获取环境变量的范例
const env = loadEnv(process.env.NODE_ENV!, path.resolve(process.cwd(), 'env'))
const {
  VITE_APP_TITLE,
  VITE_UNI_APPID,
  VITE_WX_APPID,
  VITE_APP_PUBLIC_BASE,
  VITE_FALLBACK_LOCALE,
} = env

export default defineManifestConfig({
  name: VITE_APP_TITLE,
  appid: VITE_UNI_APPID,
  description: '',
  versionName: '1.0.0',
  versionCode: '1400',
  transformPx: false,
  locale: VITE_FALLBACK_LOCALE, // 'zh-Hans'
  h5: {
    router: {
      base: VITE_APP_PUBLIC_BASE,
    },
  },
  /* 5+App特有相关 */
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    compatible: {
      ignoreVersion: true,
    },
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    /* 模块配置 */
    modules: {
      Geolocation: {},
      Camera: {},
    },
    /* 应用发布信息 */
    distribute: {
      /* android打包配置 */
      android: {
        minSdkVersion: 30,
        targetSdkVersion: 30,
        abiFilters: ['armeabi-v7a', 'arm64-v8a'],
        permissions: [
          '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-permission android:name="android.permission.INTERNET"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>',
          '<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>',
          '<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION"/>',
          '<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>',
          '<uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS"/>',
        ],
      },
      /* ios打包配置 */
      ios: {
        bundleIdentifier: 'cn.shanghaimy.mengyuanuniapp',
        appleId: '74QA2QHL5B',
        LOCATION_ALWAYS: '获取用户设备定位权限',
        LOCATION_WHEN_IN_USE: '使用时获取用户设备定位权限',
        capabilities: {},
        privacyDescription: {
          NSLocationAlwaysUsageDescription: 'App 需要持续访问您的位置信息',
          NSLocationWhenInUseUsageDescription: '需要获取您的位置信息，用于附近服务定位',
          NSLocationAlwaysAndWhenInUseUsageDescription: 'App需要持续和使用时访问您的位置信息',
          NSCameraUsageDescription: '需要使用相机拍摄照片',
          NSPhotoLibraryUsageDescription: '需要访问相册选择和保存图片',
          NSPhotoLibraryAddUsageDescription: '需要保存图片到相册',
          NSMicrophoneUsageDescription: '需要使用麦克风录制语音',
          NSBluetoothAlwaysUsageDescription: '需要使用蓝牙连接设备',
          NSBluetoothPeripheralUsageDescription: '需要使用蓝牙与设备进行通信',
          NSContactsUsageDescription: '需要访问通讯录以便导入联系人信息',
          NSCalendarsUsageDescription: '需要访问日历以添加或读取事件',
          NSRemindersUsageDescription: '需要访问提醒事项以创建提醒',
          NSMotionUsageDescription: '需要访问运动与健康数据',
          NSHealthUpdateUsageDescription: '需要写入健康数据',
          NSHealthShareUsageDescription: '需要读取健康数据',
          NSFaceIDUsageDescription: '需要使用 Face ID 进行身份验证',
        },
      },
      /* SDK配置 */
      sdkConfigs: {
        geolocation: {
          amap: {
            name: 'amapMohH2v7d',
            __platform__: ['ios', 'android'],
            appkey_ios: '9eb8135cf529c0df519c65c2987f7aa6',
            appkey_android: '9eb8135cf529c0df519c65c2987f7aa6',
          },
        },
      },
      /* 图标配置 */
      icons: {
        android: {
          hdpi: '/src/static/app/icons/72x72.png',
          xhdpi: '/src/static/app/icons/96x96.png',
          xxhdpi: '/src/static/app/icons/144x144.png',
          xxxhdpi: '/src/static/app/icons/192x192.png',
        },
        ios: {
          appstore: '/src/static/app/icons/1024x1024.png',
          ipad: {
            app: '/src/static/app/icons/76x76.png',
            'app@2x': '/src/static/app/icons/152x152.png',
            notification: '/src/static/app/icons/20x20.png',
            'notification@2x': '/src/static/app/icons/40x40.png',
            'proapp@2x': '/src/static/app/icons/167x167.png',
            settings: '/src/static/app/icons/29x29.png',
            'settings@2x': '/src/static/app/icons/58x58.png',
            spotlight: '/src/static/app/icons/40x40.png',
            'spotlight@2x': '/src/static/app/icons/80x80.png',
          },
          iphone: {
            'app@2x': '/src/static/app/icons/120x120.png',
            'app@3x': '/src/static/app/icons/180x180.png',
            'notification@2x': '/src/static/app/icons/40x40.png',
            'notification@3x': '/src/static/app/icons/60x60.png',
            'settings@2x': '/src/static/app/icons/58x58.png',
            'settings@3x': '/src/static/app/icons/87x87.png',
            'spotlight@2x': '/src/static/app/icons/80x80.png',
            'spotlight@3x': '/src/static/app/icons/120x120.png',
          },
        },
      },
    },
  },
  /* 快应用特有相关 */
  quickapp: {},
  /* 小程序特有相关 */
  'mp-weixin': {
    appid: VITE_WX_APPID,
    setting: {
      urlCheck: false,
    },
    usingComponents: true,
    // __usePrivacyCheck__: true,
  },
  'mp-alipay': {
    usingComponents: true,
    styleIsolation: 'shared',
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  uniStatistics: {
    enable: false,
  },
  vueVersion: '3',
})
