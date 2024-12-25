<template>
  <view class="connect">
    <LogoNav />

    <view class="search_wrapper">
      <wd-search
        class="search"
        v-model="area"
        hide-cancel
        placeholder-left
        placeholder="请输入关键字搜索"
      >
        <template #prefix>
          <wd-popover mode="menu" :content="menu" @menuclick="changeSearchType">
            <view class="search-type">
              {{ searchType }}
              <wd-icon custom-class="icon-arrow" name="fill-arrow-down"></wd-icon>
              <view class="divider"></view>
            </view>
          </wd-popover>
        </template>
      </wd-search>
    </view>

    <wd-swiper class="banner" autoplay :list="swiperList" v-model:current="curSwiper"></wd-swiper>

    <view class="filter">
      <wd-tabs class="tab" v-model="tab">
        <wd-tab title="推荐"></wd-tab>
        <wd-tab title="附近的人"></wd-tab>
        <wd-tab title="同城"></wd-tab>
      </wd-tabs>
      <wd-drop-menu class="menu">
        <wd-drop-menu-item title="年龄段" ref="dropMenu">
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
          <UserCard />
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import LogoNav from '@/components/logo/index.vue'
import UserCard from '@/components/usercard/index.vue'

import { ref } from 'vue'

const area = ref<string>('')
const searchType = ref<string>('深圳')

const curSwiper = ref<number>(0)
const swiperList = ref<string[]>([
  '/static/images/banner.png',
  '/static/images/banner.png',
  '/static/images/banner.png',
])

const tab = ref<number>(0)
</script>

<style lang="scss" scoped>
.connect {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #f1f4fc;
  display: flex;
  flex-direction: column;

  .search_wrapper {
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #ffffff;

    .search {
      width: 100%;
      display: flex;
      align-items: center;

      .search-type {
        font-size: 14px;
        padding: 0 10px;
        display: flex;
        align-items: center;

        .divider {
          width: 1px;
          height: 15px;
          margin-left: 5px;
          background-color: #cccccc;
        }
      }
    }
  }

  .banner {
    height: 200px;
    margin: 10px 10px 0 10px;
  }

  .filter {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 0;
    box-sizing: border-box;
    background-color: #ffffff;

    .tab {
      width: 200px;
      height: 45px !important;
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
    padding: 10px 10px;
    box-sizing: border-box;

    .card {
      height: 100px;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
