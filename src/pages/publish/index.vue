<template>
  <view class="publish_container" :style="{ padding: pagePadding }">
    <view class="header">
      <wd-icon class="back" name="close" size="16px" @click="handleBack"></wd-icon>
      <view class="title">发帖</view>
      <wd-button class="btnColor w-60px" size="small" @click="handleSubmitPost">发布</wd-button>
    </view>

    <block v-if="selectType">
      <view class="body">
        <z-paging :fixed="false" :scroll-y="true" :scroll-view="true" :show-scrollbar="false">
          <wd-textarea
            show-word-limit
            :maxlength="120"
            placeholder="每天发动态，对象找的快~"
            v-model="postData.postText"
          ></wd-textarea>

          <view :class="['media', selectType]">
            <Upload
              :type="selectType"
              :limit="selectType === 'picture' ? 9 : 1"
              :fileList="postData.postMedia"
              @update-file-list="handleUpdatePostImages"
            />
          </view>

          <view class="location">
            <wd-button
              size="small"
              icon="location"
              :loading="locationLoading"
              :class="[postData.location ? 'active' : 'inactive']"
              @click="handleCheckLocation"
            >
              {{ postData.location || '你在哪里' }}
            </wd-button>
          </view>
        </z-paging>
      </view>
    </block>

    <wd-action-sheet
      v-else
      v-model="publishActionShow"
      cancel-text="取消发布"
      :actions="publishActionPanels"
      :close-on-click-modal="false"
      @select="handleSelectAction"
      @cancel="handleBack"
    />

    <AppTabbar v-show="tabbarVisible" />
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'

import { addPost } from '@/api/post/index'
import { getLocationInfo } from '@/api/common/index'
import { setPagePadding } from '@/hooks/useSafeInset'

import Upload from '@/components/upload/index.vue'
import AppTabbar from '@/components/tabbar/index.vue'

const { pagePadding } = setPagePadding(0, 15, 0, 15)

const tabbarVisible = ref(true)

// 发帖类型
const selectType = ref('')
const publishActionShow = ref(false)
const publishActionPanels = ref([
  { name: '发布图片', index: 'picture' },
  { name: '发布视频', index: 'video' },
])

const postData = reactive({
  postText: '',
  postMedia: [],
  latitude: 0,
  longitude: 0,
  location: '',
})

// 获取定位
const locationLoading = ref(false)
const handleCheckLocation = () => {
  locationLoading.value = true
  uni.getLocation({
    type: 'wgs84',
    // type: 'gcj02',
    success: async (res) => {
      const { data }: any = await getLocationInfo({
        latitude: res.latitude,
        longitude: res.longitude,
      })

      postData.latitude = res.latitude
      postData.longitude = res.longitude
      postData.location = data.locationName

      locationLoading.value = false
    },
    fail: (err) => {
      console.error('获取位置信息失败', err)
    },
  })
}

const handleReset = () => {
  postData.postText = ''
  postData.postMedia = []

  selectType.value = ''
  tabbarVisible.value = true
  publishActionShow.value = false
}

const handleBack = () => {
  handleReset()
  uni.switchTab({ url: '/pages/connect/index' })
}

const handleUpdatePostImages = (fileList) => {
  postData.postMedia = fileList
}

// 发布
const handleSubmitPost = async () => {
  await addPost({
    location: postData.location,
    latitude: postData.latitude,
    longitude: postData.longitude,
    postText: postData.postText,
    ...(selectType.value === 'picture'
      ? { postImages: postData.postMedia.map((item) => item.url) }
      : { postVideos: postData.postMedia.map((item) => item.url) }),
  })

  uni.showToast({ title: '发布成功！', icon: 'none' })
  handleBack()
}

// 选择发布类型
const handleSelectAction = ({ item, index }) => {
  tabbarVisible.value = false
  selectType.value = item.index
}

onMounted(() => {
  uni.hideTabBar({ animation: false })
})

onShow(() => {
  publishActionShow.value = true
})
</script>

<style lang="scss" scoped>
.publish_container {
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

    .media {
      width: 100%;

      &.picture {
        .upload {
          width: 100%;
          :deep(.wd-upload) {
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            // gap: 10px;
            justify-content: flex-start;

            .wd-upload__preview {
              width: 110px;
              height: 110px;
              margin: 0;
              margin-right: 10px;
              margin-bottom: 10px;
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
      }

      &.video {
        .upload {
          display: flex;
          align-items: center;
          justify-content: center;

          :deep(.wd-upload) {
            width: 100% !important;
            height: 180px !important;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .wd-upload__evoke {
              width: 180px !important;
              height: 180px !important;
              margin-right: 0;
              border-radius: 5px;

              .wd-icon {
                width: 80px !important;
                height: 80px !important;
                font-size: 80px !important;
              }
            }

            .wd-upload__preview {
              width: 180px;
              height: 180px;

              .wd-upload__picture {
                border-radius: 5px;
              }
            }
          }
        }
      }

      // &.hideEvoke {
      //   :deep(.wd-upload__evoke) {
      //     display: none !important;
      //   }
      // }
    }

    .location {
      width: 100%;
      height: 30px;
      display: flex;
      margin-top: 20px;
      align-items: center;
      justify-content: flex-start;

      .active {
        color: rgba(253, 43, 88, 1);
        background: rgba(253, 43, 88, 0.1);
      }

      .inactive {
        background: #ffffff;
        color: rgba(147, 149, 164, 1);
        border: 1px solid rgba(147, 149, 164, 1);
      }
    }
  }

  :deep(.wd-textarea) {
    width: 100%;
    height: 200px;
    background: transparent !important;

    .wd-textarea__placeholder {
      color: rgba(147, 149, 164, 1);
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
