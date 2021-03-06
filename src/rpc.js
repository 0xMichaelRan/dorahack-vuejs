import common from './common'
import axios from 'axios'
import router from './router'
import {Loading, Message} from 'element-ui'
import store from './store/index'

let headers = {
  'Content-Type': 'application/json; charset=utf-8',
}
let config = {
  method: 'post',
  baseURL: common.API_HOST,
  headers: headers,
  params: {}, // Url
  data: {}, // 表单
  timeout: 60000,
  // 上下流处理
  onUploadProgress: function(progressEvent) {},
  onDownloadProgress: function(progressEvent) {},
}
let timmer = null

let instance = null
let cancel = null
let CancelToken = axios.CancelToken
let loadingInstance

let request = c => {
  if (c.headers) {
    let token = sessionStorage.getItem('token')
    if (token) {
      headers.token = token
    }

    Object.assign(c.headers, headers)
  }

  let _config = {}
  let cancelConfig = {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c
    }),
  }

  Object.assign(_config, config, c, cancelConfig)

  instance = axios.create(_config)
  instance.interceptors.request.use(
    confing => {
      loadingInstance = Loading.service({
        // background: '#fff',
        fullscreen: true,
        lock: true,
        text: '',
      })

      if (_config.method == 'get') {
        _config.params = _config.data
      }

      return _config
    },
    error => {
      loadingInstance.close()
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    res => {
      if (!common.TEST_FLAG) {
        clearInterval(timmer)
        store.commit('saveCountDown', common.logoutTime)
        timmer = setInterval(() => {
          let count = (store.state.countDown -= 1)
          store.commit('saveCountDown', count)
          if (store.state.countDown === 0) {
            clearInterval(timmer)
          }
        }, 1000)
      }
      loadingInstance.close()
      if (!res.data || res.data == '') {
        return res.data
      }

      res.data = JSON.parse(res.data)

      if (res.data.code == '403') {
        sessionStorage.removeItem('token')
        router.push({name: 'logOutSuccess'})
      }else if(res.data.code == '405'){
        sessionStorage.removeItem('token')
        router.push({path: '/logOutSuccess',query: {data: 'timeout'}})
      }


      if (res.data.code !== '0') {
        Message.error(res.data.message)
      }

      return res.data
    },
    e => {
      loadingInstance.close()
      let originalRequest = e.config
      if (e.response) {
        if (e.response.status == '403') {
        }
      } else if (
        e.code == 'ECONNABORTED' &&
        e.message.indexOf('timeout') != -1 &&
        !originalRequest._retry
      ) {
        // 请求超时
      }

      return Promise.reject(e)
    }
  )

  // SetAPICancel
  let requestObj = instance.request()
  requestObj.abort = cancel
  return requestObj
}

export default {
  request,
}
