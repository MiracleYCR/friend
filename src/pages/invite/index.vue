<template>
  <view class="invite_container" :style="{ padding: pagePadding }">
    <view class="header">
      <wd-icon
        class="back"
        name="arrow-left"
        size="18px"
        color="#ffffff"
        @click="handleBack"
      ></wd-icon>
      <view>邀请好友</view>
    </view>

    <view class="list">
      <wd-img class="w-23px h-23px mr-10px" src="/static/images/bell2.png" />
      恭喜您!您已邀请成功:99999人
      <view class="check" @click="handleGotoInviteList">
        查看全部
        <wd-icon name="arrow-right" size="15px" color="#ffffff"></wd-icon>
      </view>
    </view>

    <view class="moneyBg"></view>
    <view class="scanBg"></view>
    <view class="qr w-310px h-310px">
      <wd-img class="w-220px h-220px" src="/static/images/qr.png" />
      <view class="text">--扫码注册APP--</view>
    </view>

    <view class="btn">
      <wd-button class="btnColor w-314px" size="large" @click="handleOpenPopup">邀请好友</wd-button>
      <view class="cancelBtn" @click="handleOpenPopup">保存相册</view>
    </view>
  </view>

  <wd-popup :custom-style="customStyle" v-model="popupVisible" @after-enter="handleRenderPoster">
    <view class="posterWrapper">
      <view class="poster">
        <canvas style="width: 300px; height: 450px" canvas-id="posterCanvas" id="posterCanvas" />
      </view>

      <view class="btns">
        <wd-button type="info" @click="handleClosePopup">取消</wd-button>
        <wd-button @click="handleSavePosterToLocal">保存到本地</wd-button>
      </view>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue'
import { setPagePadding } from '@/hooks/useSafeInset'

const { pagePadding } = setPagePadding(0, 15, 20, 15)

const popupVisible = ref(false)
const customStyle = 'border-radius: 10px'

const handleBack = () => {
  uni.navigateBack()
}

const handleGotoInviteList = () => {
  uni.navigateTo({
    url: '/pages/inviteList/index',
  })
}

const handleOpenPopup = () => {
  popupVisible.value = true
}

const handleClosePopup = () => {
  popupVisible.value = false
}

const loadImages = (imageList) => {
  const tasks = imageList.map((src) => {
    return new Promise((resolve, reject) => {
      uni.getImageInfo({
        src,
        success: (res) => resolve(res),
        fail: (err) => reject(err),
      })
    })
  })
  return Promise.all(tasks)
}

const handleRenderPoster = () => {
  nextTick(() => {
    const ctx = uni.createCanvasContext('posterCanvas')

    const bgImg = '/static/images/background5.png' // 背景图
    const bg2Img = '/static/images/money.png' // 背景图
    const bg3Img = '/static/images/scanBg.png'
    const qrImg = '/static/images/qr.png' // 二维码

    loadImages([bgImg, bg2Img, bg3Img, qrImg]).then(([bg, bg2, bg3, qr]) => {
      ctx.drawImage(bg.path, 0, 0, 300, 450)
      ctx.drawImage(bg2.path, 28, -40, 250, 250)
      ctx.drawImage(bg3.path, 25, 210, 260, 40)
      ctx.drawImage(qr.path, 70, 262, 170, 170)

      ctx.setFillStyle('#ffffff')
      ctx.setFontSize(16)
      ctx.setTextAlign('center')
      ctx.setTextBaseline('middle')
      ctx.fillText('扫码注册后快来领奖品~', 160, 230)

      ctx.draw()
    })
  })
}

// 保存海报到本地
const handleSavePosterToLocal = () => {
  uni.canvasToTempFilePath(
    {
      canvasId: 'posterCanvas',
      success: (res) => {
        const tempFilePath = res.tempFilePath

        uni.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: () => {
            handleClosePopup()
            uni.showToast({ title: '已保存到相册', icon: 'none' })
          },
          fail: (err) => {
            console.log('保存失败:', err)
            handleClosePopup()
            uni.showToast({ title: '保存失败', icon: 'none' })
          },
        })
      },
      fail: (err) => {
        console.log('生成图片失败:', err)
      },
    },
    this,
  )
}
</script>

<style lang="scss" scoped>
.invite_container {
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
  background-image: url('../../static/images/background5.png');

  .header {
    z-index: 10;
    width: 100%;
    height: 45px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;

    .back {
      position: absolute;
      left: 0;
    }
  }

  .list {
    z-index: 10;
    height: 24px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 400;
    position: relative;
    color: #ffffff;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../static/images/background6.png');

    .check {
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
    }
  }

  .moneyBg {
    z-index: 5;
    width: 100%;
    height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../static/images/money.png');
  }

  .scanBg {
    z-index: 5;
    width: 100%;
    position: relative;
    margin-top: 280px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '扫码注册后快来领奖品~';
      width: 260px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-weight: 500;
      font-size: 16px;
      color: #ffffff;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../static/images/scanBg.png');
    }
  }

  .qr {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    margin: -26px auto 0;
    border: 2px solid #f17f57;
    border-radius: 10px;
    background-color: #ffffff;

    .text {
      position: absolute;
      bottom: 20px;
      font-weight: 400;
      font-size: 14px;
      color: #686a7a;
    }
  }

  .btn {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .btnColor {
      font-size: 15px;
      font-weight: 400;
      background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%) !important;
    }

    .cancelBtn {
      margin-top: 5px;
      font-size: 14px;
      color: #fd1674;
    }
  }
}

.posterWrapper {
  width: 340px;
  height: 550px;
  padding: 15px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  .poster {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btns {
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
