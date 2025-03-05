<template>
  <wd-popup v-model="visible" :position="position" :custom-style="customStyle">
    <view class="location_container">
      <view class="mb-10px">
        <view class="title">重新定位</view>

        <view class="flex items-center">
          <wd-icon name="location" size="20px" color="#fd2b58"></wd-icon>
          <view class="text-[12px] text-[#999999]">当前定位：</view>
        </view>
      </view>

      <view class="mb-10px">
        <view class="title">热门城市</view>
        <view class="hotCity">
          <view class="cityTag">深圳</view>
          <view class="cityTag">广州</view>
          <view class="cityTag">上海</view>
          <view class="cityTag">重庆</view>
          <view class="cityTag">北京</view>
        </view>
      </view>

      <view class="mt-10px">
        <view class="title">城市选项</view>

        <view class="cityList">
          <wd-index-bar sticky>
            <view v-for="item in cityList" :key="item.index">
              <wd-index-anchor :index="item.index" />
              <wd-cell
                border
                clickable
                v-for="city in item.data"
                :key="city.code"
                :title="city.name"
              ></wd-cell>
            </view>
          </wd-index-bar>
        </view>
      </view>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { defineProps, defineExpose, PropType } from 'vue'

import { getAllCity } from '@/api/common'
import { PopupType } from 'wot-design-uni/components/wd-popup/types'

const props = defineProps({
  position: {
    type: String as PropType<PopupType>,
    default: 'top',
  },
})

const visible = ref(false)

const customStyle = computed(() => {
  return props.position === 'top'
    ? 'border-bottom-left-radius:20px;border-bottom-right-radius:20px;'
    : ''
})

const cityList = ref([])

const open = async () => {
  visible.value = true
  const resp: any = await getAllCity()
  console.log(resp.data)
  cityList.value = resp.data.map((item) => {
    return {
      index: item.index,
      data: item.areaCode,
    }
  })
}

const close = () => {
  visible.value = false
}

defineExpose({
  open,
  close,
})
</script>

<style lang="scss" scoped>
.location_container {
  padding: 10px;
  box-sizing: border-box;

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
  }

  .hotCity {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    .cityTag {
      height: 30px;
      display: flex;
      align-items: center;
      border-radius: 15px;
      padding: 5px 15px;
      box-sizing: border-box;
      color: #9395a4;
      background-color: #f2f4f8;
    }
  }

  .cityList {
    height: 500px;

    :deep(.wd-index-bar__index) {
      padding: 2px;
    }

    :deep(.wd-index-bar__sidebar) {
      top: 55%;
    }
  }
}
</style>
