<template>
  <view class="policy_contianer">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">
        {{ policyTitle }}
      </view>
    </view>

    <z-paging
      class="list_scroll"
      :fixed="false"
      :scroll-y="true"
      :scroll-view="true"
      :show-scrollbar="false"
    >
      <rich-text class="ql-editor" :nodes="htmlContent"></rich-text>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getPolicyDetail } from '@/api/policy'

const policyTitle = ref<string>('')
const htmlContent = ref<string>('')

const policyTitleMap = {
  COM_QUALIFY: '企业资质',
  AUTHORIZATION_LETTER: '授权书',
  INFORMATION_FOR_USERS: '用户协议',
  PRIVACY_POLICY: '隐私政策',
  USER_CONDUCT: '用户行为规范',
  MEMBERSHIP_AGREEMENT: '会员协议',
  PERMISSION_LIST: '权限获取清单',
  THIRD_PARTY_SDK_LIST: '三方SDK清单',
  INFORMATION_SHARING_LIST: '信息共享清单',
  REGISTRATION_COMMITMENT: '注册承诺函',
}

const handleBack = () => {
  uni.navigateBack()
}

onLoad(async (params) => {
  policyTitle.value = policyTitleMap[params.code]
  const { data }: any = await getPolicyDetail({ code: params.code })
  htmlContent.value = decodeURIComponent(data.content)
})
</script>

<style lang="scss" scoped>
.policy_contianer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #f3f5f6;
  padding: env(safe-area-inset-top) 10px 0 15px;

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
  }

  .list_scroll {
    flex: 1;

    :deep(.zp-paging-container-content) {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
