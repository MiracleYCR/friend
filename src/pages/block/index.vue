<template>
  <view class="black_contianer" :style="{ padding: pagePadding }">
    <z-paging
      class="list_scroll"
      :fixed="false"
      :scroll-y="true"
      :scroll-view="true"
      :show-scrollbar="false"
    >
      <block v-for="n in 9" :key="n">
        <UserCard class="card" />
      </block>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import UserCard from '@/components/card/user3.vue'
import { setPagePadding } from '@/hooks/useSafeInset'

const { pagePadding } = setPagePadding(0, 15, 0, 15)
</script>

<style lang="scss" scoped>
.black_contianer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #f3f5f6;

  .list_scroll {
    flex: 1;

    .card {
      height: 100px;
      overflow: hidden;
      padding: 15px;
      box-sizing: border-box;
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
