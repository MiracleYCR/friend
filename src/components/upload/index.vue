<template>
  <view :class="['upload', showEvoke ? 'showEvoke' : 'hideEvoke']">
    <wd-upload
      v-if="type === 'picture'"
      image-mode="aspectFill"
      :multiple="true"
      :limit="limit"
      :file-list="fileList"
      :upload-method="customUpload"
      :before-upload="handleBeforeUpload"
      @change="handleChange"
    ></wd-upload>

    <wd-upload
      v-if="type === 'video'"
      accept="video"
      :limit="1"
      :file-list="fileList"
      :upload-method="customUpload"
      :before-upload="handleBeforeUpload"
      @change="handleChange"
    ></wd-upload>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'picture',
  },

  limit: {
    type: Number,
  },

  fileList: {
    type: Array<any>,
    default: () => [],
  },
})

const emits = defineEmits(['before-upload-file', 'update-file-list'])

const showEvoke = ref(true)

const handleBeforeUpload = ({ files, resolve }) => {
  emits('before-upload-file', files)
  resolve(true)
}

const customUpload = (file, formData, options) => {
  try {
    const uploadTask = uni.uploadFile({
      url: '/prod-api/common/oss/upload',
      header: options.header,
      name: options.name,
      fileName: options.name,
      fileType: options.fileType,
      formData,
      timeout: 20000,
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
  } catch (err) {}
}

const handleChange = ({ fileList }) => {
  const completed = fileList.every((file) => file.status === 'success')

  // 显隐上传按钮
  showEvoke.value = props.limit ? fileList.length < props.limit : true

  if (completed) {
    emits(
      'update-file-list',
      fileList.map((item) => {
        if (item.response) {
          const _data = JSON.parse(item.response)
          return { url: _data.msg }
        } else {
          return { url: item.url }
        }
      }),
    )
  }
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

  &.hideEvoke {
    :deep(.wd-upload__evoke) {
      display: none !important;
    }
  }
}
</style>
