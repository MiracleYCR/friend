<template>
  <view class="bindphone_container" :style="{ padding: pagePadding }">
    <view class="curPhone">
      现绑定手机号 {{ encryptPhoneNumber(userStore.userInfo.phonenumber) }}
    </view>

    <view class="form">
      <view class="formItem">
        <view class="label">
          <wd-img class="w-24px h-24px mr-8px" src="/static/images/phone2.png"></wd-img>
          手机号
        </view>
        <wd-input type="number" v-model="formData.phone" placeholder="请输入手机号码" />
      </view>

      <view class="formItem">
        <view class="label">
          <wd-img class="w-24px h-24px mr-8px" src="/static/images/code.png"></wd-img>
          验证码
        </view>

        <view class="flex items-center justify-between">
          <wd-input
            class="codeInput"
            type="number"
            v-model="formData.code"
            placeholder="请输入验证码"
          ></wd-input>

          <wd-button
            class="codeBtn"
            size="small"
            :disabled="!smsCodeBtnEnabled"
            @click="handleGetSmsCode"
          >
            <template v-if="!notCountDown">重新获取 ({{ seconds }})</template>
            <template v-else>获取验证码</template>
          </wd-button>
        </view>
      </view>
    </view>

    <wd-button
      class="confirmBtn"
      block
      :disabled="!loginBtnEnabled"
      @click="handleConfirmBindPhoneNumber"
    >
      确认
    </wd-button>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useUserStore } from '@/store'
import { encryptPhoneNumber } from '@/utils'
import { setPagePadding } from '@/hooks/useSafeInset'

import { getSmsCode, bindPhoneNumber } from '@/api/login'

const userStore: any = useUserStore()

const { pagePadding } = setPagePadding(0, 15, 0, 15)

const formData = reactive({
  uuid: '',
  code: '',
  phone: '',
})

const loginBtnEnabled = computed(() => {
  return /^1[3-9]\d{9}$/.test(formData.phone) && formData.code
})

// 当前校验码
const curCode = ref('')

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
  curCode.value = res.code
  formData.uuid = res.uuid
}

const handleConfirmBindPhoneNumber = async () => {
  if (formData.code !== curCode.value) {
    return uni.showToast({
      title: '验证码错误',
      icon: 'none',
      duration: 1500,
    })
  }

  try {
    await bindPhoneNumber({ uuid: formData.uuid, phone: formData.phone })

    uni.showToast({
      title: '手机号码换绑成功',
      icon: 'none',
      duration: 2000,
    })
  } catch (err) {}
}
</script>

<style lang="scss" scoped>
.bindphone_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #f3f5f6;
  padding: env(safe-area-inset-top) 15px 0 15px;

  .curPhone {
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
    line-height: 20px;
  }

  .form {
    width: 100%;
    height: 208px;
    border-radius: 10px;
    padding: 15px;
    margin-top: 15px;
    box-sizing: border-box;
    background-color: #ffffff;

    .formItem {
      height: 104px;
      display: flex;
      flex-direction: column;

      .label {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }

      .codeInput {
        width: 100%;
      }

      .codeBtn {
        margin: 0;
        width: 150px;
        margin-left: 10px;
        color: #ffffff;
        background-color: #fd2b58;
      }
    }
  }

  .confirmBtn {
    height: 44px;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
  }
}
</style>
