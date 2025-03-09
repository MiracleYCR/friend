<template>
  <wd-popup v-model="visible" :position="position" :custom-style="customStyle">
    <view class="location_container">
      <view class="mb-10px">
        <view class="title">重新定位</view>

        <view class="flex items-center">
          <wd-button
            size="small"
            icon="location"
            :loading="locationLoading"
            :class="[userStore.userInfo.locationName ? 'active' : 'inactive']"
            @click="handleCheckLocation"
          >
            {{ userStore.userInfo.locationName || '重新定位' }}
          </wd-button>
        </view>
      </view>

      <view class="mb-10px">
        <view class="title">热门城市</view>
        <view class="hotCity">
          <view
            class="cityTag"
            v-for="(city, index) in hotCityList"
            :key="index"
            @click="handleSelectCity(city)"
          >
            {{ city.name }}
          </view>
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
                @click="handleSelectCity(city)"
              ></wd-cell>
            </view>
          </wd-index-bar>
        </view>
      </view>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { defineProps, defineExpose, PropType, defineEmits } from 'vue'
import { PopupType } from 'wot-design-uni/components/wd-popup/types'
import { getLocationInfo, getAllCity, getHotCity } from '@/api/common/index'

const userStore: any = useUserStore()

const props = defineProps({
  position: {
    type: String as PropType<PopupType>,
    default: 'top',
  },
})

const emits = defineEmits(['updateLoactionCity'])

const visible = ref(false)

// 当前定位
const locationLoading = ref(false)

// 所有城市
const cityList = ref([])

// 热门城市
const hotCityList = ref([])

const customStyle = computed(() => {
  return props.position === 'top'
    ? 'border-bottom-left-radius:20px;border-bottom-right-radius:20px;'
    : ''
})

const open = async () => {
  visible.value = true

  const resp: any = await getAllCity()
  const resp2: any = await getHotCity()

  cityList.value = resp.data.map((item) => {
    return {
      index: item.index,
      data: item.areaCode,
    }
  })

  hotCityList.value = resp2.data.map((item) => {
    return {
      name: item.name,
      code: item.code,
    }
  })
}

const close = () => {
  visible.value = false
}

const handleCheckLocation = async () => {
  locationLoading.value = true
  uni.getLocation({
    type: 'wgs84',
    success: async (res) => {
      const { data }: any = await getLocationInfo({
        latitude: res.latitude,
        longitude: res.longitude,
      })

      console.log(data)
      userStore.userInfo.locationName = data

      locationLoading.value = false
    },
    fail: (err) => {
      console.error('获取位置信息失败', err)
    },
  })
}

const handleSelectCity = (city: any) => {
  emits('updateLoactionCity', city)
  close()
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
      height: 28px;
      display: flex;
      align-items: center;
      border-radius: 14px;
      padding: 5px 15px;
      box-sizing: border-box;
      font-size: 14px;
      color: #9395a4;
      background-color: #f2f4f8;
    }
  }

  .cityList {
    height: 480px;

    :deep(.wd-index-bar__index) {
      padding: 2px;
    }

    :deep(.wd-index-bar__sidebar) {
      top: 55%;
    }
  }

  .active {
    color: rgba(253, 43, 88, 1);
    background: rgba(253, 43, 88, 0.1);
  }

  .inactive {
    background: #ffffff;
    color: rgba(147, 149, 164, 1);
    border: 1px solid rgba(147, 149, 164, 1);
  }
}
</style>
