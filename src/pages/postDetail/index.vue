<template>
  <view class="postDetail_container" :style="{ padding: pagePadding }">
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
          <PostCard
            :canShare="false"
            :canNavigate="false"
            :postData="postData"
            :userData="userData"
            @refreshData="queryPostDetailData"
          />
        </view>

        <view class="tip" v-show="showTips">
          <view>长按评论可以举报/删除哦</view>
          <wd-icon name="close" size="12px" @click="handleCloseTips"></wd-icon>
        </view>

        <view v-if="postData.postComments && postData.postComments.length > 0" class="comment">
          <view class="title">全部评论（{{ postData.postComments.length }}）</view>
          <view class="list">
            <CommentComp
              v-for="(comment, index) in postData.postComments"
              :key="index"
              :isReply="isReply"
              :replyId="replyId"
              :commentData="comment"
              @on-operate-comment="handleOperateComment"
              @on-reply-target-comment="handleReplayTargetComment(comment)"
            />
          </view>
        </view>

        <view v-else class="noComment">暂时没有评论，快来给他/她评论吧~</view>
      </z-paging>
    </view>
    <view class="bottom">
      <wd-input
        v-model="commentContent"
        prefix-icon="edit"
        :focus="replayFocus"
        :placeholder="replyId ? `回复：${replyUserName}` : '主动评论，才能相识~'"
      />
      <wd-button
        style="width: 60px; background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%)"
        size="small"
        @click="handleSubmitComment"
      >
        发送
      </wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { checkPost, commendPost } from '@/api/post'
import { useUserStore, useCommonStore } from '@/store'
import { setPagePadding } from '@/hooks/useSafeInset'

import PostCard from '@/components/card/post.vue'
import CommentComp from '@/components/comment/index.vue'

const { pagePadding } = setPagePadding()

const userStore: any = useUserStore()

// 帖子详情
const postId = ref(0)
const postData = ref<any>({})
const userData = ref<any>({})

// 是否展示tip
const showTips = ref(true)
const handleCloseTips = () => {
  showTips.value = false
}

// 评论内容
const commentContent = ref<string>('')

// 返回上一级
const handleBack = () => {
  uni.navigateBack()
}

// 回复评论
const replyId = ref(0)
const isReply = ref(false)
const replyUserName = ref('')
const replayFocus = ref(false)
const handleReplayTargetComment = async (commentData: any) => {
  if (isReply.value) {
    resetCommentStatus()
  } else {
    isReply.value = true
    replyId.value = commentData.parentId
    replyUserName.value = commentData.sysUser.nickName
    replayFocus.value = true
  }
}
const resetCommentStatus = () => {
  replyId.value = 0
  isReply.value = false
  replyUserName.value = ''
  commentContent.value = ''
  replayFocus.value = false
}

// 提交评论
const handleSubmitComment = async () => {
  await commendPost(
    replyId.value
      ? {
          parentId: replyId.value,
          postId: postData.value.id,
          commentContent: commentContent.value,
        }
      : {
          postId: postData.value.id,
          commentContent: commentContent.value,
        },
  )

  await queryPostDetailData()

  resetCommentStatus()
  uni.showToast({ title: '评论成功！', icon: 'none' })
}

// 处理评论
const handleOperateComment = () => {
  uni.showToast({
    title: '长按事件触发',
    icon: 'none',
  })
}

const queryPostDetailData = async () => {
  const { data }: any = await checkPost(postId.value)

  // 帖子数据
  postData.value = data
  // 用户数据
  userData.value = data.sysUser
}

onLoad((params) => {
  // 帖子id
  postId.value = params.id

  queryPostDetailData()
})
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
        width: 100%;
        padding: 0 15px;
        margin-bottom: 15px;
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
        padding: 0 15px;
        margin-top: 15px;
        box-sizing: border-box;

        .title {
          font-size: 17px;
          margin-bottom: 15px;
          font-weight: 700;
          display: flex;
          justify-content: flex-start;
        }

        .list {
          display: flex;
          flex-direction: column;

          .listItem {
            margin-bottom: 20px;
            .firstLevel {
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

                  .cancelReply {
                    color: #ff4d73;
                  }

                  .reply {
                    color: #9395a4;
                  }
                }
              }
            }
          }
        }
      }

      .noComment {
        width: 100%;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 400;
        color: rgba(147, 149, 164, 1);
      }
    }
  }

  .bottom {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
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
