<template>
  <view class="person_container">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">{{ title }}</view>
      <wd-img class="search" src="/static/images/search.png" />
    </view>

    <view class="list">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <view class="card" v-for="n in 20" :key="n">
          <UserCard />
        </view>

        <!-- <view class="empty">
          <wd-img class="w-200px h-200px" src="/static/images/empty.png"></wd-img>
          暂无数据
        </view> -->
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import UserCard from '@/components/card/user2.vue'

const title = ref('')
const titleList = {
  1: '我的关注',
  2: '互相喜欢 ',
  3: '喜欢我的 ',
  4: '最近访客',
}

const handleBack = () => {
  uni.navigateBack()
}

onLoad((params) => {
  title.value = titleList[params.type]
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
  padding: env(safe-area-inset-top) 10px 0 15px;

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
