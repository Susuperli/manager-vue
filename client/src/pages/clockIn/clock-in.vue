<template>
  <div v-loading="loading">
    <Header v-if="isMobile" :userInfo="{ nickname: decodeURIComponent(getCookie('nickname')) }" />
    <div v-else class="description">移动端体验更佳~</div>

    <Calender :events="events" :clickDay="clickDay" :viewChange="viewChange" />
    <ClickButton :init="init" :clickDate="clickDate" @open-dialog="clickDateChange" />
    <StatisticsCard :statisticsData="statisticsData" />
    <ChangeTime :visible="changeTimeVisible" :statisticsData="statisticsData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'

import { useGet } from '@/request'
import { Header } from '@/components'
import { defaultRecord, formatDay, formatMonth, formatSeconds } from './constant'
import { calculateDiff, seconds2Hours, getCookie } from '@/utils'

import Calender from './components/Calendar/index.vue'
import ClickButton from './components/ClickButton/click-button.vue'
import StatisticsCard from './components/StatisticsCard/index.vue'
import ChangeTime from './components/ChangeTime/change-time.vue'

const current = dayjs()

const loading = ref(false)
const events = ref([])
const monthEvents = ref({})
const statisticsData = ref({})
const clickDate = ref(current)
const total = ref(0)
const dayNum = ref(0)
const isMobile = ref(false)
const changeTimeVisible = ref(false)

const formatDays = (date, format = formatDay) => date?.format(format)

// 获取事件
const getEvents = async (month = current.format(formatMonth)) => {
  const { data: eventData } = await useGet(`/clockIn/get?month=${month}`)

  events.value = eventData.value.list
  total.value = eventData.value.total
  dayNum.value = eventData.value.dayNum
}

const viewChange = (changeValue) => {
  const { view, startDate } = changeValue || {}

  if (view === 'month') {
    const targetMonth = startDate.format(formatMonth)
    init(targetMonth)
  }
}

const eventArray2Object = (eventArray = []) => {
  const obj = {}
  eventArray.forEach((event) => {
    const { date } = event

    if (obj[date]) {
      obj[date].push(event)
    } else {
      obj[date] = [event]
    }
  })

  return obj
}
const getTodayEvents = (date) => {
  return monthEvents.value[date]
}

const clickDay = (date) => {
  const dateString = formatDays(date)
  const records = getTodayEvents(dateString)
  // 改变面板数据
  statisticsData.value = dealWithRecord(records)
  clickDate.value = dayjs(dateString, formatDay)
}

const clickDateChange = () => {
  changeTimeVisible.value = true
}

// 处理记录
const dealWithRecord = (records) => {
  const start = records?.[0] ?? defaultRecord
  const end = records?.[1] ?? defaultRecord
  const duration = seconds2Hours(calculateDiff(start.start, end.start, formatSeconds, 'seconds'))

  return { start, end, duration, total: total.value, dayNum: dayNum.value }
}

const init = async (month) => {
  loading.value = true
  await getEvents(month)
  loading.value = false

  // 获取按照月份的对象
  monthEvents.value = eventArray2Object(events.value)
  // 初始化
  statisticsData.value = dealWithRecord(getTodayEvents(formatDays(current)))
}

onMounted(async () => {
  const screenWidth = window.innerWidth

  if (screenWidth < 900) {
    isMobile.value = true
  }

  init()
})
</script>

<style scoped>
.description {
  text-align: right;
}
</style>
