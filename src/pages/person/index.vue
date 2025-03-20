<template>
  <view class="person_container" :style="{ padding: pagePadding }">
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
        <block v-if="listData.length > 0">
          <view class="card" v-for="n in listData" :key="n">
            <UserCard />
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

const title = ref('')
const listData = ref([])

const handleBack = () => {
  uni.navigateBack()
}

const queryData = async (type) => {
  const { data } = await fetchApi[type]()
  listData.value = data.rows
}

onLoad((params) => {
  title.value = titleList[params.type]
  queryData(params.type)
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
