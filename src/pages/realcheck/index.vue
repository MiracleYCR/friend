<template>
  <view class="realcheck_container">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">实名认证</view>
    </view>

    <view class="body">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <view class="curPhone">认证后你可以获得更多的曝光和推荐</view>

        <view class="form">
          <view class="formItem">
            <view class="label">
              <wd-img class="w-24px h-24px mr-8px" src="/static/images/user.png"></wd-img>
              姓名
            </view>
            <wd-input v-model="formData.name" placeholder="请输入姓名" />
          </view>

          <view class="formItem">
            <view class="label">
              <wd-img class="w-24px h-24px mr-8px" src="/static/images/user2.png"></wd-img>
              身份证号码
            </view>
            <wd-input type="number" v-model="formData.idcard" placeholder="请输入身份证号码" />
          </view>
        </view>

        <view class="tip">
          <view class="title">温馨提示：</view>
          <wd-text></wd-text>
          <wd-text
            size="14px"
            text="1、根据《互联网直播服务管理规定》《移动互联网应用程序信息服务管理规定》的相关要求，为了提高用户推荐时信息的真实性，保障您或其他用户的安全，或维护功能/服务的安全稳定，需要您提供真实身份信息（真实姓名、身份证件号码、个人生物识别信息）以完成实名认证。现经您主动申请并授权同意，我们将通过第三方服务商提供实名认证验证服务。因个人姓名、身份证号码及个人生物识别信息为个人敏感信息，根据相关法律法规要求，请您仔细阅读以下授权书内容，勾选“我已阅读并同意”完成授权，我们会对信息严格保密，信息将会存储至本账号不再正常使用；
    2、用户本人主动向平台提供本人个人信息申请实名验证的，须保证提供的为用户本人真实合法有效的身份信息，禁止以任何形式买卖、伪造、篡改、盗用个人信息，请您严肃交友，诚信参与；
    3、客服电话：**************。"
            color="#686A7A"
          ></wd-text>
        </view>

        <wd-button class="confirmBtn" block :disabled="nextBtnEnabled" @click="handleNextStep">
          下一步
        </wd-button>

        <view class="confirm">
          <wd-checkbox v-model="formData.isCheck" shape="square"></wd-checkbox>
          <view class="content">
            我已阅读并同意
            <wd-text
              text="《实名认证授权书》"
              decoration="underline"
              color="#fd2b58"
              @click="handleGotoPolicy('AUTHORIZATION_LETTER')"
            />
          </view>
        </view>
      </z-paging>
    </view>

    <wd-overlay :show="dialogVisible" @click="dialogVisible = false">
      <view class="dialog_wrapper">
        <view class="block">
          <wd-img class="w-48px h-48px mt-15px mb-5px" src="/static/images/bell.png" />
          <view class="text">
            <view class="title">真的要离开吗</view>
            <view class="desc">完成认证可以认识更多实名用户哦~</view>
          </view>
          <view class="btns">
            <wd-button class="cancel" @click="handleLeave">残冷离开</wd-button>
            <wd-button class="confirm" @click="handleStay">继续认证</wd-button>
          </view>
        </view>
      </view>
    </wd-overlay>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { realCheck } from '@/api/common'

const formData = reactive({
  name: '',
  idcard: '',
  isCheck: false,
})

const nextBtnEnabled = computed(() => {
  return formData.name && formData.idcard && formData.isCheck
})

const dialogVisible = ref<boolean>(false)

const handleBack = () => {
  dialogVisible.value = true
}

const handleGotoPolicy = (code: string) => {
  uni.navigateTo({
    url: `/pages/policy/index?code=${code}`,
  })
}

const handleNextStep = async () => {
  await realCheck({ name: formData.name, idcard: formData.idcard })
}

const handleLeave = () => {
  uni.navigateBack()
}

const handleStay = () => {
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.realcheck_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #f3f5f6;
  padding: env(safe-area-inset-top) 15px 0 15px;

  .header {
    width: 100%;
    height: 45px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    .back {
      position: absolute;
      left: 0;
      width: 16px;
      height: 16px;
    }

    .search {
      position: absolute;
      right: 0;
      width: 30px;
      height: 30px;
    }
  }

  .body {
    flex: 1;

    .list_scroll {
      :deep(.zp-paging-container-content) {
        display: flex;
        flex-direction: column;
      }

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

      .tip {
        margin-top: 15px;
        .title {
          color: #191c32;
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
        }
      }

      .confirm {
        margin: 15px;
        display: flex;
        align-items: center;
        justify-content: center;

        :deep(.wd-checkbox.is-checked .wd-checkbox__shape) {
          color: #ffffff;
          background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
        }

        .content {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 400;
        }
      }

      .confirmBtn {
        width: 100%;
        height: 44px;
        margin-top: 30px;
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
        background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
      }
    }
  }

  .dialog_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .block {
      width: 80%;
      height: 220px;
      border-radius: 10px;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 10px 20px 10px;
      box-sizing: border-box;

      .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: center;
        padding: 10px 10px;
        box-sizing: border-box;

        .title {
          font-size: 16px;
          font-weight: 600;
        }

        .desc {
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          margin-top: 15px;
          color: #686a7a;
        }
      }

      .btns {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;

        .cancel {
          width: 100px;
          height: 40px;
          line-height: 40px;
          background-color: #9395a4;
        }

        .confirm {
          width: 100px;
          height: 40px;
          line-height: 40px;
          background-color: #fd2b58;
        }
      }
    }
  }
}
</style>
