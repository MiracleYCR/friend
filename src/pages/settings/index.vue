<template>
  <view class="settings_contianer" :style="{ padding: pagePadding }">
    <view class="options">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <view class="optWrapper top">
          <view class="optItem">
            自动回复设置
            <wd-img class="w-16px h-16px" src="/src/static/images/arrow.png" />
          </view>
          <view class="optItem">
            安全指南
            <wd-img class="w-16px h-16px" src="/src/static/images/arrow.png" />
          </view>
          <view class="optItem" @click="handleGotoPolicy('USER_CONDUCT')">
            用户行为规范
            <wd-img class="w-16px h-16px" src="/src/static/images/arrow.png" />
          </view>
          <view class="optItem">
            黑名单
            <wd-img class="w-16px h-16px" src="/src/static/images/arrow.png" />
          </view>
        </view>

        <view class="optWrapper middle">
          <view class="optItem" @click="handleGotoPolicy('INFORMATION_FOR_USERS')">
            用户须知
            <wd-img class="w-16px h-16px" src="/src/static/images/arrow.png" />
          </view>
          <view class="optItem" @click="handleGotoPolicy('PRIVACY_POLICY')">
            隐私政策
            <wd-img class="w-16px h-16px" src="/src/static/images/arrow.png" />
          </view>
          <view class="optItem" @click="handleGotoPolicy('PERMISSION_LIST')">
            权限获取清单
            <wd-img class="w-16px h-16px" src="/src/static/images/arrow.png" />
          </view>
          <view class="optItem" @click="handleGotoPolicy('THIRD_PARTY_SDK_LIST')">
            三方SDK清单
            <wd-img class="w-16px h-16px" src="/src/static/images/arrow.png" />
          </view>
          <view class="optItem" @click="handleGotoPolicy('INFORMATION_SHARING_LIST')">
            信息共享清单
            <wd-img class="w-16px h-16px" src="/src/static/images/arrow.png" />
          </view>
          <view class="optItem" @click="handleGotoPolicy('REGISTRATION_COMMITMENT')">
            注册承诺函
            <wd-img class="w-16px h-16px" src="/src/static/images/arrow.png" />
          </view>
          <view class="optItem">
            系统权限管理
            <wd-img class="w-16px h-16px" src="/src/static/images/arrow.png" />
          </view>
        </view>

        <view class="optWrapper bottom">
          <view class="optItem">
            当前版本
            <view class="flex items-center">
              <wd-text text="版本号1.0.0" color="#FD2B58" size="12px"></wd-text>
              <wd-img class="w-16px h-16px ml-5px" src="/src/static/images/arrow.png" />
            </view>
          </view>
          <view class="optItem">
            注销账号
            <wd-img class="w-16px h-16px" src="/src/static/images/arrow.png" />
          </view>
        </view>

        <wd-button class="logoutBtn" block @click="handleLogout">退出登录</wd-button>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/store'
import { setPagePadding } from '@/hooks/useSafeInset'

const { pagePadding } = setPagePadding(0, 15, 0, 15)

const userStore: any = useUserStore()

const handleGotoPolicy = (type: string) => {
  uni.navigateTo({
    url: `/pages/policy/index?code=${type}`,
  })
}

const handleLogout = () => {
  userStore.logout()
  uni.reLaunch({ url: '/pages/asplash/index' })
}
</script>

<style lang="scss" scoped>
.settings_contianer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #f3f5f6;

  .options {
    flex: 1;
    margin-top: 15px;
    box-sizing: border-box;

    .optWrapper {
      padding: 15px;
      border-radius: 10px;
      box-sizing: border-box;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 400;
    }

    .optItem {
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .top {
      height: 164px;
    }

    .middle {
      height: 272px;
      margin-top: 15px;
    }

    .bottom {
      height: 92px;
      margin-top: 15px;
    }

    .logoutBtn {
      height: 48px;
      margin-top: 60px;
      color: #9395a4;
      font-size: 15px;
      font-weight: 500;
      background: rgba(147, 149, 164, 0.15);
    }
  }
}
</style>
