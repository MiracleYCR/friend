<template>
  <view class="login_container" :style="{ padding: pagePadding }">
    <block v-if="showWelcome">
      <view :animation="animationData" class="weclome">
        <view class="title">欢迎来到梦缘婚恋</view>
        <view class="copyright">©版权（copyright）梦缘婚恋有限公司</view>
      </view>
    </block>

    <block v-else>
      <view class="loginForm">
        <view class="formItem mb-16px">
          <wd-img class="w-24px h-24px mr-8px" src="/static/images/phone2.png"></wd-img>
          <wd-input
            class="flex-1"
            type="number"
            v-model="formData.phone"
            placeholder="请输入手机号码"
          />
        </view>

        <view class="formItem">
          <view class="w-100% flex items-center justify-between">
            <wd-img class="w-24px h-24px mr-8px" src="/static/images/code.png"></wd-img>
            <wd-input
              class="flex-1"
              type="number"
              v-model="formData.code"
              placeholder="请输入验证码"
            ></wd-input>
            <wd-button
              class="codeBtn ml-10px min-w-100px"
              type="text"
              size="small"
              :disabled="!smsCodeBtnEnabled"
              @click="handleGetSmsCode"
            >
              <template v-if="!notCountDown">重新获取（{{ seconds }} ）</template>
              <template v-else>获取验证码</template>
            </wd-button>
          </view>
        </view>

        <view class="w-100% mt-30px">
          <wd-button
            class="login_btn w-100%"
            type="error"
            size="large"
            :disabled="!loginBtnEnabled"
            @click="handleLoginApp"
          >
            登录/注册
          </wd-button>
        </view>

        <!-- <view class="specialLogin">
          <view class="text">其他登录方式</view>
          <wd-img
            class="w-40px h-40px"
            src="/static/images/wechat.png"
            @click="handleLoginAppByWechat"
          ></wd-img>
        </view> -->

        <view class="policy">
          <wd-checkbox shape="square" v-model="formData.agree" />
          <view class="text">
            登录注册即表示同意
            <wd-text text="《用户须知》" color="#000000"></wd-text>
            <wd-text text="《隐私协议》" color="#000000"></wd-text>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed, onBeforeUnmount } from 'vue'

import { getDataMap } from '@/api/common'
import { getOwnUserInfo } from '@/api/user'
import { getSmsCode, login } from '@/api/login'

import { useUserStore, useCommonStore } from '@/store'
import { setPagePadding } from '@/hooks/useSafeInset'

import registerTUIKit from '@/utils/TUIKit'

const { pagePadding } = setPagePadding(20, 15, 20, 15)

// 用户 pinia
const userStore = useUserStore()
const commonStore = useCommonStore()

const formData = reactive<{
  phone: string
  code: string
  agree: boolean
  uuid: string
}>({
  uuid: '',
  code: '',
  phone: '',
  agree: false,
})

const showWelcome = ref(true)
const animationData = ref({})
const startAnimation = () => {
  const animation = uni.createAnimation({
    duration: 2000,
    timingFunction: 'ease-in-out',
  })
  animation.opacity(0).step()
  animationData.value = animation.export()
}

// 验证码
const timer = ref(null)
const seconds = ref(60)
const notCountDown = ref(true)
const smsCodeBtnEnabled = computed(() => {
  return /^1[3-9]\d{9}$/.test(formData.phone) && notCountDown.value
})
const startCountdown = () => {
  // 每秒减少一次倒计时
  timer.value = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value -= 1
    } else {
      clearInterval(timer.value)
    }
  }, 1000)
}
const handleGetSmsCode = async () => {
  notCountDown.value = false
  seconds.value = 60
  startCountdown()
  const res: any = await getSmsCode(formData.phone)
  // formData.code = res.code
  formData.uuid = res.uuid
}

const loginBtnEnabled = computed(() => {
  return /^1[3-9]\d{9}$/.test(formData.phone) && formData.code
})

