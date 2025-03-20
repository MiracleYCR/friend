import { ref, onMounted } from 'vue'
import { getDeviceSafePadding } from '@/utils/device'

export const setPagePadding = (topVal = 0, rightVal = 0, bottomVal = 0, leftVal = 0) => {
  const pagePadding = ref('')

  onMounted(() => {
    const { top, right, left, bottom } = getDeviceSafePadding()
    pagePadding.value = `${top + topVal}px ${right + rightVal}px ${bottom + bottomVal}px ${left + leftVal}px`
  })

  return {
    pagePadding,
  }
}
