import {
  LOADING_CONTROL,
  LOGIN_CONTROL,
  SAVE_TOKEN,
  SAVE_USER_TYPE
} from './mutations-type'

export default {

  // 控制LOADING动画
  [LOADING_CONTROL] (state) {
    state.isLoading = !state.isLoading
  },

  // 控制登陆状态
  [LOGIN_CONTROL] (state) {
    state.isLogin = !state.isLogin
  },

  // 保存Token
  [SAVE_TOKEN] (state, token) {
    state.token = token
  },

  // 保存账户类型
  [SAVE_USER_TYPE] (state, type) {
    state.type = type
  }
}
