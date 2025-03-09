<template>
  <view class="square_container">
    <view class="tab_wrapper">
      <wd-tabs class="tab" v-model="tab">
        <wd-tab title="关注" name="follow"></wd-tab>
        <wd-tab title="广场" name="square"></wd-tab>
        <wd-tab title="同城" name="sameCity"></wd-tab>
      </wd-tabs>
    </view>

    <view class="body">
      <z-paging
        class="list_scroll"
        ref="postListRef"
        v-model="postListData"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
        @query="queryPostListData"
      >
        <view class="card" v-for="(postData, index) in postListData" :key="index">
          <PostCard :postData="postData" :userData="postData.sysUser" />
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import { getSquarePostList } from '@/api/post'
import PostCard from '@/components/card/post.vue'

// tab页
const tab = ref<string>('square')

// 帖子列表
const postListRef = ref(null)
const postListData = ref<any[]>([])

// 查询帖子数据
const queryPostListData = async () => {
  const resp: any = await getSquarePostList({
    postType: tab.value,
  })
  postListData.value = resp.rows
  postListRef.value.complete(postListData.value)
}

watch(tab, (n) => {
  queryPostListData()
})
</script>

<style lang="scss" scoped>
.square_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: env(safe-area-inset-top) 15px 0 15px;
  background-color: #f3f5f6;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../static/images/background.png');

  .tab_wrapper {
    height: 50px;
    display: flex;
    align-items: center;
    .tab {
      width: 140px;
      background: transparent;

      :deep(.wd-tabs__nav-item.is-active) {
        font-size: 16px;
        font-weight: 600;
      }

      :deep(.wd-tabs__nav) {
        background: transparent;
      }

      :deep(.wd-tabs__line) {
        background: linear-gradient(90deg, #fb2c58 0%, rgba(251, 44, 88, 0) 100%) !important;
      }
    }
  }

  .body {
    flex: 1;
    padding-bottom: 15px;
    box-sizing: border-box;
  }
}
</style>
