<template>
  <view class="statuscard">
    <wd-img
      v-if="userData.avatar"
      class="w-56px h-56px mr-8px rounded-[50%] overflow-hidden"
      :src="userData.avatar"
    />
    <view
      v-else
      class="w-56px h-56px mr-8px rounded-[50%] overflow-hidden bg-gray-200 flex items-center justify-center text-[10px] text-gray-400"
    >
      暂无头像
    </view>

    <view class="body">
      <view class="top">
        <view class="info">
          <view class="left" @click="handleGotoProfile">
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
            <view
              v-if="userStore.userInfo.userId !== userData.userId"
              :class="[userData.hasFollow ? 'unFocus' : 'focus']"
              @click="handleChangeFollow"
            >
              {{ userData.hasFollow ? '取消关注' : '关注' }}
            </view>
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
              @click="handlePreviewImage(postData.postImages, index)"
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
import { useUserStore } from '@/store'
import { defineProps, defineEmits } from 'vue'
import DomVideoPlayer from 'uniapp-video-player'

import { likePost } from '@/api/post'
import { confirmFollow, cancelFollow } from '@/api/user'

const userStore: any = useUserStore()

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

const emits = defineEmits(['refreshData'])

const handleLikePost = () => {
  likePost({ postId: props.postData.id })
}

// 用户详情页面
const handleGotoProfile = () => {
  if (userStore.userInfo.userId === props.userData.userId) {
    uni.navigateTo({
      url: `/pages/profile/index?type=own`,
    })
  } else {
    uni.navigateTo({
      url: `/pages/profile/index?type=other&id=${props.userData.userId}`,
    })
  }
}

// 切换关注状态
const handleChangeFollow = async () => {
  if (props.userData.hasFollow) {
    await cancelFollow(props.userData.userId)
  } else {
    await confirmFollow(props.userData.userId)
  }
  emits('refreshData')
}

// 预览图片
const handlePreviewImage = (imageList: any[], currentIndex: number) => {
  uni.previewImage({
    current: currentIndex,
    urls: imageList,
  })
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
            width: 60px;
            height: 22px;
            padding: 0 5px;
            box-sizing: border-box;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #ffffff;
            background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%) !important;
          }

          .unFocus {
            width: 60px;
            height: 22px;
            border-radius: 12px;
            padding: 0 5px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 400;
            color: #9395a4;
            background-color: #f2f4f8;
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
