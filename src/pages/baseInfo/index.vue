<template>
  <view class="baseInfo_container">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">基本资料</view>
    </view>

    <view class="body">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <block v-if="!loading">
          <view class="avatar">
            <wd-img
              v-if="baseData.avatar"
              class="w-100px h-100px rounded-50px overflow-hidden"
              :src="baseData.avatar"
            ></wd-img>
            <view
              v-else
              class="w-100px h-100px rounded-50px overflow-hidden bg-gray-200 flex items-center justify-center text-[14px] text-gray-400"
            >
              暂无头像
            </view>

            <view class="iconBg" @click="handleUploadAvatar">
              <view class="iconWrapper">
                <wd-img class="w-14px h-14px" src="/static/images/camera.png"></wd-img>
              </view>
            </view>
          </view>

          <view class="album">
            <view class="title">个人相册</view>
            <view class="pictures_container">
              <view class="add" @click="handleUploadPicture">
                <wd-icon name="add" size="20px" color="rgba(147, 149, 164, 0.9)" />
              </view>

              <z-paging
                class="pictures_scroll"
                scroll-x
                :fixed="false"
                :scroll-view="true"
                :show-scrollbar="false"
              >
                <view class="content-container">
                  <wd-img
                    class="min-w-50px h-50px mr-10px rounded-5px overflow-hidden"
                    v-for="(img, index) in originAlbumList"
                    :key="index"
                    :src="img.url"
                  ></wd-img>
                </view>
              </z-paging>
            </view>
          </view>

          <view class="desc">
            <wd-form ref="form" :model="baseData">
              <wd-input
                required
                align-right
                label="一句话简介"
                label-width="100px"
                prop="userDesc"
                v-model="baseData.userDesc"
                placeholder="请填写一句话简介"
              />
            </wd-form>
          </view>

          <view class="base">
            <view class="title">基本信息</view>

            <wd-form ref="form" :model="baseData">
              <wd-input
                required
                align-right
                label="昵称"
                label-width="100px"
                prop="nickName"
                v-model="baseData.nickName"
                placeholder="请输入昵称"
              />
              <wd-picker
                align-right
                label="性别"
                label-width="100px"
                placeholder="请选择性别"
                v-model="baseData.sex"
                :columns="sexOpts"
              />
              <wd-datetime-picker
                required
                align-right
                type="date"
                label="生日"
                label-width="100px"
                placeholder="请选择生日"
                :minDate="timePickerStamp[0]"
                :maxDate="timePickerStamp[1]"
                v-model="baseData.birthday"
              />
              <wd-picker
                align-right
                label="身高"
                label-width="100px"
                placeholder="请选择身高"
                v-model="baseData.height"
                :columns="heightOpts"
              />
              <wd-col-picker
                align-right
                label="所在地"
                label-width="80px"
                placeholder="请选择所在地"
                value-key="code"
                label-key="name"
                v-model="baseData.orientation"
                :columns="orientationOpts"
                :column-change="columnChange"
              ></wd-col-picker>
              <wd-col-picker
                required
                align-right
                label="家乡"
                label-width="50px"
                placeholder="请选择家乡"
                value-key="code"
                label-key="name"
                v-model="baseData.home"
                :columns="homeOpts"
                :column-change="columnChange"
              ></wd-col-picker>
              <wd-picker
                align-right
                label="学历"
                label-width="100px"
                placeholder="请选择学历"
                v-model="baseData.qualifications"
                :columns="educationOpts"
              />
              <wd-input
                align-right
                label="学校"
                label-width="100px"
                prop="graduateSchool"
                v-model="baseData.graduateSchool"
                placeholder="您的毕业院校是？"
              />
              <wd-input
                required
                align-right
                label="职业"
                label-width="100px"
                prop="occupation"
                v-model="baseData.occupation"
                placeholder="您从事什么工作？"
              />
              <wd-input
                align-right
                label="公司"
                label-width="100px"
                prop="companyName"
                v-model="baseData.companyName"
                placeholder="请填写就职公司"
              />
              <wd-picker
                required
                align-right
                label="月收入"
                label-width="100px"
                placeholder="请选择月收入"
                v-model="baseData.monthlySalary"
                :columns="incomeOpts"
              />
              <wd-picker
                align-right
                label="婚姻状况"
                label-width="100px"
                placeholder="请选择您的婚姻状况"
                v-model="baseData.maritalStatus"
                :columns="marriageOpts"
              />
              <wd-picker
                align-right
                label="有无房产"
                label-width="100px"
                placeholder="是否购房"
                v-model="baseData.haveHouse"
                :columns="assetsOpts"
              />
            </wd-form>
          </view>

          <view class="desc">
            <wd-form ref="form" :model="baseData">
              <wd-input
                required
                align-right
                label="交友心声"
                label-width="100px"
                prop="datingVoices"
                v-model="baseData.datingVoices"
                placeholder="请填写交友心声"
              />
            </wd-form>
          </view>

          <view class="tags">
            <wd-form ref="form" :model="baseData">
              <wd-select-picker
                required
                ellipsis
                align-right
                label="个性标签"
                label-width="100px"
                placeholder="请选择个性标签"
                v-model="baseData.clientUserTags"
                :columns="tagOpts"
                @change="handleChangePersonalTags"
              ></wd-select-picker>
            </wd-form>

            <view class="tagList">
              <view class="tag" v-for="(tag, index) in personalTagList" :key="index">
                {{ tag }}
              </view>
            </view>
          </view>

          <view class="range">
            <view class="title">交友范围</view>
            <wd-form ref="form" :model="baseData">
              <wd-col-picker
                align-right
                label="所在地"
                label-width="80px"
                placeholder="不限"
                value-key="code"
                label-key="name"
                v-model="baseData.friendArea"
                :columns="friendAreaOpts"
                :column-change="columnChange"
              ></wd-col-picker>
              <wd-picker
                align-right
                label="年龄"
                label-width="100px"
                placeholder="不限"
                v-model="baseData.friAge"
                :columns="ageOpts"
              />
              <wd-picker
                align-right
                label="身高"
                label-width="100px"
                placeholder="不限"
                v-model="baseData.friHeight"
                :columns="heightOpts"
              />
              <wd-picker
                align-right
                label="最低学历"
                label-width="100px"
                placeholder="不限"
                v-model="baseData.friQualifications"
                :columns="educationOpts"
              />
              <wd-input
                type="number"
                align-right
                label="最低月收入"
                label-width="100px"
                v-model="baseData.friMinSalary"
                placeholder="不限"
              />
            </wd-form>
          </view>

          <wd-button v-show="canEdit" class="saveBtn" block @click="handleSaveBaseInfo">
            保存
          </wd-button>
        </block>
      </z-paging>
    </view>

    <wd-overlay :show="dialogVisible">
      <view class="dialog_wrapper">
        <view class="block">
          <view class="title">编辑相册</view>

          <z-paging
            class="dialog_pictures_scroll"
            :fixed="false"
            :scroll-view="true"
            :show-scrollbar="false"
          >
            <Upload :fileList="originAlbumList" @update-file-list="handleUpdateFileList" />
          </z-paging>

          <view class="btns">
            <wd-button class="cancel" @click="handleCancelEditPictures">取消</wd-button>
            <wd-button class="confirm" @click="handleSaveEditPictures">保存</wd-button>
          </view>
        </view>
      </view>
    </wd-overlay>
  </view>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store'
