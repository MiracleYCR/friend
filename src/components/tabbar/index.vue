<template>
  <view class="app_tabbar">
    <view
      class="tabbar_item"
      v-for="(item, index) in tabList"
      :key="index"
      :class="{ custom: item.text === 'CUSTOM' }"
      @click="switchTab(index)"
    >
      <block v-if="item.active">
        <wd-img
          :class="[item.text === 'CUSTOM' ? 'customIcon' : 'w-[30px] h-[30px]']"
          :src="item.selectedIconPath"
        />
      </block>

      <block v-else>
        <wd-img
          :class="[item.text === 'CUSTOM' ? 'customIcon' : 'w-[30px] h-[30px]']"
          :src="item.iconPath"
        />
      </block>

      <view class="tabbar_title" :class="[item.active ? 'active' : '']">
        {{ item.text !== 'CUSTOM' ? item.text : '' }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const tabList = ref([
  {
    iconPath: '/static/tabbar/home1.png',
    selectedIconPath: '/static/tabbar/home2.png',
    pagePath: 'pages/connect/index',
    text: '缘分',
    active: false,
  },
  {
    iconPath: '/static/tabbar/guangchang1.png',
    selectedIconPath: '/static/tabbar/guangchang2.png',
    pagePath: 'pages/square/index',
    text: '广场',
    active: false,
  },
  {
    iconPath: '/static/tabbar/message.png',
    selectedIconPath: '/static/tabbar/message.png',
    pagePath: 'pages/publish/index',
    text: 'CUSTOM',
    active: false,
  },
  {
    iconPath: '/static/tabbar/xiaoxi1.png',
    selectedIconPath: '/static/tabbar/xiaoxi2.png',
    pagePath: 'pages/message/index',
    text: '消息',
    active: false,
  },
  {
    iconPath: '/static/tabbar/own1.png',
    selectedIconPath: '/static/tabbar/own2.png',
    pagePath: 'pages/own/index',
    text: '我的',
    active: false,
  },
])

const checkCurrentPage = () => {
  const pages = getCurrentPages()
  const lastPage = pages[pages.length - 1]
  const currPath = lastPage.route

  tabList.value = tabList.value.map((item) => {
    console.log(item.pagePath, currPath)

    return {
      ...item,
      active: item.pagePath === currPath,
    }
  })
}

const switchTab = (currentIndex) => {
  let navigatePage

  tabList.value.forEach((item, index) => {
    if (currentIndex === index) {
      navigatePage = item.pagePath
    }
  })

  uni.switchTab({ url: `/${navigatePage}` })
}

onMounted(() => {
  checkCurrentPage()
})
</script>

<style lang="scss" scoped>
.app_tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 60px;

  background-color: #ffffff;

  .tabbar_item {
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    &.custom {
      width: 80px;
      height: 80px;
      background-color: #ffffff;
      border-radius: 50%;
      margin-bottom: 20px;
    }

    .customIcon {
      min-width: 50px !important;
      min-height: 50px !important;
      margin-bottom: 15px;
    }

    .tabbar_title {
      color: #9395a4;
      font-size: 10px;

      &.active {
        color: #191c32;
      }
    }
  }
}
</style>
