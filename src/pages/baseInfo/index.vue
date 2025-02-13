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
        <view class="avatar">
          <wd-img class="w-100px h-100px" src="/static/images/image.png"></wd-img>
          <view class="iconBg">
            <view class="iconWrapper">
              <wd-img class="w-13px h-13px" src="/static/images/camera.png"></wd-img>
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
                <wd-img class="min-w-50px h-50px mr-10px" src="/static/images/picture.png"></wd-img>
                <wd-img class="min-w-50px h-50px mr-10px" src="/static/images/picture.png"></wd-img>
                <wd-img class="min-w-50px h-50px mr-10px" src="/static/images/picture.png"></wd-img>
                <wd-img class="min-w-50px h-50px mr-10px" src="/static/images/picture.png"></wd-img>
                <wd-img class="min-w-50px h-50px mr-10px" src="/static/images/picture.png"></wd-img>
                <wd-img class="min-w-50px h-50px mr-10px" src="/static/images/picture.png"></wd-img>
                <wd-img class="min-w-50px h-50px mr-10px" src="/static/images/picture.png"></wd-img>
                <wd-img class="min-w-50px h-50px mr-10px" src="/static/images/picture.png"></wd-img>
                <wd-img class="min-w-50px h-50px mr-10px" src="/static/images/picture.png"></wd-img>
                <wd-img class="min-w-50px h-50px mr-10px" src="/static/images/picture.png"></wd-img>
              </view>
            </z-paging>
          </view>
        </view>

        <view class="desc">
          <wd-form ref="form" :model="baseData">
            <wd-input
              required
              clearable
              align-right
              label="一句话简介"
              label-width="100px"
              prop="value1"
              v-model="baseData.value1"
              placeholder="请填写一句话简介"
            />
          </wd-form>
        </view>

        <view class="base">
          <view class="title">基本信息</view>

          <wd-form ref="form" :model="baseData">
            <wd-input
              required
              clearable
              align-right
              label="昵称"
              label-width="100px"
              prop="value1"
              v-model="baseData.value1"
              placeholder="请输入昵称"
            />
            <wd-picker
              clearable
              align-right
              label="性别"
              label-width="100px"
              placeholder="请选择性别"
              v-model="baseData.value2"
              :columns="sexOpts"
            />
            <wd-datetime-picker
              required
              clearable
              align-right
              type="date"
              label="生日"
              label-width="100px"
              placeholder="请选择生日"
              :minDate="timePickerStamp[0]"
              :maxDate="timePickerStamp[1]"
              v-model="baseData.value3"
            />
            <wd-picker
              clearable
              align-right
              label="身高"
              label-width="100px"
              placeholder="请选择身高"
              v-model="baseData.value4"
              :columns="heightOpts"
            />
            <wd-picker
              clearable
              align-right
              label="所在地"
              label-width="100px"
              placeholder="请选择所在地"
              v-model="baseData.value5"
              :columns="districtColumns"
              :column-change="onChangeDistrict"
              :display-format="displayFormat"
            />
            <wd-picker
              required
              clearable
              align-right
              label="家乡"
              label-width="100px"
              placeholder="请选择家乡"
              v-model="baseData.value6"
              :columns="districtColumns"
              :column-change="onChangeDistrict"
              :display-format="displayFormat"
            />
            <wd-picker
              clearable
              align-right
              label="学历"
              label-width="100px"
              placeholder="请选择学历"
              v-model="baseData.value7"
              :columns="educationOpts"
            />
            <wd-input
              clearable
              align-right
              label="学校"
              label-width="100px"
              prop="value8"
              v-model="baseData.value8"
              placeholder="您的毕业院校是？"
            />
            <wd-input
              required
              clearable
              align-right
              label="职业"
              label-width="100px"
              prop="value9"
              v-model="baseData.value9"
              placeholder="您从事什么工作？"
            />
            <wd-input
              clearable
              align-right
              label="公司"
              label-width="100px"
              prop="value10"
              v-model="baseData.value10"
              placeholder="请填写就职公司"
            />
            <wd-input
              required
              clearable
              align-right
              label="月收入"
              label-width="100px"
              prop="value11"
              v-model="baseData.value11"
              placeholder="请填写月收入"
            />
            <wd-picker
              clearable
              align-right
              label="婚姻状况"
              label-width="100px"
              placeholder="请选择您的婚姻状况"
              v-model="baseData.value12"
              :columns="marriageOpts"
            />
            <wd-picker
              clearable
              align-right
              label="有无房产"
              label-width="100px"
              placeholder="是否购房"
              v-model="baseData.value12"
              :columns="assetsOpts"
            />
          </wd-form>
        </view>

        <view class="desc">
          <wd-form ref="form" :model="baseData">
            <wd-input
              required
              clearable
              align-right
              label="交友心声"
              label-width="100px"
              prop="value1"
              v-model="baseData.value1"
              placeholder="请填写交友心声"
            />
          </wd-form>
        </view>

        <view class="tags">
          <wd-form ref="form" :model="baseData">
            <wd-select-picker
              required
              clearable
              align-right
              label="个性标签"
              label-width="100px"
              placeholder="请选择个性标签"
              v-model="personTagHint"
              :columns="tagOpts"
              @change="handleChangePersonalTags"
              @confirm="handleConfirmPersonalTags"
            ></wd-select-picker>
          </wd-form>

          <view class="tagList">
            <view class="tag" v-for="(tag, index) in baseData.tags" :key="index">{{ tag }}</view>
          </view>
        </view>

        <view class="range">
          <view class="title">交友范围</view>
          <wd-form ref="form" :model="friendData">
            <wd-picker
              clearable
              align-right
              label="所在地"
              label-width="100px"
              placeholder="不限"
              v-model="friendData.value1"
              :columns="districtColumns"
              :column-change="onChangeDistrict"
              :display-format="displayFormat"
            />
            <wd-input
              clearable
              align-right
              label="年龄"
              label-width="100px"
              prop="value1"
              v-model="baseData.value2"
              placeholder="不限"
            />
            <wd-picker
              clearable
              align-right
              label="身高"
              label-width="100px"
              placeholder="不限"
              v-model="friendData.value3"
              :columns="heightOpts"
            />
            <wd-picker
              clearable
              align-right
              label="最低学历"
              label-width="100px"
              placeholder="不限"
              v-model="friendData.value4"
              :columns="educationOpts"
            />
            <wd-input
              clearable
              align-right
              label="最低月收入"
              label-width="100px"
              v-model="friendData.value5"
              placeholder="不限"
            />
          </wd-form>
        </view>

        <wd-button class="saveBtn" block>保存</wd-button>
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
            <Upload :fileList="baseData.albumList" />
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
import { ref } from 'vue'
import { useUserStore } from '@/store'

