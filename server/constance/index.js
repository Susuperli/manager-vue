const SERVER_NAME = 'manger-vue'
// session token
const TOKEN_KEY = 'token-liyongzhi'
// 跳过验证token的接口
const jumpTokenList = ['/login', '/register']
// cookie过期时间
const COOKIE_TIME = 1000 * 60 * 60 * 24 * 7
const NICKNAME = 'nickname'
const USER_ID = 'userId'
const ACCESS_TOKEN = 'access_token'
// 允许域名
const allowedOrigins = ['http://localhost:5173']

// 默认头像
const DEFAULT_AVATAR = 'https://wos.58cdn.com.cn/cDazYxWcDHJ/picasso/5a0o3tfi.png'

module.exports = {
  SERVER_NAME,
  TOKEN_KEY,
  jumpTokenList,
  COOKIE_TIME,
  allowedOrigins,
  NICKNAME,
  USER_ID,
  ACCESS_TOKEN,
  DEFAULT_AVATAR
}
