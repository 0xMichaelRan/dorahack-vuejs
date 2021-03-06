import rpc from '../rpc'
import _public from './public'
import upload from './upload'

// 注册api
let modules = {
    _public,
    upload,
}

let api = {}

for (let key in modules) {
    let module = modules[key]
    for (let item in module) {
        // 重新克隆一份避免更改modules中的源值
        let config = Object.assign({},module[item])
        let url = config.url
        if (!url) {
            console.error('url cant be null!')
            continue
        }
        api[item] = (data, headers, params, c) => {
            config.method = config.method ? config.method : 'post'
            config.data = data || {}
            config.headers = headers || {}
            config.params = params || {}
            if (c) {
                Object.assign(config, c)
            }
            return rpc.request(config)
        }
    }
}
export default api
