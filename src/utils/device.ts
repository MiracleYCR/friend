export const getDeviceSafePadding = () => {
  const deviceInfo: any = uni.getSystemInfoSync()

  return {
    top: deviceInfo.safeAreaInsets.top,
    right: deviceInfo.safeAreaInsets.right,
    bottom: deviceInfo.safeAreaInsets.bottom,
    left: deviceInfo.safeAreaInsets.left,
  }
}
