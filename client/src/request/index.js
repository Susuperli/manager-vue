import { createFetch } from '@vueuse/core'
import router from '@/router'
import { ElMessage } from 'element-plus'

const toastError = (msg) => {
  ElMessage({
    type: 'error',
    message: msg ?? '网络请求失败，请稍后重试~',
    duration: 1000
  })
}

const useFetch = createFetch({
  baseUrl: 'http://10.253.50.224:3030/api',

  options: {
    async beforeFetch({ options }) {
      // 请求拦截器，添加token
      const token = localStorage.getItem('access_token')
      if (token) {
        options.headers.Authorization = token ?? ''
      }
      return { options }
    },
    async afterFetch(ctx) {
      // 响应拦截
      const { data } = ctx
      const { code, msg, success } = data

      if (code !== 200 || !success) {
        toastError(msg)
      }

      return { ...ctx, data: data.data }
    },
    async onFetchError(ctx) {
      // 错误拦截
      const { response, data } = ctx

      toastError(data?.msg)

      if (response?.status === 401) {
        // 401 跳转登录页
        router.replace('/login')
      }
      return { ...ctx, data: data?.data }
    }
  },

  fetchOptions: {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }
})

const useCommonFetch = (url, options) => {
  const { data } = options

  return useFetch(url, { ...options, body: JSON.stringify(data) }).json()
}

export const useGet = (url, options) => useCommonFetch(url, { ...options, method: 'GET' })
export const usePost = async (url, data, options) =>
  useCommonFetch(url, { ...options, data, method: 'POST' })

export default useCommonFetch
