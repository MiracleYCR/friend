import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {}

export const useUserStore = defineStore(
  'user',
  () => {
    // 鉴权
    const token = ref('')
    const setToken = (val: string) => {
      token.value = val
    }

    // 用户信息
    const userInfo = ref({ ...initState })
    const setUserInfo = (val) => {
      userInfo.value = val
    }

    const logout = () => {
      token.value = ''
      userInfo.value = { ...initState }
    }

    const isLogined = computed(() => !!token.value)

    return {
      token,
      setToken,

      userInfo,
      setUserInfo,

      logout,

      isLogined,
    }
  },
  {
    persist: true,
  },
)
