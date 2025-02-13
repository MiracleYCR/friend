/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by vite-plugin-uni-pages

interface NavigateToOptions {
  url: "/pages/asplash/index" |
       "/pages/auditbook/index" |
       "/pages/autoapply/index" |
       "/pages/baseInfo/index" |
       "/pages/bindphone/index" |
       "/pages/block/index" |
       "/pages/companyinfo/index" |
       "/pages/connect/index" |
       "/pages/connectus/index" |
       "/pages/invite/index" |
       "/pages/inviteList/index" |
       "/pages/login/index" |
       "/pages/message/index" |
       "/pages/notice/index" |
       "/pages/own/index" |
       "/pages/person/index" |
       "/pages/postDetail/index" |
       "/pages/profile/index" |
       "/pages/publish/index" |
       "/pages/realcheck/index" |
       "/pages/search/index" |
       "/pages/settings/index" |
       "/pages/square/index" |
       "/pages/suggestion/index" |
       "/pages/systemauth/index" |
       "/pages/validate/index" |
       "/pages/vip/index" |
       "/pages/wallet/index" |
       "/pages/withdraw/index";
}
interface RedirectToOptions extends NavigateToOptions {}

interface SwitchTabOptions {
  url: "/pages/connect/index" | "/pages/square/index" | "/pages/publish/index" | "/pages/message/index" | "/pages/own/index"
}

type ReLaunchOptions = NavigateToOptions | SwitchTabOptions;

declare interface Uni {
  navigateTo(options: UniNamespace.NavigateToOptions & NavigateToOptions): void;
  redirectTo(options: UniNamespace.RedirectToOptions & RedirectToOptions): void;
  switchTab(options: UniNamespace.SwitchTabOptions & SwitchTabOptions): void;
  reLaunch(options: UniNamespace.ReLaunchOptions & ReLaunchOptions): void;
}
