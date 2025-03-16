import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore(
  'common',
  () => {
    // 获取设备顶部状态栏高度
    const getDeviceStatusBarheight = () => {
      console.log(uni.getSystemInfoSync())
      return uni.getSystemInfoSync().statusBarHeight
    }

    // 映射值
    const dataMap = ref({})
    const setDataMap = (data: any) => {
      dataMap.value = data
    }

    return {
      dataMap,
      setDataMap,

      getDeviceStatusBarheight,
    }
  },
  {
    persist: true,
  },
)
