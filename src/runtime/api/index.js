import {
  http
} from './axios'

// 获取登陆权限和刷新登陆的token
export const checkAuth = params => http('POST', `api/auth/refresh-token`, params)

// 获取模块的数据
export const getAcademyData = (section, params) => http('GET', `/api/${section}?`, params)

// 获取单个的数据
export const editAcademyData = (section, id) => http('GET', `/api/${section}/${id}`)
// 增加模块的数据
export const addAcademyData = (section, params) => http('POST', `/api/${section}`, params)

// 更新模块的数据
export const updateAcademyData = (section, id, params) => http('PATCH', `/api/${section}/${id}`, params)

// 删除模块的数据
export const deleteAcademyData = (section, id) => http('DELETE', `/api/${section}/${id}`)
