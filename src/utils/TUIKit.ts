import { TUIChatKit } from '../TUIKit'
import { useUserStore } from '@/store'
import { TUILogin } from '@tencentcloud/tui-core'
import { genTestUserSig } from '@/utils/generateUserSign'

export default (userID?: any) => {
  const userStore: any = useUserStore()

  if (userID || userStore.userInfo.appId) {
    const currentUserID = userID || userStore.userInfo.appId

    TUIChatKit.init()

    const options = genTestUserSig({
      SDKAppID: 1600073144,
      secretKey: 'a86f6b8102c5c379b78baf4961923ade96af7d3ec4c34fb317099942067e63c7',
      userID: currentUserID,
    })

    TUILogin.login({
      SDKAppID: 1600073144,
      userID: currentUserID,
      userSig: options.userSig,
      useUploadPlugin: true,
      framework: `vue3`,
    }).catch((err) => {
      console.log(err)
    })
  }
}
