<template>
  <view class="publish">
    <view class="header">
      <wd-icon class="back" name="close" size="16px" @click="handleBack"></wd-icon>
      <view class="title">发帖</view>
      <wd-button class="btnColor w-60px" size="small" @click="handleSubmitPost">发布</wd-button>
    </view>

    <view class="body">
      <z-paging :fixed="false" :scroll-y="true" :scroll-view="true" :show-scrollbar="false">
        <wd-textarea
          show-word-limit
          :maxlength="120"
          placeholder="请输入内容"
          v-model="postData.postText"
        ></wd-textarea>

        <view :class="['mediaList', showEvoke ? 'showEvoke' : 'hideEvoke']">
          <Upload
            :limit="9"
            :fileList="postData.postImages"
            @before-upload-file="handleBeforeUploadFile"
            @update-file-list="handleUpdatePostImages"
          />
        </view>

        <view class="location">
          <wd-button
            :loading="locationLoading"
            size="small"
            type="text"
            icon="location"
            @click="handleCheckLocation"
          >
            {{ postData.location || '获取当前定位' }}
          </wd-button>
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'

import { addPost } from '@/api/post/index'
import { getLocationInfo } from '@/api/common/index'

import Upload from '@/components/upload/index.vue'

const showEvoke = ref(true)

const postData = reactive({
  postText: '',
  postImages: [],
  latitude: 0,
  longitude: 0,
  location: '',
})

// 获取定位
const locationText = ref('')
const locationLoading = ref(false)
const handleCheckLocation = () => {
  locationLoading.value = true
  uni.getLocation({
    type: 'wgs84',
    success: async (res) => {
      const { data }: any = await getLocationInfo({
        latitude: res.latitude,
        longitude: res.longitude,
      })

      postData.location = data
      postData.latitude = res.latitude
      postData.longitude = res.longitude

      locationLoading.value = false
    },
    fail: (err) => {
      console.error('获取位置信息失败', err)
    },
  })
}

const handleReset = () => {
  postData.postText = ''
  postData.postImages = []
}

const handleBack = () => {
  handleReset()
  uni.showTabBar({ animation: false })
  uni.switchTab({ url: '/pages/connect/index' })
}

// 上传文件
const handleBeforeUploadFile = (fileList) => {
  showEvoke.value = fileList.length < 9
}
const handleUpdatePostImages = (fileList) => {
  postData.postImages = fileList
}

const handleSubmitPost = async () => {
  await addPost({
    location: postData.location,
    latitude: postData.latitude,
    longitude: postData.longitude,
    postText: postData.postText,
    postImages: postData.postImages.map((item) => item.url),
  })

  uni.showToast({
    title: '发布成功！',
    icon: 'none',
  })

  handleBack()
}

onShow(() => {
  uni.hideTabBar({ animation: false })
})
</script>

<style lang="scss" scoped>
.publish {
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
    }

    .btnColor {
      position: absolute;
      right: 0;
      height: 25px;
      font-size: 15px;
      background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%) !important;
    }
  }

  .body {
    flex: 1;
    width: 100%;
    margin-top: 10px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;

    :deep(.zp-paging-container-content) {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .mediaList {
      width: 100%;

      .upload {
        width: 100%;

        :deep(.wd-upload) {
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-start;

          .wd-upload__preview {
            width: 110px;
            height: 110px;
            margin: 0;
          }

          .wd-upload__evoke {
            display: none;
            width: 110px;
            height: 110px;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            .wd-icon {
              width: 50px;
              height: 50px;
              font-size: 50px;
            }
          }
        }
      }

      &.hideEvoke {
        :deep(.wd-upload__evoke) {
          display: none !important;
        }
      }
    }

    // .mediaList {
    //   width: 100%;
    //   display: flex;
    //   flex-wrap: wrap;
    //   gap: 10px;
    //   align-items: center;
    //   justify-content: flex-start;

    //   .mediaItem {
    //     width: 110px;
    //     height: 110px;
    //     overflow: hidden;
    //     border-radius: 5px;
    //   }

    //   .upload {
    //     width: 110px;
    //     height: 110px;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;

    //     :deep(.wd-upload) {
    //       width: 110px;
    //       height: 110px;
    //       margin: 0;

    //       .wd-upload__preview {
    //         // display: none;
    //       }

    //     }
    //   }
    // }

    .location {
      width: 100%;
      height: 30px;
      display: flex;
      margin-top: 15px;
      align-items: center;
      justify-content: flex-start;
    }
  }

  :deep(.wd-textarea) {
    width: 100%;
    height: 200px;
    background: transparent !important;

    .wd-textarea__placeholder {
      color: #ffffff;
    }

    .wd-textarea__suffix {
      background: transparent !important;
    }

    .wd-textarea__value {
      background: transparent !important;
    }

    .wd-textarea__count {
      color: #c0c4cc;
      background: transparent !important;

      .wd-textarea__count-current {
        color: #c0c4cc;
      }
    }
  }
}
</style>
