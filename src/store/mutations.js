import {
  LOADING_CONTROL,
  LOGIN,
  SAVE_USER_INFO,
  LOGOUT,
  SHOW_IMAGE_PAGE,
  HIDE_IMAGE_PAGE
} from './mutations-type'

export default {

  // 控制LOADING动画
  [LOADING_CONTROL] (state) {
    state.isLoading = !state.isLoading
  },

  // 控制登陆状态
  [LOGIN] (state) {
    state.isLogin = true
  },

  // 保存用户信息Token
  [SAVE_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },

  // 登出 logout 清除状态
  [LOGOUT] (state) {
    state.isLogin = false
    state.userInfo = {
      token: '',
      type: '0'
    }
  },

  // 切换图片
  [SHOW_IMAGE_PAGE] (state, image) {
    state.showImage.currentImg = image
    state.showImage.imagePage = true
  },

  // 关闭显示图片页面
  [HIDE_IMAGE_PAGE] (state) {
    state.showImage.imagePage = false
  }
}
