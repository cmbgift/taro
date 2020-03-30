import { shouleBeObject } from '../utils'
import { request } from '../request'

function login (options) {
  // options must be an Object
  const isObject = shouleBeObject(options)
  if (!isObject.res) {
    const res = { errMsg: `login${isObject.msg}` }
    console.error(res.errMsg)
    return Promise.reject(res)
  }

  const { url, success, fail } = options
  const res = { errMsg: 'login:ok' }

  request({
    url,
    method: 'GET',
    header: {'content-type': 'application/json'}
  }).then(res => {
    typeof success === 'function' && success(res)
  }).catch(err => {
    typeof fail === 'function' && fail(err)
  })

  return Promise.resolve(res)
}

export {
  login
}
