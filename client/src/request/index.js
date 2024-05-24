import { createFetch } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const useFetch = createFetch({
  baseUrl: 'http://localhost:3030',

  options: {
    async beforeFetch({ options }) {
      // 请求拦截器，添加token
      const token = localStorage.getItem('access_token')
      if (token) {
        options.headers.Authorization = token ?? ''
      }
      return { options }
    },
    afterFetch: async (ctx) => {
      // 响应拦截
      const { data, response } = ctx
      const { code, msg } = data

      const router = useRouter()

      if (code !== 200) {
        ElMessage({
          type: 'error',
          message: msg ?? '网络请求失败，请稍后重试~',
          duration: 1000
        })
      }

      if (response.status === 401) {
        // 401 跳转登录页
        router.push('/login')
      }
      return { ...ctx, data: data.data }
    }
  },

  fetchOptions: {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
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
