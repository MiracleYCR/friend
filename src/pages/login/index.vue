<template>
  <view class="login">
    <view v-if="showWelcome" class="weclome">
      <view class="title">欢迎来到梦缘婚恋</view>
      <view class="copyright">©版权（copyright）梦缘婚恋有限公司</view>
    </view>

    <view v-else class="loginForm">
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

      <view class="policy">
        <wd-checkbox shape="square" v-model="formData.agree" />
        <view class="text">
          登录注册即表示同意
          <wd-text text="《用户须知》" color="#000000"></wd-text>
          <wd-text text="《隐私协议》" color="#000000"></wd-text>
        </view>
      </view>
    </view>

    <!-- <transition name="fade">
      <view v-if="showWelcome" class="weclome">
        <view class="title">欢迎来到梦缘婚恋</view>
        <view class="copyright">©版权（copyright）梦缘婚恋有限公司</view>
      </view>

      <view v-else class="loginForm">
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

        <view class="policy">
          <wd-checkbox shape="square" v-model="formData.agree" />
          <view class="text">
            登录注册即表示同意
            <wd-text text="《用户须知》" color="#000000"></wd-text>
            <wd-text text="《隐私协议》" color="#000000"></wd-text>
          </view>
        </view>
      </view>
    </transition> -->
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { reactive, onMounted, computed, onBeforeUnmount } from 'vue'

import { delay } from '@/utils'
import { getOwnUserInfo } from '@/api/user'
import { getSmsCode, login } from '@/api/login'

// 用户 pinia
const userStore = useUserStore()

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

// 验证码
const timer = ref(null)
const seconds = ref(60)
const notCountDown = ref(true)
const currentUuid = ref('')
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
  formData.uuid = res.uuid
}

const loginBtnEnabled = computed(() => {
  return /^1[3-9]\d{9}$/.test(formData.phone) && formData.code
})

const handleLoginApp = async () => {
  if (formData.agree) {
    try {
      uni.getLocation({
        type: 'gcj02',
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
          const { data }: any = await getOwnUserInfo()
          userStore.setUserInfo(data)

          uni.switchTab({ url: '/pages/connect/index' })
        },
        fail: (err) => {
          console.error('获取位置信息失败', err)
        },
      })
    } catch (err) {}
  } else {
    uni.showToast({
      icon: 'none',
      title: '请勾选同意《用户须知》和《隐私协议》！',
    })
  }
}

onMounted(() => {
  setTimeout(() => {
    showWelcome.value = false
  }, 1500)
})

onBeforeUnmount(() => {
  timer.value && clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.login {
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
  padding: calc(env(safe-area-inset-top) + 20px) 15px 20px 15px;
  background-image: url('../../static/images/background4.png');

  .weclome {
    width: 100%;
    height: 100%;
    color: #686a7a;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;

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

      // .codeBtn.is-disabled {
      //   color: #000000;
      //   opacity: 0.3 !important;
      // }
    }

    .login_btn {
      background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
    }

    .policy {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 400;
      font-size: 12px;
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