import {} from '@/store/common'
import { onShow } from '@dcloudio/uni-app'

import { getCityTree } from '@/api/common'
import { setOwnUserInfo } from '@/api/user'

import useConfig from './config'
import Upload from '@/components/upload/index.vue'

// pinia
const userStore: any = useUserStore()

const {
  sexOpts,
  ageOpts,
  tagOpts,
  tagDataMap,
  heightOpts,
  assetsOpts,
  incomeOpts,
  marriageOpts,
  educationOpts,
  timePickerStamp,
} = useConfig()

//
const loading = ref(false)

// 是否可编辑
const canEdit = ref(false)

// 个人相册
const originAlbumList = ref([])
const currentAlbumList = ref([])

// 基础信息
const baseData: any = reactive({
  userId: '',
  avatar: '',
  userDesc: '',
  nickName: '',
  sex: '',
  birthday: '',
  height: '',
  orientation: [],
  home: [],
  qualifications: '',
  graduateSchool: '',
  occupation: '',
  maritalStatus: '',
  haveHouse: '',
  datingVoices: '',
  monthlySalary: '',

  clientUserTags: [],
  friendArea: [],
  friAge: '',
})

// 地区

const homeOpts = ref<any[]>([])
const friendAreaOpts = ref<any[]>([])
const orientationOpts = ref<any[]>([])

