<template>
  <view class="tech_container" :style="{ padding: pagePadding }">
    <view class="techFrom">
      <view class="title">
        <view class="top">梦缘婚恋</view>
        <view class="bottom">技术支持</view>
      </view>

      <view class="formItem mb-16px">
        <view class="mb-10px font-medium">标题：</view>
        <wd-input type="text" v-model="formData.title" placeholder="请输入标题" />
      </view>

      <view class="formItem mb-16px">
        <view class="mb-10px font-medium">内容：</view>
        <wd-textarea v-model="formData.remark" placeholder="请输入内容" />
      </view>

      <!-- <view class="formItem mb-16px">
        <view class="mb-10px font-medium">截图：</view>
        <Upload
          class="techImages"
          type="picture"
          :limit="9"
          :fileList="formData.images"
          @update-file-list="handleUpdatePostImages"
        />
      </view> -->

      <view class="w-100% mt-30px">
        <wd-button
          class="login_btn w-100%"
          type="error"
          size="large"
          :disabled="!submitBtnEnabled"
          @click="handleSubmit"
        >
          提交
        </wd-button>
      </view>
    </view>

    <view class="copyright">
      <view class="line">— 欢迎来到梦缘婚恋 —</view>
      <view class="line">©版权（copyright）梦缘婚恋有限公司</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { addSupport } from '@/api/tech'
// import Upload from '@/components/upload/index.vue'

const { pagePadding } = setPagePadding(20, 20, 20, 20)

const formData = reactive({
  title: '',
  remark: '',
  // images: [],
})

const submitBtnEnabled = computed(() => {
  return formData.title && formData.remark
})

// const handleUpdatePostImages = (fileList) => {
//   console.log(fileList)
//   formData.images = fileList
// }

const resetFormData = () => {
  formData.title = ''
  formData.remark = ''
}

const handleSubmit = async () => {
  try {
    await addSupport({ ...formData })

    uni.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000,
    })

    resetFormData()
  } catch (err) {
    resetFormData()
  }
}
</script>

<style lang="scss" scoped>
.tech_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../static/images/background4.png');

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .techFrom {
    z-index: 10;
    width: 100%;
    max-width: 500px;
    height: 100%;
    color: #000000;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    .title {
      height: 100px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      .top {
        line-height: 50px;
        font-size: 20px;
        font-weight: bold;
      }

      .bottom {
        font-size: 15px;
        font-weight: bold;
        color: #666666;
      }
    }

    .formItem {
      width: 100%;
      display: flex;
      flex-direction: column;

      :deep(.wd-input) {
        height: 45px;
        padding: 0 10px;
        border-radius: 10px;
        box-sizing: border-box;
        background: #fbfbfb !important;

        .wd-input__body {
          height: 100%;

          .wd-input__value {
            height: 100%;
          }
        }

        &::after {
          display: none;
        }
      }

      :deep(.wd-textarea) {
        border-radius: 10px;
        background: #fbfbfb !important;
      }

      :deep(.techImages) {
        .wd-upload__evoke {
          width: 80px;
          height: 80px;
          background-color: #fbfbfb;
        }
      }
    }

    .login_btn {
      background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
    }
  }

  .copyright {
    height: 55px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: env(safe-area-inset-bottom);
    font-weight: 400;
    font-size: 12px;
    color: #999999;
    line-height: 25px;
  }
}
</style>
