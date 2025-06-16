const SERVER_NAME = 'manger-vue'
// session token
const TOKEN_KEY = 'token-liyongzhi'
// 跳过验证token的接口
const jumpTokenList = ['/login', '/register', '/file/upload']
// cookie过期时间
const COOKIE_TIME = 1000 * 60 * 60 * 24 * 7
const NICKNAME = 'nickname'
const USER_ID = 'userId'
const ACCESS_TOKEN = 'access_token'
// 允许域名
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://10.253.50.224:5173',
  'http://10.253.50.224:3030',
  'http://10.253.50.224:5177',
  'http://localhost:5177'
]

// 默认头像
const DEFAULT_AVATAR = 'https://wos.58cdn.com.cn/cDazYxWcDHJ/picasso/5a0o3tfi.png'

// ai key
const OPEN_AI_API_KEY = 'sk-jCMLdQTESAOpbGTKBkAbIaMtfcrLq0NJa2AhqjJA5SWONWZV'
const ROLE = { SYSTEM: 'system', USER: 'user' }
const DEFAULT_USER_AVATAR = 'https://wos.58cdn.com.cn/cDazYxWcDHJ/picasso/5a0o3tfi.png'
const DEFAULT_BOT_AVATAR =
  'https://lh3.googleusercontent.com/a/ACg8ocJu0FZu4dVCK1gD56MEe17IPUy_kcjUKwXDc7e00J_O=s96-c'

module.exports = {
  SERVER_NAME,
  TOKEN_KEY,
  jumpTokenList,
  COOKIE_TIME,
  allowedOrigins,
  NICKNAME,
  USER_ID,
  ACCESS_TOKEN,
  DEFAULT_AVATAR,

  OPEN_AI_API_KEY,
  ROLE,
  DEFAULT_USER_AVATAR,
  DEFAULT_BOT_AVATAR
}
