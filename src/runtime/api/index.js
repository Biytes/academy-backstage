import {
  get, post, patch, remove
} from './axios'

// 获取登陆权限和刷新登陆的token
export const checkAuth = params => post(`api/auth/refresh-token`, params)

// 获取老师的信息
export const getTeacherInfo = params => get(`/api/v1/teacherinfo/`, params)

// 增加老师信息
export const addTeacherInfo = params => post(`/api/v1/teacherinfo/`, params)

// 更新老师信息
export const updateTeacherInfo = (id, params) => patch(`/api/v1/teacherinfo/${id}/`, params)

// 删除老师信息
export const deleteTeacherInfo = id => remove(`/api/v1/teacherinfo/${id}/`)
