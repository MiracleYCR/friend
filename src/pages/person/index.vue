<template>
  <view class="person_container" :style="{ padding: pagePadding }">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">{{ pageTitle }}</view>
    </view>

    <view class="search_wrapper">
      <wd-search
        placeholder-left
        hide-cancel
        placeholder="请输入昵称或用户ID"
        v-model="keyword"
        @search="handleUserList"
      />
    </view>

    <view class="list">
      <z-paging
        class="list_scroll"
        ref="userListRef"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
        v-model="listData"
        :show-loading-more-no-more-view="listData.length > 0"
        refresher-complete-text="刷新完成"
        refresher-default-text="下拉刷新"
        refresher-pulling-text="释放刷新"
        refresher-refreshing-text="加载中..."
        loading-more-no-more-text="没有更多数据啦~"
        @query="handleUserList"
      >
        <block v-if="!loading && listData.length > 0">
          <view class="card" v-for="(user, index) in listData" :key="index">
            <UserCard :userData="user" @click="handleGotoProfile(user)" />
          </view>
        </block>

        <block v-if="!loading && listData.length === 0">
          <view class="empty">
            <wd-img class="w-200px h-200px" src="/static/images/empty.png"></wd-img>
            暂无用户数据
          </view>
        </block>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { setPagePadding } from '@/hooks/useSafeInset'
import { getMyFollowList, getFollowMeList, getMutualList, getVisiteMeList } from '@/api/user'

import UserCard from '@/components/card/user2.vue'

const { pagePadding } = setPagePadding(0, 15, 0, 15)

const titleList = {
  1: '我的关注',
  2: '互相喜欢 ',
  3: '喜欢我的 ',
  4: '最近访客',
}
const fetchApi = {
  1: getMyFollowList,
  2: getMutualList,
  3: getFollowMeList,
  4: getVisiteMeList,
}

const pageType = ref('')
const pageTitle = ref('')

const keyword = ref('')
const listData = ref([])
const loading = ref(false)
const userListRef = ref(null)

const handleBack = () => {
  uni.navigateBack()
}

const handleUserList = async () => {
  loading.value = true

  const { rows } = await fetchApi[pageType.value]({
    keyword: keyword.value,
  })

  listData.value = rows
  userListRef.value.complete(listData.value)

  loading.value = false
}

const handleGotoProfile = (userData: any) => {
  uni.navigateTo({
    url: `/pages/profile/index?type=other&id=${userData.userId}`,
  })
}

onLoad((params) => {
  pageType.value = params.type
  pageTitle.value = titleList[params.type]

  handleUserList()
})
</script>

<style lang="scss" scoped>
.person_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

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

    .search {
      position: absolute;
      right: 0;
      width: 30px;
      height: 30px;
    }
  }

  .search_wrapper {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    .wd-search {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
    }
  }

  .list {
    flex: 1;
    padding: 5px 0;
    box-sizing: border-box;

    .card {
      height: 50px;
      margin-bottom: 25px;
    }

    .empty {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      color: #686a7a;
    }
  }
}
</style>
