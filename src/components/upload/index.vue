<template>
  <view class="upload">
    <wd-upload
      multiple
      :file-list="fileList"
      :upload-method="customUpload"
      @change="handleChange"
    ></wd-upload>
  </view>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

interface Props {
  fileList: any[]
}

const props = defineProps<Props>()

const handleChange = ({ fileList }) => {
  fileList.value = fileList
}

const customUpload = (file, formData, options) => {
  console.log(file, formData, options)

  const uploadTask = uni.uploadFile({
    url: '/prod-api/common/oss/upload',
    header: options.header,
    name: options.name,
    fileName: options.name,
    fileType: options.fileType,
    formData,
    filePath: file.url,
    success(res) {
      if (res.statusCode === options.statusCode) {
        // 设置上传成功
        options.onSuccess(res, file, formData)
      } else {
        // 设置上传失败
        options.onError({ ...res, errMsg: res.errMsg || '' }, file, formData)
      }
    },
    fail(err) {
      // 设置上传失败
      options.onError(err, file, formData)
    },
  })
  // 设置当前文件加载的百分比
  uploadTask.onProgressUpdate((res) => {
    options.onProgress(res, file)
  })
}
</script>

<style lang="scss" scoped>
.upload {
  :deep(.wd-upload__evoke) {
    width: 60px;
    height: 60px;
    margin-bottom: 0;
    margin-right: 10px;
    border-radius: 5px;
  }

  :deep(.wd-upload) {
    margin: 10px 0 10px 4px;

    .wd-upload__preview {
      width: 60px;
      height: 60px;

      .wd-upload__picture {
        border-radius: 5px;
      }
    }
  }
}
</style>