import useConfig from './config'
import Upload from '@/components/upload/index.vue'

const { userInfo }: any = useUserStore()

const {
  sexOpts,
  timePickerStamp,
  heightOpts,
  educationOpts,
  assetsOpts,
  incomeOpts,
  tagOpts,
  marriageOpts,
} = useConfig()

// 基础信息
const baseData = reactive({
  albumList: [],

  desc: '',
  tags: [],

  value1: '',
  value2: '',
  value3: '',
  value4: '170 cm',
  value5: [],
  value6: ['110000', '110100', '110102'],
  value7: 4,
  value8: '',
  value9: '',
  value10: '',
  value11: '',
  value12: '',
})

// 交友范围
const friendData = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
})

// 地区
const district = {
  '0': [
    { label: '北京', value: '110000' },
    { label: '广东省', value: '440000' },
  ],
  '110000': [{ label: '北京', value: '110100' }],
  '440000': [
    { label: '广州市', value: '440100' },
    { label: '韶关市', value: '440200' },
    { label: '深圳市', value: '440300' },
    { label: '珠海市', value: '440400' },
    { label: '汕头市', value: '440500' },
  ],
  '110100': [
    { label: '东城区', value: '110101' },
    { label: '西城区', value: '110102' },
    { label: '朝阳区', value: '110105' },
    { label: '丰台区', value: '110106' },
    { label: '石景山区', value: '110107' },
  ],
  '440100': [
    { label: '荔湾区', value: '440103' },
    { label: '越秀区', value: '440104' },
    { label: '海珠区', value: '440105' },
  ],
  '440200': [{ label: '武江区', value: '440203' }],
  '440300': [
    { label: '罗湖区', value: '440303' },
    { label: '福田区', value: '440304' },
  ],
  '440400': [
    { label: '香洲区', value: '440402' },
    { label: '斗门区', value: '440403' },
    { label: '金湾区', value: '440404' },
  ],
  '440500': [
    { label: '龙湖区', value: '440507' },
    { label: '金平区', value: '440511' },
  ],
}
const districtColumns = ref([
  district[0],
  district[district[0][0].value],
  district[district[district[0][0].value][0].value],
])

// 个性标签提示文本
const personTagHint = ref('')

const dialogVisible = ref(false)

// 地区相关
const displayFormat = (items) => {
  return items
    .map((item) => {
      return item.label
    })
    .join('-')
}
const onChangeDistrict = (pickerView, value, columnIndex, resolve) => {
  const item = value[columnIndex]
  if (columnIndex === 0) {
    pickerView.setColumnData(1, district[item.value])
    pickerView.setColumnData(2, district[district[item.value][0].value])
  } else if (columnIndex === 1) {
    pickerView.setColumnData(2, district[item.value])
  }
  resolve()
}

const handleBack = () => {
  uni.navigateBack()
}

// 上传图片
const handleUploadPicture = () => {
  dialogVisible.value = true
}
// 取消编辑
const handleCancelEditPictures = () => {
  dialogVisible.value = false
}
// 保存图片
const handleSaveEditPictures = () => {
  dialogVisible.value = false
}

// 修改个性标签
const handleChangePersonalTags = ({ value }) => {
  console.log(value)
  baseData.tags = value
}
//
const handleConfirmPersonalTags = () => {
  personTagHint.value = ''
}
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
  padding: env(safe-area-inset-top) 15px 0 15px;
  background-image: url('../../static/images/background.png');

  .header {
    width: 100%;
    height: 45px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    .back {
      position: absolute;
      left: 0;
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
      width: 100%;
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
      width: 100%;
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
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      border-radius: 10px;
      padding: 10px 15px;
      box-sizing: border-box;
      background-color: #ffffff;

      .tagList {
        gap: 10px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .tag {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 8px;
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
      width: 100%;
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

      :deep(.is-cell) {
        padding: 10px 0;
      }
    }

    .saveBtn {
      width: 100%;
      height: 44px;
      margin-top: 20px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
    }
  }

  .dialog_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .block {
      width: 80%;
      // height: 350px;
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
        justify-content: space-between;
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