// 省市区所有数据
const areaDataList = ref<any[]>([])
// 根据代码查省市区下一级
const findChildrenByCode = (data: any[], code?: string) => {
  if (!code) {
    return data
  }
  for (const item of data) {
    if (item.code === code) {
      return item.children || null
    }
    if (item.children) {
      const childrenResult = findChildrenByCode(item.children, code)
      if (childrenResult) {
        return childrenResult
      }
    }
  }
  return null
}
// 联级变动
const columnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(areaDataList.value, selectedItem.code)

  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          code: item.code,
          name: item.name,
        }
      }),
    )
  } else {
    finish()
  }
}

// 个性标签提示文本
const personalTagList = ref([])

const dialogVisible = ref(false)

// 上传头像
const handleUploadAvatar = () => {
  uni.chooseImage({
    count: 1, // 最多可以选择 3 张图片
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
    sourceType: ['album', 'camera'], // 可以从相册选择或拍照
    success: ({ tempFilePaths, tempFiles }) => {
      uni.uploadFile({
        url: '/prod-api/common/oss/upload',
        filePath: tempFilePaths[0],
        name: 'file',
        success: (uploadRes) => {
          console.log('上传成功：', uploadRes)
          const responseData = JSON.parse(uploadRes.data)
          baseData.avatar = responseData.msg
        },
        fail: (err) => {
          console.error('上传失败：', err)
        },
      })
    },
    fail: (err) => {
      console.error('选择图片失败:', err)
    },
  })
}

// 上传图片
const handleUploadPicture = () => {
  dialogVisible.value = true
}
const handleUpdateFileList = (fileList) => {
  currentAlbumList.value = fileList
}
// 取消编辑
const handleCancelEditPictures = () => {
  dialogVisible.value = false
}
// 保存图片
const handleSaveEditPictures = () => {
  originAlbumList.value = currentAlbumList.value
  dialogVisible.value = false
}

// 修改个性标签
const handleChangePersonalTags = ({ value, selectedItem }) => {
  baseData.clientUserTags = value
  personalTagList.value = value.map((item) => tagDataMap[item])
}

// 返回
const handleBack = () => {
  uni.navigateBack()
}

