<template>
  <view class="own_container">
    <view class="setting">
      <wd-img class="icon" src="/static/images/message.png"></wd-img>
      <wd-img class="icon" src="/static/images/settings.png" @click="handleTest"></wd-img>
    </view>

    <view class="own">
      <wd-img class="avatar" :src="userStore.userInfo.avatar"></wd-img>
      <view class="info">
        <view class="left">
          <view class="name">{{ userStore.userInfo.nickName }}</view>
          <view class="id">
            <view class="number">梦缘ID：{{ userStore.userInfo.appId }}</view>
            <view class="copy" @click="handleCopyAppId">复制</view>
          </view>
          <view class="status">
            <wd-img
              v-if="userStore.userInfo.vipOpean === '1'"
              class="icon"
              src="/static/images/vip.png"
            ></wd-img>
            <wd-img
              v-if="userStore.userInfo.hasRealName === '1'"
              class="icon"
              src="/static/images/checked.png"
            ></wd-img>
          </view>
        </view>
        <view class="right" @click="handleGotoProfile">
          查看
          <wd-img class="icon" src="/static/images/arrow.png"></wd-img>
        </view>
      </view>
    </view>

    <view class="func">
      <view class="item" @click="handleGotoFuncPage('1')">
        <view class="num">{{ userStore.userInfo.followCount || 0 }}</view>
        <view class="text">我关注的</view>
      </view>
      <view class="item" @click="handleGotoFuncPage('2')">
        <view class="num">{{ userStore.userInfo.bothFollow || 0 }}</view>
        <view class="text">互相喜欢</view>
      </view>
      <view class="item" @click="handleGotoFuncPage('3')">
        <view class="num">{{ userStore.userInfo.fansCount || 0 }}</view>
        <view class="text">喜欢我的</view>
      </view>
      <view class="item" @click="handleGotoFuncPage('4')">
        <view class="num">{{ userStore.userInfo.visitCount || 0 }}</view>
        <view class="text">最近访客</view>
      </view>
    </view>

    <view class="ad">
      <wd-img class="icon" src="/static/images/ad.png"></wd-img>
    </view>

    <view class="menu">
      <view class="item" @click="handleGotoMenu('base')">
        <wd-img class="icon" src="/static/images/base.png"></wd-img>
        <view class="entry">
          基本资料
          <wd-img class="icon2" src="/static/images/arrow2.png"></wd-img>
        </view>
      </view>
      <view class="item" @click="handleGotoMenu('wallet')">
        <wd-img class="icon" src="/static/images/wallet.png"></wd-img>
        <view class="entry">
          我的钱包
          <wd-img class="icon2" src="/static/images/arrow2.png"></wd-img>
        </view>
      </view>
      <view class="item" @click="handleGotoMenu('validate')">
        <wd-img class="icon" src="/static/images/validate.png"></wd-img>
        <view class="entry">
          认证中心
          <wd-img class="icon2" src="/static/images/arrow2.png"></wd-img>
        </view>
      </view>
      <view class="item" @click="handleGotoMenu('invite')">
        <wd-img class="icon" src="/static/images/share.png"></wd-img>
        <view class="entry">
          邀请好友
          <wd-img class="icon2" src="/static/images/arrow2.png"></wd-img>
        </view>
      </view>
    </view>

    <view class="menu2">
      <view class="item" @click="handleGotoMenu('companyinfo')">
        <wd-img class="icon" src="/static/images/folder.png"></wd-img>
        <view class="entry">
          企业资质
          <wd-img class="icon2" src="/static/images/arrow2.png"></wd-img>
        </view>
      </view>
      <view class="item" @click="handleGotoMenu('invite')">
        <wd-img class="icon" src="/static/images/thumbUp.png"></wd-img>
        <view class="entry">
          去评分
          <wd-img class="icon2" src="/static/images/arrow2.png"></wd-img>
        </view>
      </view>
      <view class="item" @click="handleGotoMenu('suggestion')">
        <wd-img class="icon" src="/static/images/email.png"></wd-img>
        <view class="entry">
          建议反馈
          <wd-img class="icon2" src="/static/images/arrow2.png"></wd-img>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store'

const userStore: any = useUserStore()

// 复制账号
const handleCopyAppId = () => {
  uni.setClipboardData({
    data: userStore.userInfo.appId,
    success: () => {
      uni.showToast({ icon: 'none', title: '复制成功' })
    },
    fail: () => {
      uni.showToast({ icon: 'none', title: '复制失败' })
    },
  })
}

const handleGotoProfile = () => {
  uni.navigateTo({
    url: `/pages/profile/index?type=own`,
  })
}

const handleGotoFuncPage = (type: string) => {
  uni.navigateTo({
    url: `/pages/person/index?type=${type}`,
  })
}

const handleGotoMenu = (type: string) => {
  uni.navigateTo({
    url: `/pages/${type}/index`,
  })
}

const handleTest = () => {
  uni.navigateTo({
    url: '/pages/views/login',
  })
}
</script>

<style lang="scss" scoped>
.own_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  box-sizing: border-box;
  padding: env(safe-area-inset-top) 15px 0 15px;
  background-color: #f3f5f6;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../static/images/background.png');

  .setting {
    display: flex;
    margin: 12px 0;
    align-items: center;
    box-sizing: border-box;
    justify-content: flex-end;
    .icon {
      width: 24px;
      height: 24px;
      margin-left: 10px;
    }
  }

  .own {
    height: 72px;
    display: flex;
    align-items: center;

    .avatar {
      width: 72px;
      height: 72px;
      overflow: hidden;
      margin-right: 10px;
      border-radius: 50%;
    }

    .info {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .id {
          display: flex;
          align-items: center;
          font-size: 12px;
          font-weight: 400;
          color: #686a7a;
          margin-bottom: 5px;

          .copy {
            width: 33px;
            height: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 7px;
            border-radius: 7px;
            color: #9395a4;
            font-size: 10px;
            border: 1px solid #9395a4;
          }
        }

        .status {
          display: flex;
          align-items: center;

          .icon {
            width: 42px;
            height: 15px;
            margin-right: 5px;
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: 400;
        color: #9395a4;

        .icon {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .func {
    height: 75px;
    display: flex;
    margin-top: 25px;
    border-radius: 10px;
    align-items: center;
    background-color: #ffffff;
    justify-content: space-between;

    .item {
      width: 25%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      .num {
        font-size: 16px;
        font-weight: 500;
        color: #000000;
      }

      .text {
        margin-top: 5px;
        font-size: 12px;
        font-weight: 400;
        color: #9395a4;
      }
    }
  }

  .ad {
    display: flex;
    margin-top: 15px;
    align-items: center;
    justify-content: center;

    .icon {
      width: 100%;
      height: 75px;
    }
  }

  .menu,
  .menu2 {
    height: 178px;
    margin-top: 15px;
    border-radius: 10px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    box-sizing: border-box;

    .item {
      width: 100%;
      height: 25px;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon {
        width: 22px;
        height: 22px;
        margin-right: 10px;
      }

      .entry {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .icon2 {
          width: 22px;
          height: 22px;
        }
      }
    }
  }

  .menu2 {
    height: 136px;
  }
}
</style>
