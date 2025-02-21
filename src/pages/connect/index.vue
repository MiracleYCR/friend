<template>
  <view class="connect_container">
    <view class="search">
      <view class="city" @click="handleOpenLocation">
        广州
        <wd-img class="icon" src="/static/images/arrow3.png"></wd-img>
      </view>
      <wd-img class="icon" src="/static/images/search.png" @click="handleGotoSearch"></wd-img>
    </view>

    <wd-swiper :height="130" autoplay :list="swiperList" v-model:current="curSwiper"></wd-swiper>

    <view class="filter">
      <wd-tabs class="tab" v-model="searchData.indexType" @change="fetchConnectUserList">
        <wd-tab title="推荐" name="recommend"></wd-tab>
        <wd-tab title="附近的人" name="nearby"></wd-tab>
        <wd-tab title="同城" name="city"></wd-tab>
      </wd-tabs>

      <wd-drop-menu class="menu">
        <wd-drop-menu-item title="年龄段" ref="filterRef" icon="fill-arrow-down" icon-size="24px">
          <view class="box-border p-5">
            <wd-picker
              align-right
              label="性别："
              placeholder="请选择性别"
              v-model="searchData.sex"
              :columns="[
                { label: '全部', value: 2 },
                { label: '男', value: 0 },
                { label: '女', value: 1 },
              ]"
            />

            <wd-picker
              align-right
              label="年龄："
              placeholder="请选择年龄"
              v-model="searchData.ageRange"
              :columns="ageRangeColumns"
            />
          </view>

          <view class="flex justify-center items-center mb-20px box-border pl-20px pr-20px">
            <wd-button type="info" @click="handleResetFilter">重置</wd-button>
            <wd-button @click="handleConfirmFilter">确认</wd-button>
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
        <view class="card" v-for="(item, index) in connectUserList" :key="index">
          <UserCard :userData="item" @click="handleGotoProfile" />
        </view>
      </z-paging>
    </view>

    <LocationComp ref="locationRef" />
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store'
import { getOwnUserInfo } from '@/api/user'
import { getPlacesInfo } from '@/api/common'
import { getConnectUserList } from '@/api/connect'

import { generateAgeRanges } from '@/utils'
import LocationComp from '@/components/location'
import UserCard from '@/components/card/user.vue'

import { useColPickerData } from '@/hooks/useColPickerData'

// const { colPickerData, findChildrenByCode } = useColPickerData()
// const value = ref<string[]>([])
// const area = ref<any[]>([
//   colPickerData.map((item) => {
//     return {
//       value: item.value,
//       label: item.text,
//     }
//   }),
// ])
// const columnChange = ({ selectedItem, resolve, finish }) => {
//   const areaData = findChildrenByCode(colPickerData, selectedItem.value)
//   if (areaData && areaData.length) {
//     resolve(
//       areaData.map((item) => {
//         return {
//           value: item.value,
//           label: item.text,
//         }
//       }),
//     )
//   } else {
//     finish()
//   }
// }
// function handleConfirm({ value }) {
//   console.log(value)
// }

const { userInfo }: any = useUserStore()

// 定位
const locationRef = ref(null)
const handleOpenLocation = () => {
  console.log(locationRef.value)

  locationRef.value.open()
}

// 轮播
const curSwiper = ref<number>(0)
const swiperList = ref<string[]>(['/static/images/banner.png'])

// 筛选
const filterRef = ref(null)
const ageRangeColumns = generateAgeRanges().map((item) => {
  return {
    label: `${item[0]}岁 - ${item[1]}岁`,
    value: `${item[0]}-${item[1]}`,
  }
})

// 查询条件
const searchData = reactive({
  sex: 2,
  cityCode: '',
  ageRange: '20-50',
  indexType: 'recommend',
})

const connectUserList = ref([])

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

// 重置筛选
const handleResetFilter = () => {
  searchData.sex = 2
  searchData.ageRange = '20-50'
}
// 确认筛选
const handleConfirmFilter = () => {
  filterRef.value.close()
  fetchConnectUserList()
}
// 查询tab用户数据
const fetchConnectUserList = async () => {
  const ageList = searchData.ageRange.split('-')
  searchData.cityCode = userInfo.orientationCityId

  const { rows, total }: any = await getConnectUserList({
    sex: searchData.sex === 2 ? '' : searchData.sex,
    indexType: searchData.indexType,
    startAge: ageList[0],
    endAge: ageList[1],
  })

  connectUserList.value = rows
}

onMounted(() => {
  getPlacesInfo()
  fetchConnectUserList()
})
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
      :deep(.wd-cell__left) {
        height: 60px;
        display: flex;
        align-items: center;
      }

      .menu_filter_1 {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .title {
          height: 100%;
          display: flex;
          align-items: center;
        }
        :deep(.wd-radio) {
          margin-right: 15px;
          .wd-radio__shape {
            margin-top: 0;
          }
        }
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
