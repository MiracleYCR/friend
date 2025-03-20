<template>
  <view class="wallet_container" :style="{ padding: pagePadding }">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">我的钱包</view>
    </view>

    <view class="money">
      <view class="left">
        <view class="title">余额（元）</view>
        <view class="amt">0.00</view>
      </view>
      <view class="right">
        <wd-button class="btnColor" size="small">提现</wd-button>
      </view>
    </view>

    <view class="body">
      <view class="title">钱包变动明细</view>

      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <block v-if="true">
          <view class="empty">
            <wd-img class="w-200px h-200px" src="/static/images/empty.png"></wd-img>
            暂无明细
          </view>
        </block>

        <block v-else>
          <view class="detailItem">
            <view class="detailItem_left">
              <view class="detailItem_title">提现</view>
              <view class="time">2022年07月19日14:59:33</view>
            </view>
            <view class="detailItem_right red">-￥3000</view>
          </view>
          <view class="detailItem">
            <view class="detailItem_left">
              <view class="detailItem_title">邀请奖励</view>
              <view class="time">2022年07月19日14:59:33</view>
            </view>
            <view class="detailItem_right green">+￥10</view>
          </view>
          <view class="detailItem">
            <view class="detailItem_left">
              <view class="detailItem_title">邀请奖励</view>
              <view class="time">2022年07月19日14:59:33</view>
            </view>
            <view class="detailItem_right green">+￥10</view>
          </view>
          <view class="detailItem">
            <view class="detailItem_left">
              <view class="detailItem_title">提现</view>
              <view class="time">2022年07月19日14:59:33</view>
            </view>
            <view class="detailItem_right red">-￥3000</view>
          </view>
          <view class="detailItem">
            <view class="detailItem_left">
              <view class="detailItem_title">邀请奖励</view>
              <view class="time">2022年07月19日14:59:33</view>
            </view>
            <view class="detailItem_right green">+￥10</view>
          </view>
        </block>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { setPagePadding } from '@/hooks/useSafeInset'

const { pagePadding } = setPagePadding(0, 15, 0, 15)

const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.wallet_container {
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

  .money {
    height: 150px;
    margin-top: 30px;
    border-radius: 10px;
    border: 1px solid #ffffff;
    display: flex;
    padding: 20px 15px;
    box-sizing: border-box;
    justify-content: space-between;
    background: rgba(255, 255, 255, 50%);

    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        font-size: 14px;
        font-weight: 500;
      }
      .amt {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 36px;
        font-weight: 1000;
      }
    }

    .right {
      display: flex;
      align-items: center;
      .btnColor {
        width: 75px;
        height: 30px;
        line-height: 30px;
        background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
      }
    }
  }

  .body {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px;
    margin: 15px 0;
    border-radius: 10px;
    flex-direction: column;
    box-sizing: border-box;
    border: 1px solid #ffffff;
    background: rgba(255, 255, 255, 50%);

    .title {
      width: 100%;
      font-size: 16px;
      font-weight: 500;
      text-align: left;
      margin-bottom: 20px;
    }

    .list_scroll {
      :deep(.zp-paging-container-content) {
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #686a7a;
      }

      .detailItem {
        width: 100%;
        height: 45px;
        display: flex;
        margin-bottom: 15px;
        align-items: center;
        justify-content: space-between;

        .detailItem_left {
          .detailItem_title {
            font-size: 15px;
            line-height: 20px;
            font-weight: 500;
          }
          .time {
            font-size: 12px;
            line-height: 18px;
            font-weight: 400;
            color: #686a7a;
          }
        }

        .detailItem_right {
          &.red {
            color: #ff4d73;
          }

          &.green {
            color: #5fc88f;
          }
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
