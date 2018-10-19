import {
  get, post, patch
} from './axios'

// 获取登陆权限和刷新登陆的token
export const checkAuth = params => post(`api/auth/refresh-token`, params)

// 获取老师的信息
export const getTeacherInfo = url => get(`/api/v1/teacherinfo/`)

// 更新老师信息
export const updateTeacherInfo = (id, params) => patch(`/api/v1/teacherinfo/${id}`, params)
