<template>
  <view class="postDetail_container">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">动态详情</view>
      <wd-img class="more" src="/static/images/more.png" />
    </view>

    <view class="body">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <view class="detail">
          <StatusCard />
        </view>

        <view class="tip">
          <view>长按评论可以举报/删除哦</view>
          <wd-icon name="close" size="12px"></wd-icon>
        </view>

        <view class="comment">
          <view class="title">全部评论（10）</view>
          <view class="list">
            <wd-collapse
              viewmore
              v-model="value"
              :line-num="3"
              use-more-slot
              custom-more-slot-class="more-slot"
            >
              <view class="first">
                <wd-img class="w-10 h-10" src="/static/images/image.png"></wd-img>
              </view>
              <view class="second">
                <wd-img class="w-10 h-10" src="/static/images/image.png"></wd-img>
              </view>
              <template #more>
                <view class="expand">展开</view>
              </template>
            </wd-collapse>
          </view>
        </view>
      </z-paging>
    </view>
    <view class="bottom">
      <wd-input v-model="message" prefix-icon="dong" />
      <wd-button size="small">发 送</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import StatusCard from '@/components/card/status.vue'

const message = ref('')

const value = ref<boolean>(false)

const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.postDetail_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  padding: env(safe-area-inset-top) 0 0 0;

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

    .more {
      position: absolute;
      right: 15px;
      width: 4px;
      height: 16px;
    }
  }

  .bottom {
    height: 50px;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;

    .list_scroll {
      :deep(.zp-paging-container-content) {
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      .detail {
        padding: 0 15px;
        box-sizing: border-box;
      }

      .tip {
        width: 100%;
        height: 40px;
        display: flex;
        font-size: 13px;
        margin-top: 15px;
        font-weight: 400;
        color: #686a7a;
        padding: 0 15px;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        background-color: rgba(147, 149, 164, 0.1);
      }

      .comment {
        width: 100%;
        margin-top: 15px;
        padding: 0 15px;
        box-sizing: border-box;

        .title {
          font-size: 17px;
          font-weight: 700;
          display: flex;
          justify-content: flex-start;
        }

        .list {
          display: flex;
          flex-direction: column;

          :deep(.wd-collapse__more) {
            width: 100%;
            display: flex;
            justify-content: flex-end;
          }

          .first {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }

          .second {
            margin-left: 40px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }

  .bottom {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;

    :deep(.wd-input) {
      flex: 1;
      padding: 0 5px;
      border-radius: 17px;
      margin-right: 10px;
      box-sizing: border-box;
      border: 1px solid #dadada;
      &::after {
        display: none;
      }
    }
  }
}
</style>
