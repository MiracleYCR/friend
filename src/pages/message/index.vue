<template>
  <view class="message_container" :style="{ padding: pagePadding }">
    <view class="header">消息</view>

    <view class="body">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <view class="tip">
          <view class="message_icon">
            <wd-img class="w-21px h-16px" src="/static/images/message3.png" />
          </view>
          <view class="content">
            <view class="text">
              <view class="title">打开推送，及时接受消息</view>
              <view class="desc">交友成功率提高10倍</view>
            </view>
            <wd-icon name="close" size="12px" color="#9395A4"></wd-icon>
          </view>
        </view>

        <view class="tip">
          <wd-img class="w-40px h-40px mr-10px" src="/static/images/bell.png" />
          <view class="content" @click="handleCheckMessageNotice">
            <view class="text">消息通知</view>
            <wd-badge custom-class="badge" modelValue="12" bg-color="#fd5b59" />
          </view>
        </view>

        <block v-for="n in 20" :key="n">
          <view class="messageItem" @click="handleCheckMessage">
            <view class="left">
              <wd-img class="avatar" src="/static/images/image.png" />
              <view class="info">
                <view class="user">
                  <view class="name">石榴籽儿</view>
                  <wd-img class="icon" src="/static/images/vip.png"></wd-img>
                  <wd-img class="icon" src="/static/images/checked.png"></wd-img>
                </view>
                <view class="content">你好呀，可以认识一下吗？</view>
              </view>
            </view>
            <view class="right">
              <view class="time">20:20</view>
              <wd-badge custom-class="badge" modelValue="123" bg-color="#fd5b59" />
            </view>
          </view>
        </block>
      </z-paging>
    </view>

    <wd-overlay :show="dialogVisible" @click="dialogVisible = false">
      <view class="dialog_wrapper">
        <view class="block">
          <wd-img class="w-48px h-48px mt-20px" src="/static/images/bell.png" />
          <view class="text">开通会员VIP才可以互相聊天哦~</view>
          <view class="btns">
            <wd-button class="cancel">暂不开通</wd-button>
            <wd-button class="confirm">立即开通</wd-button>
          </view>
        </view>
      </view>
    </wd-overlay>

    <AppTabbar />
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { setPagePadding } from '@/hooks/useSafeInset'

import AppTabbar from '@/components/tabbar/index.vue'

const { pagePadding } = setPagePadding(0, 15, 80, 15)

const handleCheckMessageNotice = () => {
  uni.navigateTo({
    url: '/pages/notice/index',
  })
}

const dialogVisible = ref<boolean>(false)
const handleCheckMessage = () => {
  dialogVisible.value = true
}

onMounted(() => {
  // 隐藏默认tabbar
  uni.hideTabBar({ animation: false })
})
</script>

<style lang="scss" scoped>
.message_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #f3f5f6;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../static/images/background.png');

  .header {
    height: 40px;
    text-align: left;
  }

  .badge {
    :deep(.wd-badge__content.is-fixed) {
      position: relative;
      transform: none;
    }
  }

  .body {
    flex: 1;
    padding-bottom: 10px;
    box-sizing: border-box;

    .list_scroll {
      :deep(.zp-paging-container-content) {
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      .tip {
        width: 100%;
        height: 56px;
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        background-color: #ffffff;
        justify-content: space-between;

        .message_icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          background-color: #9395a4;
          margin-right: 10px;
        }

        .content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .title {
            color: #191c32;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
          }
          .desc {
            font-size: 12px;
            line-height: 20px;
            font-weight: 400;
            color: #686a7a;
          }
        }
      }

      .messageItem {
        width: 100%;
        height: 60px;
        display: flex;
        margin-top: 15px;
        align-items: center;
        justify-content: space-between;

        .left {
          display: flex;
          align-items: center;

          .avatar {
            width: 56px;
            height: 56px;
            margin-right: 10px;
          }

          .info {
            height: 56px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            .user {
              display: flex;
              line-height: 20px;
              align-items: center;

              .name {
                font-size: 30rpx;
                font-weight: 500;
              }

              .icon {
                width: 44px;
                height: 14px;
                margin-left: 5px;
              }
            }

            .content {
              font-size: 12px;
              font-weight: 400;
              line-height: 20px;
              color: #9395a4;
            }
          }
        }

        .right {
          height: 56px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .time {
            font-size: 10px;
            color: #9395a4;
            font-weight: 400;
            line-height: 20px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }

  .dialog_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .block {
      width: 278px;
      height: 209px;
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
        align-items: center;
        text-align: center;
        justify-content: center;
        padding: 10px 10px;
        box-sizing: border-box;
      }

      .btns {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .cancel {
          width: 100px;
          height: 40px;
          background-color: #9395a4;
        }

        .confirm {
          width: 100px;
          height: 40px;
          background-color: #fd2b58;
        }
      }
    }
  }
}
</style>
