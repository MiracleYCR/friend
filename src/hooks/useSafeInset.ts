import { ref, onMounted } from 'vue'

export const setPagePadding = (topVal = 0, rightVal = 0, bottomVal = 0, leftVal = 0) => {
  const pagePadding = ref('')

  onMounted(() => {
    const deviceInfo: any = uni.getSystemInfoSync()
    const { top, right, left, bottom } = deviceInfo.safeAreaInsets
    pagePadding.value = `${top + topVal}px ${right + rightVal}px ${bottom + bottomVal}px ${left + leftVal}px`
  })

  return {
    pagePadding,
  }
}
