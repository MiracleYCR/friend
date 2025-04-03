import { ref } from 'vue'
import { defineStore } from 'pinia'
import { TUILogin } from '@tencentcloud/tui-core'

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
    }
    const getUserInfo = () => {
      return userInfo.value
    }

    const logout = () => {
      TUILogin.logout()
        .then(() => {
          token.value = ''
          userInfo.value = {}
          uni.reLaunch({
            url: '/pages/asplash/index',
          })
        })
        .catch(() => {
          token.value = ''
          userInfo.value = {}
          uni.reLaunch({
            url: '/pages/asplash/index',
          })
        })
    }
    const isLogined = computed(() => !!token.value)

    return {
      token,
      setToken,

      userInfo,
      setUserInfo,
      getUserInfo,

      logout,
      isLogined,
    }
  },
  {
    persist: true,
  },
)
