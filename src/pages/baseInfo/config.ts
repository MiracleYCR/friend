import { useCommonStore } from '@/store'

export default () => {
  const commonStore: any = useCommonStore()

  // 时间戳
  const timePickerStamp = [new Date('1900-01-01').getTime(), new Date().getTime()]

  // 身高
  const heightOpts = Array.from({ length: 101 }, (_, i) => `${i + 140}`).map((item) => {
    return {
      value: item,
      label: `${item} cm`,
    }
  })

  // 学历
  const educationOpts = commonStore.dataMap.education.map((item) => {
    return { label: item.info, value: item.code }
  })

  // 房产
  const assetsOpts = [
    { label: '不选', value: '' },
    { label: '已购房', value: '已购房' },
    { label: '与父母同住', value: '与父母同住' },
    { label: '无房产', value: '无房产' },
  ]

  // 收入
  const incomeOpts = [
    { label: '不选', value: '' },
    { label: '4千以下', value: '0-4000' },
    { label: '4千-6千', value: '4000-6000' },
    { label: '6千-1万', value: '6000-10000' },
    { label: '1万-2万', value: '10000-20000' },
    { label: '2万-5万', value: '20000-50000' },
    { label: '5万-10万', value: '50000-100000' },
    { label: '10万以上', value: '100000-' },
  ]

  const sexOpts = [
    { label: '男', value: 1 },
    { label: '女', value: 0 },
  ]

  const marriageOpts = [
    { label: '不选', value: '' },
    { label: '未婚', value: '未婚' },
    { label: '离异', value: '离异' },
    { label: '丧偶', value: '丧偶' },
  ]

  const ageOpts = [
    { label: '不选', value: '' },
    { label: '20岁-30岁', value: '20-30' },
    { label: '25岁-35岁', value: '25-35' },
    { label: '30岁-40岁', value: '30-40' },
    { label: '35岁-45岁', value: '35-45' },
    { label: '40岁-50岁', value: '40-50' },
    { label: '45岁-55岁', value: '45-55' },
  ]

  const tagDataMap = {}
  const tagOpts = commonStore.dataMap.tags.map((item) => {
    tagDataMap[item.code] = item.info
    return { label: item.info, value: item.code }
  })

  return {
    ageOpts,
    sexOpts,
    timePickerStamp,
    heightOpts,
    educationOpts,
    assetsOpts,
    incomeOpts,
    tagOpts,
    tagDataMap,
    marriageOpts,
  }
}
