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
            :class="[userStore.userInfo.locationCity ? 'active' : 'inactive']"
            @click="handleCheckLocation"
          >
            {{ userStore.userInfo.locationCity || '重新定位' }}
          </wd-button>
        </view>
      </view>

      <view class="mb-10px">
        <view class="title">热门城市</view>
        <view class="hotCity">
          <view v-if="loading" class="loadingBody">
            <wd-loading color="#fd2b58"></wd-loading>
          </view>
          <block v-else>
            <view
              class="cityTag"
              v-for="(city, index) in hotCityList"
              :key="index"
              @click="handleSelectCity(city)"
            >
              {{ city.name }}
            </view>
          </block>
        </view>
      </view>

      <view class="mt-10px">
        <view class="title">城市选项</view>

        <view v-if="loading" class="loadingBody">
          <wd-loading color="#fd2b58"></wd-loading>
        </view>

        <block v-else>
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
        </block>
      </view>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { PopupType } from 'wot-design-uni/components/wd-popup/types'
import { defineProps, defineExpose, PropType, defineEmits } from 'vue'

import { setOwnUserInfo, getOwnUserInfo } from '@/api/user'
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

// 加载
const loading = ref(false)
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
  loading.value = true
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

  loading.value = false
}

const close = () => {
  visible.value = false
}

const handleCheckLocation = async () => {
  locationLoading.value = true
  uni.getLocation({
    // type: 'wgs84',
    type: 'gcj02',
    success: async (res) => {
      const locationData: any = await getLocationInfo({
        latitude: res.latitude,
        longitude: res.longitude,
      })

      await setOwnUserInfo({
        ...userStore.userInfo,
        orientationCityId: locationData.data.cityCode,
        orientationDistrictId: locationData.data.districtCode,
        orientationProvinceId: locationData.data.provinceCode,
      })

      // 获取用户信息
      const userInfoResp: any = await getOwnUserInfo()
      userStore.setUserInfo(userInfoResp.data)

      locationLoading.value = false

      handleSelectCity({
        name: locationData.data.locationCity,
        code: locationData.data.cityCode,
      })
    },
    fail: (err) => {
      console.error('获取位置信息失败', err)
    },
  })
}

const handleSelectCity = (city: any, closed: boolean = true) => {
  emits('updateLoactionCity', city)
  closed && close()
}

defineExpose({
  open,
  close,
})
</script>

<style lang="scss" scoped>
.location_container {
  padding: env(safe-area-inset-top) 10px 10px 10px;
  box-sizing: border-box;

  .loadingBody {
    width: 100%;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
  }

  .hotCity {
    // gap: 10px;
    display: flex;
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
      margin-right: 10px;
      margin-bottom: 10px;
      background-color: #f2f4f8;
    }
  }

  .cityList {
    height: 400px;

    :deep(.wd-index-bar__index) {
      padding: 0px;
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
