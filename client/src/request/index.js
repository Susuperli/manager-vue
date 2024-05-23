import { createFetch } from '@vueuse/core'

const useFetch = createFetch({
  baseUrl: 'http://localhost:3030',

  options: {
    async beforeFetch({ options }) {
      // 拦截器，添加token
      const token = localStorage.getItem('access_token')
      if (token) {
        options.headers.Authorization = token ?? ''
      }
      return { options }
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
export const usePost = (url, data, options) =>
  useCommonFetch(url, { ...options, data, method: 'POST' })

export default useCommonFetch
