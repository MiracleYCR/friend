<template>
  <view class="search">
    <view class="header">
      <wd-img class="back" src="/src/static/images/back.png" @click="handleBack" />
      <wd-search
        placeholder-left
        hide-cancel
        placeholder="请输入昵称或用户ID"
        v-model="keyword"
        @search="handleSearchUserList"
      />
    </view>

    <view class="list">
      <z-paging
        class="list_scroll"
        ref="userListRef"
        v-model="searchUserList"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
        :show-loading-more-no-more-view="searchUserList.length > 0"
        refresher-complete-text="刷新完成"
        refresher-default-text="下拉刷新"
        refresher-pulling-text="释放刷新"
        refresher-refreshing-text="加载中..."
        loading-more-no-more-text="没有更多数据啦~"
        @query="handleSearchUserList"
      >
        <block v-if="!loading && searchUserList.length > 0">
          <view class="card" v-for="(user, index) in searchUserList" :key="index">
            <UserCard :userData="user" />
          </view>
        </block>

        <block v-if="!loading && searchUserList.length === 0">
          <view class="empty">
            <wd-img class="w-200px h-200px" src="/static/images/empty.png"></wd-img>
            暂无搜索到的用户
          </view>
        </block>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getConnectUserList } from '@/api/connect/index'
import UserCard from '@/components/card/user2.vue'

const loading = ref(false)

const keyword = ref('')
const userListRef = ref(null)
const searchUserList = ref([])

const handleBack = () => {
  uni.navigateBack()
}

const handleSearchUserList = async () => {
  loading.value = true

  const { rows }: any = await getConnectUserList({
    keyWord: keyword.value,
  })

  searchUserList.value = rows
  userListRef.value.complete(searchUserList.value)

  loading.value = false
}

onShow(() => {
  handleSearchUserList()
})
</script>

<style lang="scss" scoped>
.search {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: env(safe-area-inset-top) 10px 0 15px;
  box-sizing: border-box;

  .header {
    height: 50px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .back {
      width: 16px;
      height: 16px;
    }

    :deep(.wd-search) {
      flex: 1;
      padding-right: 0 !important;
    }
  }

  .list {
    flex: 1;
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
