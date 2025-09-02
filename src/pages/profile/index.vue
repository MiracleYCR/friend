<template>
  <view class="profile_container" :style="{ padding: pagePadding }">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">
        {{ pageParams.isOwn ? '我的主页' : 'Ta的主页' }}
      </view>
      <block v-if="pageParams.isOwn">
        <view class="edit" @click="handleGotoBaseInfo">
          <wd-icon class="mr-2px" name="edit" size="13px" color="#ffffff"></wd-icon>
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
        ref="profileRef"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
        :refresher-only="true"
        @onRefresh="queryUserInfoData"
      >
        <wd-img v-if="userData.avatar" class="avatar" :src="userData.avatar" />
        <view
          v-else
          class="avatar bg-gray-200 flex items-center justify-center text-[10px] text-gray-400"
        >
          暂无头像
        </view>

        <view class="name">{{ userData.nickName }}</view>

        <view class="info">
          <view class="tags">
            <wd-img
              v-if="userData.vipOpean === '1'"
              class="icon1"
              src="/static/images/vip.png"
            ></wd-img>
            <wd-img
              v-if="userData.hasRealName === '1'"
              class="icon2"
              src="/static/images/checked.png"
            ></wd-img>
            <view :class="['base', userData.sex === '1' ? 'male' : 'female']">
              <wd-img
                class="icon"
                :src="
                  userData.sex === '1' ? '/static/images/male2.png' : '/static/images/female2.png'
                "
              ></wd-img>
              {{ userData.age }}岁
            </view>
          </view>
          <view class="sys">
            <view class="ip">
              IP属地：{{ userData.locationProvince }}{{ userData.locationCity }}
            </view>
            <view class="id">梦缘ID：{{ userData.appId }}</view>
          </view>

          <block v-if="!pageParams.isOwn">
            <wd-button
              :class="[
                'w-102px',
                'h-32px',
                'mt-10px',
                userData.hasFollow ? 'btnColor2' : 'btnColor',
              ]"
              @click="handleChangeFollow"
            >
              {{ userData.hasFollow ? '取消关注' : '关注' }}
            </wd-button>
          </block>

          <view class="desc mt-10px">{{ userData.userDesc }}</view>
        </view>

        <view class="show">
          <view class="tags">
            <block v-if="userData.clientUserTags.length > 0">
              <view class="tag" v-for="(tag, index) in userData.clientUserTags" :key="index">
                {{ tagDataMap[tag] }}
              </view>
            </block>
            <view v-else class="noTags">暂无标签...</view>
          </view>
          <view class="pictures">
            <wd-img
              v-for="(pic, index) in userData.clientUserImages.slice(0, 5)"
              class="w-64px h-64px rounded-[5px] overflow-hidden"
              :class="[index === 4 ? '' : 'mr-10px']"
              :key="index"
              :src="pic"
            ></wd-img>
            <view class="mask">
              <view class="num">+{{ userData.clientUserImages.length }}</view>
            </view>
          </view>
        </view>

        <view class="status">
          <view class="title">状态</view>
          <block v-if="userData.posts && userData.posts.length > 0" class="card">
            <PostCard
              v-for="(item, index) in userData.posts"
              :key="index"
              :postData="item"
              :userData="userData"
              @refreshData="fetchOtherUserInfo"
            />
          </block>

          <view v-else class="empty">
            <wd-img class="w-200px h-200px" src="/static/images/empty.png"></wd-img>
            Ta还未发表过动态
          </view>
        </view>
      </z-paging>
    </view>

    <view v-if="!pageParams.isOwn" class="btn">
      <wd-button class="btnColor w-80%" size="large" @click="handleChatWithUser">
        Hi~ 打招呼
      </wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import {
  TUIUserService,
  TUIConversationService,
  TUIStore,
  StoreName,
} from '@tencentcloud/chat-uikit-engine'

import { useUserStore, useCommonStore } from '@/store'
import { setPagePadding } from '@/hooks/useSafeInset'
import { getOtherUserInfo, confirmFollow, cancelFollow } from '@/api/user'

import PostCard from '@/components/card/post.vue'

const { pagePadding } = setPagePadding(0, 15, 0, 15)

const userStore: any = useUserStore()
const commonStore: any = useCommonStore()

// 页面入参
const pageParams = reactive({
  id: 0,
  isOwn: true,
})

const userData = ref<any>({})
const tagDataMap = ref<any>({})
const profileRef = ref<any>(null)

const handleBack = () => {
  uni.navigateBack()
}

const handleGotoBaseInfo = () => {
  uni.navigateTo({ url: `/pages/baseInfo/index?type=edit` })
}

// 切换用户关注
const handleChangeFollow = async () => {
  if (userData.value.hasFollow) {
    await cancelFollow(userData.value.userId)
  } else {
    await confirmFollow(userData.value.userId)
  }
  await fetchOtherUserInfo()
}

// 获取Ta的用户信息
const fetchOtherUserInfo = async () => {
  const resp = await getOtherUserInfo(pageParams.id)
  userData.value = resp.data
}

// 和用户聊天
const handleChatWithUser = () => {
  TUIConversationService.switchConversation(`C2C${userData.value.appId}`).then(() => {
    uni.navigateTo({
      url: `/TUIKit/components/TUIChat/index`,
    })
  })
}

const queryUserInfoData = async () => {
  try {
    if (pageParams.isOwn) {
      userData.value = userStore.userInfo
    } else {
      await fetchOtherUserInfo()
    }

    // 配置标签
    const tags = {}
    commonStore.dataMap.tags.forEach((item) => {
      tags[item.code] = item.info
    })
    tagDataMap.value = tags

    profileRef.value.complete()
  } catch (err) {}
}

onLoad((params) => {
  pageParams.id = params.id
  pageParams.isOwn = params.type === 'own'
})

onShow(() => {
  queryUserInfoData()
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
  background-size: 100% 100%;
  background-repeat: no-repeat;
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
      color: #ffffff;
      background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%) !important;
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
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;

    .list_scroll {
      :deep(.zp-paging-container-content) {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    }

    .avatar {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      overflow: hidden;
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
          margin-right: 5px;
        }

        .icon2 {
          width: 45px;
          height: 15px;
        }

        .base {
          width: 45px;
          height: 15px;
          display: flex;
          font-size: 10px;
          border-radius: 10px;
          align-items: center;
          justify-content: center;

          &.male {
            color: #ffffff;
            background-color: #1e92fd;
          }

          &.female {
            color: #ffffff;
            background-color: #ff75ca;
          }

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
        // gap: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
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

      .noTags {
        font-size: 14px;
        color: #9395a4;
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
