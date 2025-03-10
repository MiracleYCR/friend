<template>
  <view class="comment_container root">
    <view class="comment_body">
      <view class="left">
        <wd-img
          class="w-[50px] h-[50px] rounded-[50%] overflow-hidden"
          :src="commentData.sysUser.avatar"
        ></wd-img>
      </view>

      <view class="right">
        <view class="name">{{ commentData.sysUser.nickName }}</view>
        <view class="commentContent" @longpress="handleOperateComment">
          {{ commentData.commentContent }}
        </view>
        <view class="status">
          <view class="time">
            {{ commentData.createTime }} · {{ commentData.sysUser.locationCity }}
          </view>

          <view v-if="commentData.level < 1" @click="handleReplayTargetComment">
            {{ isReply && replyId === commentData.parentId ? '取消回复' : '回复' }}
          </view>
        </view>

        <block v-if="commentData.children && commentData.children.length > 0">
          <CommentComp
            class="leaf"
            v-for="(comment, index) in commentData.children"
            :key="index"
            :commentData="comment"
          />
        </block>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import CommentComp from './index.vue'

const props = defineProps({
  commentData: {
    type: Object,
    required: true,
  },

  isReply: {
    type: Boolean,
  },

  replyId: {
    type: Number,
  },
})

const emits = defineEmits(['on-operate-comment', 'on-reply-target-comment'])

// 长按
const handleOperateComment = () => {
  emits('on-operate-comment')
}

// 回复
const handleReplayTargetComment = () => {
  emits('on-reply-target-comment')
}
</script>

<style lang="scss" scoped>
.comment_container {
  &.root {
    margin-bottom: 20px;
  }

  .leaf {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .comment_body {
    width: 100%;
    display: flex;
    .left {
      display: flex;
      align-items: flex-start;
      margin-right: 5px;
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .name {
        font-weight: 500;
        font-size: 13px;
        color: #686a7a;
        margin-bottom: 5px;
      }
      .commentContent {
        font-weight: 400;
        font-size: 14px;
        color: #212121;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 5px;
        word-break: break-all;
      }
      .status {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 400;
        font-size: 12px;
        color: #ff4d73;

        .time {
          color: #9395a4;
        }
      }
    }
  }
}
</style>
