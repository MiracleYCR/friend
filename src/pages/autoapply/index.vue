<template>
  <view class="autoapply_container" :style="{ padding: pagePadding }">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">自动回复</view>
      <view class="manage" @click="handleManageTemplate">管理</view>
    </view>

    <view class="list">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <block v-for="(item, index) in autoApplyList" :key="index">
          <view class="card">
            <view class="cardHeader">
              <view class="flex items-center">
                <wd-img class="w-24px h-24px mr-5px" src="/static/images/hi.png" />
                <wd-text text="设为打招呼文案" size="15px" color="#191C32" />
              </view>

              <wd-switch
                v-if="!isManage"
                v-model="item.checked"
                size="small"
                active-color="#34C759"
                inactive-color="rgba(120, 120, 128, 0.16)"
                @change="(val) => handleChangeTemplateStatus(val, index)"
              />
              <wd-img
                v-else
                class="w-24px h-24px"
                src="/static/images/delete.png"
                @click="handleDeleteTemplate(index)"
              />
            </view>
            <view class="cardContent">
              <wd-textarea
                custom-class="textarea"
                v-model="item.text"
                placeholder="点击输入打招呼文案"
              />
            </view>
          </view>
        </block>
      </z-paging>
    </view>

    <view class="btnWrapper">
      <wd-button v-if="!isManage" class="addBtn" @click="handleAddTemplate">添加</wd-button>
      <wd-button v-else class="cancelBtn" @click="handleCancelManage">取消</wd-button>
    </view>

    <wd-overlay :show="dialogVisible" @click="dialogVisible = false">
      <view class="dialog_wrapper">
        <view class="block">
          <wd-img class="w-48px h-48px mt-20px" src="/static/images/bell.png" />
          <view class="text">是否删除该自动回复模板？</view>
          <view class="btns">
            <wd-button class="cancel" @click="handleCancelDelete">取消</wd-button>
            <wd-button class="confirm" @click="handleConfirmDelete">确认</wd-button>
          </view>
        </view>
      </view>
    </wd-overlay>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { setPagePadding } from '@/hooks/useSafeInset'

const { pagePadding } = setPagePadding(0, 15, 0, 15)

const isManage = ref(false)
const curDeletIndex = ref(0)
const autoApplyList = ref([])

const dialogVisible = ref<boolean>(false)

// 返回
const handleBack = () => {
  uni.navigateBack()
}

// 添加模板
const handleAddTemplate = () => {
  autoApplyList.value.push({
    text: '',
    checked: false,
  })
}

// 管理模板
const handleManageTemplate = () => {
  if (autoApplyList.value.length > 0) {
    isManage.value = true
  } else {
    uni.showToast({
      title: '请先添加自动回复模板',
      icon: 'none',
      duration: 2000,
    })
  }
}

// 修改模板状态
const handleChangeTemplateStatus = (val, index$1) => {
  autoApplyList.value.forEach((item, index$2) => {
    item.checked = val ? index$1 === index$2 : false
  })
}

// 删除模板
const handleDeleteTemplate = (index) => {
  curDeletIndex.value = index
  dialogVisible.value = true
}

// 取消删除
const handleCancelDelete = () => {
  dialogVisible.value = false
}

// 确认删除
const handleConfirmDelete = () => {
  autoApplyList.value.splice(curDeletIndex.value, 1)
}

// 取消管理
const handleCancelManage = () => {
  isManage.value = false
}
</script>

<style lang="scss" scoped>
.autoapply_container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #f3f5f6;
  display: flex;
  flex-direction: column;

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

    .manage {
      position: absolute;
      right: 0;
      font-size: 14px;
      font-weight: 400;
    }
  }

  .list {
    flex: 1;
    padding: 5px 0;
    box-sizing: border-box;

    .card {
      margin-bottom: 25px;
      border-radius: 10px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      background-color: #ffffff;

      .cardHeader {
        display: flex;
        // margin-bottom: 10px;
        align-items: center;
        justify-content: space-between;
      }

      .cardContent {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 0 0 0;

        .textarea {
          height: 60px;
          border-radius: 10px;
          background-color: #f3f5f6;

          :deep(.wd-textarea__value) {
            height: 100%;
            color: #686a7a;
            background-color: #f3f5f6;

            .wd-textarea__inner {
              height: 100%;
            }
          }
        }
      }
    }
  }

  .btnWrapper {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .addBtn {
      width: 100%;
      height: 48px;
      font-size: 15px;
      font-weight: 500;
      background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
    }

    .cancelBtn {
      width: 100%;
      height: 48px;
      font-size: 15px;
      font-weight: 500;
      color: #ffffff;
      background-color: #9395a4;
    }
  }

  .dialog_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .block {
      width: 278px;
      height: 209px;
      border-radius: 10px;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 10px 20px 10px;
      box-sizing: border-box;

      .text {
        flex: 1;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        padding: 10px 10px;
        box-sizing: border-box;
      }

      .btns {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .cancel {
          width: 100px;
          height: 40px;
          background-color: #9395a4;
        }

        .confirm {
          width: 100px;
          height: 40px;
          background-color: #fd2b58;
        }
      }
    }
  }
}
</style>
