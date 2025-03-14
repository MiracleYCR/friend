import { TUIChatKit } from '../TUIKit'
import { TUILogin } from '@tencentcloud/tui-core'
import { genTestUserSig } from '@/utils/generateUserSign'

export default () => {
  TUIChatKit.init()

  const options = genTestUserSig({
    SDKAppID: 1600073144,
    secretKey: 'a86f6b8102c5c379b78baf4961923ade96af7d3ec4c34fb317099942067e63c7',
    userID: '202503113875',
  })

  TUILogin.login({
    SDKAppID: 1600073144,
    userID: '202503113875',
    userSig: options.userSig,
    useUploadPlugin: true,
    framework: `vue3`,
  }).catch((err) => {
    console.log(err)
  })
}
