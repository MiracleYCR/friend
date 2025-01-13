<template>
  <view class="vip_container">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">开通会员</view>
    </view>

    <view class="info">
      <view class="top">
        <view class="base">
          <wd-img class="w-56px h-56px" src="/static/images/image.png" />
          <view class="content">
            <view class="name">石榴籽儿</view>
            <view class="status">未开通会员</view>
          </view>
        </view>
        <wd-img class="diamond w-100px h-100px" src="/static/images/diamond.png" />
      </view>
      <view class="bottom">
        <view class="left">
          <view class="line1">查看/回复全部消息</view>
          <view class="line2">本产品为自动订阅服务，您可随时取消</view>
        </view>
        <wd-button class="colorBtn" size="small">开通</wd-button>
      </view>
    </view>

    <view class="list_scroll">
      <view class="selectItem">
        <wd-img class="selectTag w-52px h-20px" src="/static/images/viptag.png" />
        <view class="selectItem_header">会员月卡</view>
        <view class="selectItem_body">
          <view class="content">
            <view class="amt">¥98</view>
            <view class="type">/月</view>
          </view>
          <view class="tip">体验必选</view>
        </view>
      </view>

      <view class="selectItem active">
        <view class="selectItem_header">会员季卡</view>
        <view class="selectItem_body">
          <view class="content">
            <view class="amt">¥268</view>
            <view class="type">/季度</view>
          </view>
        </view>
      </view>

      <view class="selectItem">
        <view class="selectItem_header">会员半年卡</view>
        <view class="selectItem_body">
          <view class="content">
            <view class="amt">¥498</view>
            <view class="type">/6个月</view>
          </view>
        </view>
      </view>

      <view class="selectItem">
        <view class="selectItem_header">会员全年卡</view>
        <view class="selectItem_body">
          <view class="content">
            <view class="amt">¥998</view>
            <view class="type">/12个月</view>
          </view>
        </view>
      </view>
    </view>

    <view class="selectInfo">
      <view class="title">含3项特权：</view>
      <view class="selectInfoItem">
        <view class="iconWrapper">
          <wd-img class="w-30px h-30px" src="/static/images/message.png" />
        </view>
        <view class="selectInfoContent">
          <view class="selectInfoContent_title">解锁消息功能</view>
          <view class="selectInfoContent_desc">和Ta聊天不受限制</view>
        </view>
      </view>
      <view class="selectInfoItem">
        <view class="iconWrapper">
          <wd-img class="w-30px h-30px" src="/static/images/message.png" />
        </view>
        <view class="selectInfoContent">
          <view class="selectInfoContent_title">解锁消息功能</view>
          <view class="selectInfoContent_desc">和Ta聊天不受限制</view>
        </view>
      </view>
      <view class="selectInfoItem">
        <view class="iconWrapper">
          <wd-img class="w-30px h-30px" src="/static/images/message.png" />
        </view>
        <view class="selectInfoContent">
          <view class="selectInfoContent_title">解锁消息功能</view>
          <view class="selectInfoContent_desc">和Ta聊天不受限制</view>
        </view>
      </view>
    </view>

    <wd-button class="confirmBtn" block>¥268 立即开通</wd-button>

    <view class="policy">
      <wd-checkbox v-model="isCheck" shape="square"></wd-checkbox>
      <view class="content">请阅读并同意连续签订协议，¥268/月成为月度会员</view>
    </view>

    <view class="bottom">
      <wd-text size="12px" text="联系我们" decoration="underline"></wd-text>
      <view class="divider"></view>
      <wd-text size="12px" text="会员协议" decoration="underline"></wd-text>
      <view class="divider"></view>
      <wd-text size="12px" text="隐私政策" decoration="underline"></wd-text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isCheck = ref(false)

const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.vip_container {
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
  background-size: 100% 256px;
  background-repeat: no-repeat;
  padding: env(safe-area-inset-top) 0 0 0;
  background-image: url('../../static/images/background3.png');

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
      left: 15px;
      width: 16px;
      height: 16px;
    }
  }

  .info {
    height: 150px;
    border-radius: 10px;
    border: 1px solid #ffffff;
    display: flex;
    padding: 15px;
    margin: 125px 15px 15px 15px;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: space-between;
    background: linear-gradient(103.21deg, #ffb2c0 0.9%, #ffe6eb 96.38%);

    .top {
      flex: 1;
      display: flex;
      position: relative;
      align-items: flex-start;
      justify-content: space-between;

      .base {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .content {
          margin-left: 10px;

          .name {
            font-size: 18px;
            font-weight: 500;
            line-height: 20px;
          }

          .status {
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
            color: #686a7a;
          }
        }
      }

      .diamond {
        top: -13px;
        right: -13px;
        position: absolute;
      }
    }

    .bottom {
      height: 40px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        flex: 1;
        display: flex;
        flex-direction: column;

        .line1 {
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          color: #ff3c5e;
        }

        .line2 {
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          color: #ff7a87;
        }
      }

      .colorBtn {
        width: 70px;
        height: 30px;
        color: #000000;
        background: #ffffff;
      }
    }
  }

  .list_scroll {
    height: 140px;
    margin-left: 15px;
    display: flex;
    overflow-x: auto;
    align-items: center;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &:-webkit-scrollbar {
      display: none;
    }

    .selectItem {
      position: relative;
      height: 120px;
      min-width: 120px;
      margin-right: 15px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      color: #ff93b1;
      background: #ffefef;
      box-sizing: border-box;
      padding: 15px 20px;
      border: 1px solid #fee0eb;

      &.active {
        color: #ff4d73;
        border: 2px solid;
      }

      .selectTag {
        position: absolute;
        top: -10px;
        right: -10px;
      }

      .selectItem_header {
        font-size: 14px;
        font-weight: 500;
      }

      .selectItem_body {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;

        .content {
          flex: 1;
          display: flex;
          font-size: 12px;
          font-weight: 500;
          align-items: center;
          flex-direction: column;
          justify-content: center;

          .amt {
            font-size: 20px !important;
            font-weight: 700 !important;
          }

          .type {
            font-size: 12px;
            font-weight: 500;
          }
        }

        .tip {
          font-size: 12px;
          font-weight: 500;
        }
      }
    }
  }

  .selectInfo {
    padding: 0 15px;
    margin: 15px 0 0 0;
    box-sizing: border-box;
    .title {
      font-size: 15px;
      color: #686a7a;
      font-weight: 400;
      margin-bottom: 15px;
    }

    .selectInfoItem {
      height: 50px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;

      .iconWrapper {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        background-color: #ffefef;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .selectInfoContent {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;

        .selectInfoContent_title {
          font-size: 14px;
          font-weight: 500;
          color: #000000;
        }

        .selectInfoContent_desc {
          font-size: 14px;
          font-weight: 400;
          color: #686a7a;
        }
      }
    }
  }

  .confirmBtn {
    height: 44px;
    margin: 15px 15px 0 15px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
  }

  .policy {
    display: flex;
    font-size: 12px;
    font-weight: 400;
    color: #686a7a;
    align-items: center;
    justify-content: center;
    margin: 15px 15px 0 15px;
  }

  .bottom {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    .divider {
      width: 1px;
      height: 12px;
      margin: 0 5px;
      background-color: #9395a4;
    }
  }
}
</style>
