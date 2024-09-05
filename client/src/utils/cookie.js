export function setCookie(name, value, days) {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // 设置过期时间
  const expires = `expires=${date.toUTCString()}` // 格式化为 UTC 字符串
  document.cookie = `${name}=${value};${expires};path=/` // 设置 cookie
}

export function getCookie(name) {
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    cookie = cookie.trim() // 移除前后空格
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1) // 返回 cookie 值
    }
  }
  return null
}

export function deleteCookie(name) {
  setCookie(name, '', -1) // 将过期时间设置为过去的时间以删除 cookie
}