// 获取用户信息
const handleGetUserData = async () => {
  loading.value = true

  const userInfoData = userStore.getUserInfo()

  // 获取省市区信息
  const { data }: any = await getCityTree()

  areaDataList.value = data

  Object.entries(userInfoData).forEach(([k, v]: any) => {
    switch (k) {
      case 'birthday':
        baseData.birthday = dayjs(v).valueOf()
        break
      case 'clientUserImages':
        baseData.clientUserImages = v && v.length > 0 ? v : []
        originAlbumList.value = v && v.length > 0 ? v.map((item) => ({ url: item })) : []
        break
      case 'friAge':
        baseData[k] = v || ''
        break
      default:
        baseData[k] = v || null
        break
    }
  })

  baseData.orientation = [
    userInfoData.orientationProvinceId,
    userInfoData.orientationCityId,
    userInfoData.orientationDistrictId,
  ]

  baseData.home = [
    userInfoData.homeProvinceId,
    userInfoData.homeCityId,
    userInfoData.homeDistrictId,
  ]

  baseData.friendArea = [
    userInfoData.friProvinceId,
    userInfoData.friCityId,
    userInfoData.friDistrictId,
  ]

  orientationOpts.value = [
    areaDataList.value.map((item) => ({ code: item.code, name: item.name })),
    ...(userInfoData.orientationProvinceId
      ? [
          findChildrenByCode(areaDataList.value, userInfoData.orientationProvinceId)!.map(
            (item) => ({
              code: item.code,
              name: item.name,
            }),
          ),
        ]
      : []),
    ...(userInfoData.orientationCityId
      ? [
          findChildrenByCode(areaDataList.value, userInfoData.orientationCityId)!.map((item) => ({
            code: item.code,
            name: item.name,
          })),
        ]
      : []),
  ]

  homeOpts.value = [
    areaDataList.value.map((item) => ({ code: item.code, name: item.name })),
    ...(userInfoData.homeProvinceId
      ? [
          findChildrenByCode(areaDataList.value, userInfoData.homeProvinceId)!.map((item) => ({
            code: item.code,
            name: item.name,
          })),
        ]
      : []),
    ...(userInfoData.homeCityId
      ? [
          findChildrenByCode(areaDataList.value, userInfoData.homeCityId)!.map((item) => ({
            code: item.code,
            name: item.name,
          })),
        ]
      : []),
  ]

  friendAreaOpts.value = [
    areaDataList.value.map((item) => ({ code: item.code, name: item.name })),
    ...(userInfoData.friProvinceId
      ? [
          findChildrenByCode(areaDataList.value, userInfoData.friProvinceId)!.map((item) => ({
            code: item.code,
            name: item.name,
          })),
        ]
      : []),
    ...(userInfoData.friCityId
      ? [
          findChildrenByCode(areaDataList.value, userInfoData.friCityId)!.map((item) => ({
            code: item.code,
            name: item.name,
          })),
        ]
      : []),
  ]

  personalTagList.value = userInfoData.clientUserTags.map((item) => tagDataMap[item])

  userStore.setUserInfo(userInfoData)

  loading.value = false
}

// 修改用户信息
const handleSaveBaseInfo = async () => {
  const formatData: any = {}

  Object.entries(baseData).forEach(([k, v]: any) => {
    switch (k) {
      case 'birthday':
        formatData[k] = dayjs(v).format('YYYY-MM-DD')
        break
      case 'orientation':
      case 'orientationCityId':
      case 'orientationDistrictId':
      case 'orientationProvinceId':
        formatData.orientationCityId = baseData.orientation[1]
        formatData.orientationDistrictId = baseData.orientation[2]
        formatData.orientationProvinceId = baseData.orientation[0]
        break
      case 'home':
      case 'homeCityId':
      case 'homeDistrictId':
      case 'homeProvinceId':
        formatData.homeCityId = baseData.home[1]
        formatData.homeDistrictId = baseData.home[2]
        formatData.homeProvinceId = baseData.home[0]
        break
      case 'friendArea':
      case 'friCityId':
      case 'friDistrictId':
      case 'friProvinceId':
        formatData.friCityId = baseData.friendArea[1]
        formatData.friDistrictId = baseData.friendArea[2]
        formatData.friProvinceId = baseData.friendArea[0]
        break
      case 'clientUserImages':
        formatData.clientUserImages = originAlbumList.value.map((item) => item.url)
        break
      case 'maxSalary':
      case 'minSalary':
      case 'monthlySalary':
        formatData.minSalary = baseData.monthlySalary.split('-')[0]
        formatData.maxSalary = baseData.monthlySalary.split('-')[1]
        formatData.monthlySalary = baseData.monthlySalary
        break
      case 'friAge':
        formatData.friAge = baseData.friAge
        break
      default:
        formatData[k] = v
        break
    }
  })

  await setOwnUserInfo(formatData)
  await handleGetUserData()

  uni.showToast({
    title: '保存成功！',
    icon: 'none',
    duration: 2000,
  })

  uni.switchTab({ url: '/pages/own/index' })
}

onLoad((params) => {
  canEdit.value = params.type === 'edit'
})

onShow(() => {
  handleGetUserData()
})
</script>

