import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // 鉴权
    const token = ref('')
    const setToken = (val: string) => {
      token.value = val
    }

    // 用户信息
    const userInfo = ref({})
    const setUserInfo = (val) => {
      userInfo.value = val
      console.log(userInfo.value)
    }

    const logout = () => {
      token.value = ''
      userInfo.value = {}
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
