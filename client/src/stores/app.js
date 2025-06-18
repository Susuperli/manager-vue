import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const state = reactive({
    userInfo: {}
  })

  const setUserInfo = (userInfo) => {
    console.log(userInfo, 'useStore userInfo')
    state.userInfo = userInfo
  }

  const userInfo = computed(() => state.userInfo)

  return {
    state,
    userInfo,
    setUserInfo
  }
})