<style lang="scss" scoped>
.baseInfo_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #f3f5f6;
  padding: env(safe-area-inset-top) 0 0 0;
  background-image: url('../../static/images/background.png');

  .header {
    width: 100%;
    height: 45px;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    .back {
      position: absolute;
      left: 15px;
      width: 16px;
      height: 16px;
    }
  }

  .body {
    flex: 1;
    width: 100%;
    margin-top: 10px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;

    .list_scroll {
      :deep(.zp-paging-container-content) {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    }

    .avatar {
      position: relative;
    }

    .iconBg {
      position: absolute;
      bottom: 2px;
      right: 5px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconWrapper {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.57);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .album {
      width: calc(100% - 30px);
      height: 110px;
      margin-top: 15px;
      padding: 15px 15px;
      border-radius: 10px;
      box-sizing: border-box;
      background-color: #ffffff;

      .title {
        font-weight: 500;
        font-size: 15px;
      }

      .pictures_container {
        display: flex;
        margin-top: 10px;
        align-items: center;
        justify-content: space-between;

        :deep(.wd-upload__evoke) {
          display: none;
          width: 50px;
          height: 50px;
          margin-bottom: 0;
          margin-right: 10px;
          border-radius: 5px;
        }

        .add {
          width: 50px;
          height: 50px;
          margin-right: 10px;
          display: flex;
          border-radius: 5px;
          align-items: center;
          justify-content: center;
          background: rgba(147, 149, 164, 0.2);
        }

        .pictures_scroll {
          flex: 1;
          height: 50px;

          .content-container {
            width: 100%;
            display: flex;
            flex-direction: row;
            white-space: nowrap;
            justify-content: flex-start;
          }
        }
      }
    }

    .desc {
      width: calc(100% - 30px);
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 15px;
      border-radius: 10px;
      padding: 10px 15px;
      box-sizing: border-box;
      background-color: #ffffff;
    }

    .tags {
      width: calc(100% - 30px);
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      border-radius: 10px;
      padding: 10px 15px;
      box-sizing: border-box;
      background-color: #ffffff;

      .tagList {
        // gap: 10px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .tag {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 8px;
          margin-right: 10px;
          margin-bottom: 10px;
          border-radius: 15px;
          box-sizing: border-box;
          background-color: #f2f4f8;

          font-size: 12px;
          color: #9395a4;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }

    .desc,
    .tags {
      .wd-form {
        width: 100%;

        :deep(.wd-picker__cell) {
          padding: 10px 0;
        }

        :deep(.wd-select-picker__cell) {
          padding: 10px 0;
        }

        :deep(.is-cell) {
          padding: 10px 0;
        }
      }
    }

    .base,
    .range {
      width: calc(100% - 30px);
      margin-top: 15px;
      border-radius: 10px;
      padding: 15px;
      box-sizing: border-box;
      background-color: #ffffff;

      .title {
        margin-bottom: 10px;
      }

      :deep(.wd-input__label) {
        padding-left: 12px;
      }

      :deep(.wd-picker__label) {
        padding-left: 12px;
      }

      :deep(.wd-picker__cell) {
        padding: 10px 0;
      }

      :deep(.wd-col-picker__label) {
        padding-left: 12px;
      }

      :deep(.wd-col-picker__cell) {
        padding: 10px 0;
      }

      :deep(.is-cell) {
        padding: 10px 0;
      }
    }

    .saveBtn {
      width: calc(100% - 30px);
      height: 44px;
      margin-top: 20px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
    }
  }

  .dialog_wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .block {
      width: calc(100% - 40px);
      border-radius: 10px;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 10px 20px 10px;
      box-sizing: border-box;

      .title {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-weight: 500;
        font-size: 15px;
      }

      .dialog_pictures_scroll {
        width: 100%;
        height: 300px;
        margin: 0 5px;
        box-sizing: border-box;
      }

      .btns {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 10px;

        .cancel {
          width: 100px;
          height: 40px;
          line-height: 40px;
          background-color: #9395a4;
        }

        .confirm {
          width: 100px;
          height: 40px;
          line-height: 40px;
          background-color: #fd2b58;
        }
      }
    }
  }
}
</style>
