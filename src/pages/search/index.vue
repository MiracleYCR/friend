<template>
  <view class="search">
    <view class="header">
      <wd-img class="back" src="/src/static/images/back.png" @click="handleBack" />
      <wd-search placeholder-left v-model="keyword" cancel-txt="搜索" />
    </view>

    <view class="list">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <view class="card" v-for="n in 10" :key="n">
          <UserCard />
        </view>

        <!-- <view class="empty">
            <wd-img class="w-200px h-200px" src="/static/images/empty.png"></wd-img>
          暂无搜索到的用户
        </view> -->
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UserCard from '@/components/card/user2.vue'

const keyword = ref('')

const handleBack = () => {
  uni.navigateBack()
}
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
