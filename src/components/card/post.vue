<template>
  <view class="statuscard">
    <wd-img class="w-56px h-56px mr-8px rounded-[50%] overflow-hidden" :src="userData.avatar" />

    <view class="body">
      <view class="top">
        <view class="info">
          <view class="left">
            <view class="line">
              <view class="name">{{ userData.nickName }}</view>
              <wd-img
                v-if="userData.vipOpean === '1'"
                class="w-40px h-15px ml-5px mr-5px"
                src="/static/images/vip.png"
              ></wd-img>
              <wd-img
                v-if="userData.hasRealName === '1'"
                class="w-40px h-15px"
                src="/static/images/checked.png"
              ></wd-img>
            </view>
            <view class="line2">{{ postData.createTime }}</view>
          </view>
          <view class="right">
            <view class="focus">关注</view>
            <wd-img
              v-if="canShare"
              class="w-4px h-18px ml-10px"
              src="/static/images/more2.png"
            ></wd-img>
          </view>
        </view>
      </view>

      <view class="middle mt-5px">
        <view class="title">{{ postData.postText }}</view>
        <view class="content">
          <block v-if="postData.postImages && postData.postImages.length > 0">
            <wd-img
              v-for="(image, index) in postData.postImages"
              :key="index"
              class="w-90px h-90px rounded-5px mr-5px mb-5px overflow-hidden"
              :src="image"
            ></wd-img>
          </block>

          <block v-if="postData.postVideos && postData.postVideos.length > 0">
            <DomVideoPlayer
              controls
              objectFit="cover"
              style="width: 100%; height: 220px"
              :src="postData.postVideos[0]"
            />
          </block>
        </view>
        <view class="location" v-if="postData.location">
          <wd-img class="w-22px h-22px" src="/static/images/location.png"></wd-img>
          {{ postData.location }}
        </view>
      </view>
      <view class="bottom">
        <view class="item" @click="handleGotoPostDetail">
          <wd-img class="w-19px h-19px mr-5px" src="/static/images/message2.png"></wd-img>
          {{ postData.commentCount }}
        </view>
        <view class="item">
          <wd-img
            class="w-19px h-19px mr-5px"
            :src="postData.hasLike ? '/static/images/heart3.png' : '/static/images/heart2.png'"
            @click="handleLikePost"
          ></wd-img>
          {{ postData.likeCount }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import DomVideoPlayer from 'uniapp-video-player'

import { likePost } from '@/api/post'

const props = defineProps({
  canShare: {
    type: Boolean,
    default: true,
  },

  canNavigate: {
    type: Boolean,
    default: true,
  },

  userData: {
    type: Object,
    default: () => ({}),
  },

  postData: {
    type: Object,
    required: true,
  },
})

const handleLikePost = () => {
  likePost({ postId: props.postData.id })
}

const handleGotoPostDetail = () => {
  props.canNavigate &&
    uni.navigateTo({
      url: `/pages/postDetail/index?id=${props.postData.id}`,
    })
}
</script>

<style lang="scss" scoped>
.statuscard {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 15px;
  position: relative;
  box-sizing: border-box;

  .body {
    flex: 1;

    .top {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .info {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          flex: 1;
          height: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .line {
            display: flex;
            align-items: center;
          }

          .line2 {
            font-size: 12px;
            font-weight: 400;
            color: #9395a4;
          }
        }

        .right {
          width: 70px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .focus {
            width: 50px;
            height: 22px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-weight: 500;
            color: #ff4d73;
            border: 1px solid #ff4d73;
          }
        }
      }
    }

    .middle {
      display: flex;
      // align-items: center;
      flex-direction: column;

      .title {
        width: 100%;
        font-size: 14px;
        font-weight: 400;
      }

      .content {
        // gap: 5px;
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      .location {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        font-size: 12px;
        color: #9395a4;
        font-weight: 400;
      }
    }

    .bottom {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .item {
        font-size: 12px;
        font-weight: 400;
        color: #9395a4;
        display: flex;
        margin-right: 15px;
        align-items: center;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