const requestLocationPermission = () => {
  return new Promise((resolve, reject) => {
    if (uni.getSystemInfoSync().platform === 'android') {
      plus.android.requestPermissions(
        ['android.permission.ACCESS_FINE_LOCATION'],
        (e) => {
          if (e.deniedAlways.length > 0) {
            reject(Error('用户永久拒绝了定位权限'))
          } else if (e.deniedPresent.length > 0) {
            reject(Error('用户本次拒绝了定位权限'))
          } else {
            resolve(true)
          }
        },
        (err) => {
          reject(err)
        },
      )
    } else {
      resolve(true) // iOS 处理
    }
  })
}
const handleLoginApp = async () => {
  if (formData.agree) {
    requestLocationPermission().then(() => {
      uni.showLoading({
        title: '用户登录中...',
        mask: true,
      })

      uni.getLocation({
        type: 'gcj02',
        // type: 'wgs84',
        success: async (res) => {
          // 获取权限
          const { token }: any = await login({
            uuid: formData.uuid,
            code: formData.code,
            phone: formData.phone,
            latitude: res.latitude,
            longitude: res.longitude,
          })

          userStore.setToken(token)

          // 获取用户信息
          const userInfoResp: any = await getOwnUserInfo()
          userStore.setUserInfo(userInfoResp.data)

          // 获取枚举
          const dataMapResp: any = await getDataMap()
          commonStore.setDataMap(dataMapResp.data)

          // 注册TUIKit
          registerTUIKit(userInfoResp.data.appId)

          uni.hideLoading()

          uni.switchTab({ url: '/pages/connect/index' })
        },
        fail: async (err) => {
          console.error('获取位置信息失败', err)

          // 获取权限
          const { token }: any = await login({
            uuid: formData.uuid,
            code: formData.code,
            phone: formData.phone,
            latitude: 22.5445741,
            longitude: 114.0545429,
          })

          userStore.setToken(token)

          // 获取用户信息
          const userInfoResp: any = await getOwnUserInfo()
          userStore.setUserInfo(userInfoResp.data)

          // 获取枚举
          const dataMapResp: any = await getDataMap()
          commonStore.setDataMap(dataMapResp.data)

          // 注册TUIKit
          registerTUIKit(userInfoResp.data.appId)

          uni.hideLoading()

          uni.switchTab({ url: '/pages/connect/index' })
        },
      })
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '请勾选同意《用户须知》和《隐私协议》！',
    })
  }
}

const handleLoginAppByWechat = async () => {
  // uni.getProvider({
  //   service: 'oauth',
  //   success: function (res) {
  //     if (res.provider.includes('weixin')) {
  //       uni.login({
  //         provider: 'weixin',
  //         success: (res) => {
  //           console.log('微信登录成功，code:', res.code)
  //           // 发送 code 到后端换取 access_token
  //         },
  //         fail: (err) => {
  //           console.error('微信登录失败', err)
  //         },
  //       })
  //     }
  //   },
  // })
}

onMounted(() => {
  startAnimation()
  setTimeout(() => {
    showWelcome.value = false
  }, 1500)
})

onBeforeUnmount(() => {
  timer.value && clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.login_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../static/images/background4.png');

  .weclome {
    width: 100%;
    height: 100%;
    color: #686a7a;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    transition:
      opacity 0.5s,
      visibility 0.5s;

    .title {
      font-weight: 500;
      font-size: 20px;
    }

    .copyright {
      bottom: 0;
      position: absolute;
      font-weight: 400;
      font-size: 12px;
    }
  }

  .loginForm {
    width: 100%;
    height: 100%;
    color: #686a7a;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition:
      opacity 0.5s,
      visibility 0.5s;

    .formItem {
      width: 100%;
      height: 50px;
      border-radius: 25px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
      background: rgba(147, 149, 164, 0.1) !important;

      :deep(.wd-input) {
        background: transparent !important;
        &::after {
          display: none;
        }
      }

      .codeBtn {
        color: #fd2b58;
        border-color: #fd2b58;
      }
    }

    .login_btn {
      background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
    }

    .specialLogin {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      bottom: 50px;

      .text {
        font-weight: 400;
        font-size: 12px;
        color: #9395a4;
        margin-bottom: 15px;
      }
    }

    .policy {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 400;
      font-size: 12px;

      :deep(.wd-checkbox.is-checked .wd-checkbox__shape) {
        color: #ffffff;
        background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
