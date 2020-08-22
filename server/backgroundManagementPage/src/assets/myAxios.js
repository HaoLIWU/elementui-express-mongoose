import Axios from 'axios'
import qs from 'qs'
export function myGetAxios (url) {
  return new Promise(function (resolve) {
    // Axios.get('http://192.168.0.1/user' + url)
    Axios.get('http://127.0.0.1:3000' + url)
      .then(res => {
        resolve(res)
      })
  })
}

export function myGetParamAxios (url, param) {
  return new Promise(function (resolve) {
    // Axios.get('http://192.168.0.1/user' + url)
    Axios.get('http://127.0.0.1:3000' + url, param)
      .then(res => {
        resolve(res)
      })
  })
}

export function myPostAxios (url, param) {
  return new Promise(function (resolve) {
    Axios.post('http://127.0.0.1:3000' + url, qs.stringify(param))
    // Axios.post('/api/PHK' + url, qs.stringify(param))
      .then(res => {
        resolve(res)
      })
  })
}

export function myFormAxios (url, formData) {
  return new Promise(function (resolve) {
    // Axios.post('http://milkwu.cn/PHK' + url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    // Axios.post( 'http://47.106.200.29:8080/PHK' + url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    Axios.post('/api/PHK' + url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => {
        resolve(res)
      })
  })
}
