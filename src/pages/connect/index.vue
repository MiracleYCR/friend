<template>
  <view class="connect_container">
    <view class="search">
      <view class="city">
        广州
        <wd-img class="icon" src="/static/images/arrow3.png"></wd-img>
      </view>
      <wd-img class="icon" src="/static/images/search.png" @click="handleGotoSearch"></wd-img>
    </view>

    <wd-swiper :height="130" autoplay :list="swiperList" v-model:current="curSwiper"></wd-swiper>

    <view class="filter">
      <wd-tabs class="tab" v-model="tab">
        <wd-tab title="推荐"></wd-tab>
        <wd-tab title="附近的人"></wd-tab>
        <wd-tab title="同城"></wd-tab>
      </wd-tabs>

      <wd-drop-menu class="menu">
        <wd-drop-menu-item title="年龄段" ref="dropMenu" icon="fill-arrow-down" icon-size="24px">
          <view class="box-border p-5">
            <wd-cell title="标题文字" value="内容" />
            <wd-cell title="标题文字" label="描述信息" value="内容" />
          </view>
        </wd-drop-menu-item>
      </wd-drop-menu>
    </view>

    <view class="userList">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <view class="card" v-for="n in 10" :key="n">
          <UserCard @click="handleGotoProfile" />
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import UserCard from '@/components/card/user.vue'

const curSwiper = ref<number>(0)
const swiperList = ref<string[]>([
  '/static/images/banner.png',
  '/static/images/banner.png',
  '/static/images/banner.png',
])

const tab = ref<number>(0)

const handleGotoSearch = () => {
  uni.navigateTo({
    url: '/pages/search/index',
  })
}

const handleGotoProfile = () => {
  uni.navigateTo({
    url: `/pages/profile/index?type=other`,
  })
}
</script>

<style lang="scss" scoped>
.connect_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  padding: env(safe-area-inset-top) 0 0 0;
  background-repeat: no-repeat;
  background-color: #f3f5f6;
  background-image: url('../../static/images/background2.png');

  .search {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
    justify-content: space-between;

    .icon {
      width: 28px;
      height: 28px;
    }

    .city {
      color: #ffffff;
      font-weight: 500;
      .icon {
        width: 14px;
        height: 14px;
      }
    }
  }

  .filter {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px 0 0;
    box-sizing: border-box;
    background-color: #ffffff;
    overflow: hidden;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    .tab {
      width: 200px;
      height: 45px !important;

      :deep(.wd-tabs__nav-item.is-active) {
        font-size: 16px;
        font-weight: 600;
      }

      :deep(.wd-tabs__line) {
        background: linear-gradient(90deg, #fb2c58 0%, rgba(251, 44, 88, 0) 100%) !important;
      }
    }

    .menu {
      height: 45px !important;

      :deep(.wd-drop-menu__list) {
        height: 45px !important;
      }
    }
  }

  .userList {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;

    .card {
      height: 100px;
      overflow: hidden;
      border-radius: 10px;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
      }
    }
  }
}
</style>
