<template>
  <view class="inviteList_container" :style="{ padding: pagePadding }">
    <view class="header">
      <wd-icon class="back" name="arrow-left" size="18px" @click="handleBack"></wd-icon>
      <view class="title">我的邀请</view>
    </view>

    <view class="list">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <block v-if="inviteList.length > 0">
          <view class="card" v-for="(item, index) in inviteList" :key="index">
            <UserCard :data="item" />
          </view>
        </block>

        <block v-else>
          <view class="empty">
            <wd-img class="w-200px h-200px" src="/static/images/empty.png"></wd-img>
            暂无数据
          </view>
        </block>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { myInviteList } from '@/api/invite'
import { setPagePadding } from '@/hooks/useSafeInset'

import UserCard from '@/components/card/user4.vue'

const { pagePadding } = setPagePadding(0, 15, 0, 15)

const inviteList = ref([])

const handleBack = () => {
  uni.navigateBack()
}

const queryInviteList = async () => {
  // const { rows }: any = await myInviteList()
  // inviteList.value = rows
}

onMounted(() => {
  queryInviteList()
})
</script>

<style lang="scss" scoped>
.inviteList_container {
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

    .title {
      font-weight: 500;
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
