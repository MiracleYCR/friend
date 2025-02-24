export default () => {
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
  const educationOpts = [
    { label: '大专以下', value: '大专以下' },
    { label: '大专', value: '大专' },
    { label: '本科', value: '本科' },
    { label: '硕士及以上', value: '硕士及以上' },
  ]

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

  const tagOpts = [
    'K歌',
    '美食',
    '旅行',
    '健身',
    '电影',
    '音乐',
    '跳舞',
    '爱宠物',
    '动漫',
    '摄影',
    '体育',
    '熬夜党',
    '德云社',
    '穿搭',
    '二次元',
    'hip-hop',
    '宅',
    '微胖',
    '飒',
    '乐观自信',
    '有点洁癖',
    '理性',
    '社恐',
    '有趣的灵魂',
    '间歇性高冷',
    '有纹身',
    '强迫症',
    '短发',
    '声音好听',
    '皮肤白皙',
    '感性',
    '可咸可甜',
    '离乡打工人',
    '憨厚老实人',
    '创业者',
    '白领',
    '蓝领人',
    '夜班族',
    '直男',
    '直女',
    '学生党',
    '有为青年',
    '做点小生意',
    '在家办公',
    '消息秒回',
    '单身等撩',
    '佛系交友',
    '被催婚ing',
    '996',
    'cpdd',
    '难过求安慰',
    '努力工作中',
    '孤单求陪伴',
    '随时领证',
    '已在梦缘找到真爱',
  ].map((item, index) => ({
    label: item,
    value: index,
  }))

  return {
    ageOpts,
    sexOpts,
    timePickerStamp,
    heightOpts,
    educationOpts,
    assetsOpts,
    incomeOpts,
    tagOpts,
    marriageOpts,
  }
}
