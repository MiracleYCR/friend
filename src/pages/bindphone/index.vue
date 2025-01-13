<template>
  <view class="bindphone_container">
    <view class="curPhone">现绑定手机号184****6881</view>

    <view class="form">
      <view class="formItem">
        <view class="label">
          <wd-img class="w-24px h-24px mr-8px" src="/static/images/phone2.png"></wd-img>
          手机号
        </view>
        <wd-input type="number" v-model="form.phone" placeholder="请输入手机号码" />
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
            v-model="form.phone"
            placeholder="请输入手机号码"
          ></wd-input>
          <wd-button class="codeBtn" plain size="small">获取验证码</wd-button>
        </view>
      </view>
    </view>

    <wd-button class="confirmBtn" block>确认</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
  phone: '',
  code: '',
})
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
        width: 100px;
        color: #fd2b58;
        margin-left: 10px;
        border-color: #fd2b58;
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
