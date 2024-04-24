/**
 * 判断是否为外部资源
 * @param {*} path
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 * 密码验证规则
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('password must be at least 6 characters long'))
    } else {
      callback()
    }
  }
}
