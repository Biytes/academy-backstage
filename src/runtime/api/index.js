import {
  get, post
} from './axios'

export const getTestData = (params) => get('/api/data', params)

export const postTestData = (url, params) => post('/api/data', params)
