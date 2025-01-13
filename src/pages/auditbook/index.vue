<template>
  <view class="auditbook_container">
    <view class="body">
      <z-paging
        class="list_scroll"
        :fixed="false"
        :scroll-y="true"
        :scroll-view="true"
        :show-scrollbar="false"
      >
        <wd-text
          class="mb-20px"
          size="14px"
          text="1、根据《互联网直播服务管理规定》《移动互联网应用程序信息服务管理规定》的相关要求，为了提高用户推荐时信息的真实性，保障您或其他用户的安全，或维护功能/服务的安全稳定，需要您提供真实身份信息（真实姓名、身份证件号码、个人生物识别信息）以完成实名认证。现经您主动申请并授权同意，我们将通过第三方服务商提供实名认证验证服务。因个人姓名、身份证号码及个人生物识别信息为个人敏感信息，根据相关法律法规要求，请您仔细阅读以下授权书内容，勾选“我已阅读并同意”完成授权，我们会对信息严格保密，信息将会存储至本账号不再正常使用；"
          color="#686A7A"
        ></wd-text>

        <wd-text
          class="mb-20px"
          size="14px"
          text="2、用户本人主动向平台提供本人个人信息申请实名验证的，须保证提供的为用户本人真实合法有效的身份信息，禁止以任何形式买卖、伪造、篡改、盗用个人信息，请您严肃交友，诚信参与；"
          color="#686A7A"
        ></wd-text>

        <wd-text size="14px" text="3、客服电话：**************。" color="#686A7A"></wd-text>
      </z-paging>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.auditbook_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #f3f5f6;
  padding: env(safe-area-inset-top) 15px 0 15px;

  .body {
    flex: 1;
    padding: 15px 0 0 0;
    box-sizing: border-box;

    .list_scroll {
      :deep(.zp-paging-container-content) {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
