<template>
  <Calender :events="events" :clickDay="clickDay" :viewChange="viewChange" />
  <ClickButton :init='init' />
  <StatisticsCard :statisticsData="statisticsData" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import dayjs from 'dayjs'

import  { useGet }  from '@/request'
import { defaultRecord } from './constant'

import Calender from './components/Calendar/index.vue'
import ClickButton from './components/ClickButton/index.vue'
import StatisticsCard from './components/StatisticsCard/index.vue'

const events = reactive([])
const monthEvents = ref({})
const statisticsData = reactive({})

const current = dayjs()

const formatDays = (day, format = 'YYYY-MM-DD') => day?.format(format)

// 获取事件
const getEvents = async () => {
  const { data: eventData } = await useGet(`/clockIn/get?month=${current.format('YYYY-MM')}`)

  events.value = eventData.value
}

const viewChange = (...arg) => {
  console.log('viewChange', arg)
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
  const records = getTodayEvents(formatDays(date))
  // 改变面板数据
  statisticsData.value = dealWithRecord(records)
}

// 处理记录
const dealWithRecord = (records) => {
  const start = records?.[0] ?? defaultRecord
  const end = records?.[1] ?? defaultRecord
  return { start, end }
}

const init = async () => {
  await getEvents()

    // 获取按照月份的对象
  monthEvents.value = eventArray2Object(events.value)
  // 初始化
  statisticsData.value = dealWithRecord(getTodayEvents(formatDays(current)))
}

onMounted(async () => {
   init()
})
</script>

<style scoped></style>
