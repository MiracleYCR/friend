<template>
  <view class="profile_container">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">
        {{ isOwn ? '我的主页' : 'Ta的主页' }}
      </view>
      <block v-if="isOwn">
        <view class="edit" @click="handleGotoBaseInfo">
          <wd-img class="w-18px h-18px mr-1px" src="/static/images/edit.png" />
          编辑资料
        </view>
      </block>
      <block v-else>
        <wd-img class="more" src="/static/images/more.png" />
      </block>
    </view>

    <view class="body">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <wd-img class="avatar" src="/static/images/image.png"></wd-img>

        <view class="name">石榴籽儿</view>

        <view class="info">
          <view class="tags">
            <wd-img class="icon1" src="/static/images/vip.png"></wd-img>
            <wd-img class="icon2" src="/static/images/checked.png"></wd-img>
            <view class="base">
              <wd-img class="icon" src="/static/images/female2.png"></wd-img>
              26岁
            </view>
          </view>
          <view class="sys">
            <view class="ip">IP属地：广东</view>
            <view class="id">梦缘ID：100000001</view>
          </view>

          <block v-if="!isOwn">
            <wd-button class="btnColor w-102px h-32px mt-10px">关注</wd-button>
            <!-- <wd-button class="btnColor2 w-102px h-32px mt-10px">取消关注</wd-button> -->
          </block>

          <view class="desc mt-10px">你好，我叫石榴籽儿，广东广州人，生活简单，我们具体聊</view>
        </view>

        <view class="show">
          <view class="tags">
            <view class="tag">深圳</view>
            <view class="tag">电影</view>
            <view class="tag">家乡广东</view>
            <view class="tag">月收入2万以上</view>
            <view class="tag">想要甜甜的恋爱</view>
            <view class="tag">家乡广东</view>
            <view class="tag">想要甜甜的恋爱</view>
            <view class="tag">电影</view>
            <view class="tag">深圳</view>
            <view class="tag">月收入2万以上</view>
          </view>
          <view class="pictures">
            <wd-img class="w-64px h-64px mr-10px" src="/static/images/picture.png"></wd-img>
            <wd-img class="w-64px h-64px mr-10px" src="/static/images/picture.png"></wd-img>
            <wd-img class="w-64px h-64px mr-10px" src="/static/images/picture.png"></wd-img>
            <wd-img class="w-64px h-64px mr-10px" src="/static/images/picture.png"></wd-img>
            <wd-img class="w-64px h-64px" src="/static/images/picture.png"></wd-img>
            <view class="mask">
              <view class="num">+8</view>
            </view>
          </view>
        </view>

        <view class="status">
          <view class="title">状态</view>
          <block class="card" v-for="n in 10" :key="n">
            <StatusCard />
          </block>

          <!-- <view class="empty">
            <wd-img class="w-200px h-200px" src="/static/images/empty.png"></wd-img>
            Ta还未发表过动态
          </view> -->
        </view>
      </z-paging>
    </view>

    <view v-if="!isOwn" class="btn">
      <wd-button class="btnColor w-80%" size="large">Hi~ 打招呼</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import StatusCard from '@/components/card/status.vue'

const isOwn = ref(true)

const handleBack = () => {
  uni.navigateBack()
}

const handleGotoBaseInfo = () => {
  uni.navigateTo({ url: '/pages/baseInfo/index' })
}

onLoad((params) => {
  isOwn.value = params.type === 'own'
})
</script>

<style lang="scss" scoped>
.profile_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  // background-color: #f3f5f6;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: env(safe-area-inset-top) 15px 0 15px;
  background-image: url('../../static/images/background.png');

  .btnColor {
    font-size: 15px;
    font-weight: 400;
    background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%) !important;
  }

  .btnColor2 {
    font-size: 15px;
    font-weight: 400;
    color: #9395a4;
    background-color: #f2f4f8;
  }

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

    .more {
      position: absolute;
      right: 0;
      width: 4px;
      height: 16px;
    }

    .edit {
      width: 79px;
      height: 25px;
      position: absolute;
      right: 0;
      background-color: #ffffff;
      border-radius: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 400;
      padding: 0 4px;
      box-sizing: border-box;
    }
  }

  .btn {
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 400;
    color: #686a7a;
  }

  .body {
    flex: 1;
    width: 100%;
    margin-top: 10px;
    padding-bottom: 10px;
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
    }

    .avatar {
      width: 100px;
      height: 100px;
    }

    .name {
      font-size: 18px;
      font-weight: 500;
      margin-top: 10px;
    }

    .info {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      .tags {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .icon1 {
          width: 45px;
          height: 15px;
        }

        .icon2 {
          width: 45px;
          height: 15px;
          margin: 0 5px;
        }

        .base {
          width: 45px;
          height: 15px;
          display: flex;
          font-size: 10px;
          align-items: center;
          justify-content: center;
          background-color: #ff75ca;
          color: #ffffff;
          border-radius: 10px;
          .icon {
            width: 10px;
            height: 10px;
            margin-right: 2px;
          }
        }
      }

      .sys {
        margin-top: 10px;
        font-size: 12px;
        font-weight: 400;
        color: #686a7a;
        display: flex;
        align-items: center;
        justify-content: center;

        .ip {
          margin-right: 15px;
        }
      }
    }

    .show {
      width: 100%;

      .tags {
        gap: 10px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 15px 0;

        .tag {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 8px;
          border-radius: 15px;
          box-sizing: border-box;
          background-color: #f2f4f8;

          font-size: 12px;
          color: #9395a4;
          font-weight: 400;
          line-height: 20px;
        }
      }

      .pictures {
        display: flex;
        overflow: hidden;
        align-items: center;
        position: relative;

        .mask {
          position: absolute;
          right: 0;
          width: 96px;
          height: 64px;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          background-size: 100% 100%;
          background-image: url('../../static/images/mask.png');
          .num {
            font-size: 12px;
            font-weight: 400;
            color: #9395a4;
            margin-right: 15px;
          }
        }
      }
    }

    .desc {
      width: 250px;
      font-size: 15px;
      font-weight: 400;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
    }

    .divider {
      width: 100%;
      height: 1px;
      background-color: #f1f4fc;
    }

    .status {
      width: 100%;
      display: flex;
      margin-top: 15px;
      flex-direction: column;

      .title {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
}
</style>
