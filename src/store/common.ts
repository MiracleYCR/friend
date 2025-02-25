import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore(
  'common',
  () => {
    // 映射值
    const dataMap = ref({})
    const setDataMap = (data: any) => {
      dataMap.value = data
    }

    return {
      dataMap,
      setDataMap,
    }
  },
  {
    persist: true,
  },
)
