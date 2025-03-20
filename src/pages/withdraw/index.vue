<template>
  <view class="withdraw_container" :style="{ padding: pagePadding }">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">提现</view>
    </view>

    <view class="money">
      <view class="title">提现金额</view>
      <wd-input v-model="amt" use-prefix-slot placeholder="请输入提现金额">
        <template #prefix>
          <view class="icon">￥</view>
        </template>
      </wd-input>
      <view class="desc">提现金额:¥50,000(即到账金额，当日最高可提现¥10,000)</view>
    </view>

    <view class="body">
      <view class="title">提现方式</view>

      <view class="detailItem">
        <view class="detailItem_left">
          <wd-img class="w-32px h-32px" src="/static/images/wechat.png" />
          <view class="payment">微信</view>
        </view>
        <view
          :class="['checkbox', payment.wechat ? 'active' : 'noactive']"
          @click="handleChangePayment('wechat')"
        >
          <wd-img v-show="payment.wechat" class="w-18px h-18px" src="/static/images/check.png" />
        </view>
      </view>

      <view class="detailItem">
        <view class="detailItem_left">
          <wd-img class="w-32px h-32px" src="/static/images/alipay.png" />
          <view class="payment">支付宝</view>
        </view>
        <view
          :class="['checkbox', payment.alipay ? 'active' : 'noactive']"
          @click="handleChangePayment('alipay')"
        >
          <wd-img v-show="payment.alipay" class="w-18px h-18px" src="/static/images/check.png" />
        </view>
      </view>
    </view>

    <view class="tip">
      <view class="tip_title">温馨提示：</view>
      <view class="tip_desc">您发起的提现申请会在2-3个工作日审核完成，请耐心等待。</view>
    </view>

    <wd-button class="confirmBtn" block>立即提现</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { setPagePadding } from '@/hooks/useSafeInset'

const { pagePadding } = setPagePadding(0, 15, 0, 15)

const amt = ref('')

const payment = reactive({
  wechat: false,
  alipay: false,
})

const handleBack = () => {
  uni.navigateBack()
}

const handleChangePayment = (type: string) => {
  Object.keys(payment).forEach((k) => {
    payment[k] = k === type
  })
}
</script>

<style lang="scss" scoped>
.withdraw_container {
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
    flex-direction: column;
    padding: 20px 15px;
    box-sizing: border-box;
    justify-content: space-between;
    background: rgba(255, 255, 255, 50%);

    .title {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .icon {
      font-size: 28px;
      font-weight: 500;
    }

    :deep(.wd-input) {
      background: none;
    }

    .desc {
      font-size: 12px;
      font-weight: 400;
      color: #686a7a;
      margin-top: 10px;
      line-height: 20px;
    }
  }

  .body {
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

    .detailItem {
      width: 100%;
      height: 45px;
      display: flex;
      margin-bottom: 15px;
      align-items: center;
      justify-content: space-between;

      .detailItem_left {
        display: flex;
        align-items: center;

        .payment {
          font-size: 15px;
          font-weight: 400;
          margin-left: 10px;
        }
      }

      .checkbox {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &.active {
          background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
        }

        &.noactive {
          background: rgba(147, 149, 164, 0.2);
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .tip {
    .tip_title {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: #191c32;
    }
    .tip_desc {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: #686a7a;
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
</style>
