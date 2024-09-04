<template>
  <Calender :events="events" :clickDay="clickDay" :viewChange="viewChange" />
  <ClickButton />
  <StatisticsCard :statisticsData="statisticsData" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import dayjs from 'dayjs'

import { defaultRecord } from './constant'

import Calender from './components/Calendar/index.vue'
import ClickButton from './components/ClickButton/index.vue'
import StatisticsCard from './components/StatisticsCard/index.vue'

const events = ref([
  {
    start: '2024-09-03 10:00:00',
    end: '2024-09-03 11:00:00',
    content: '早上打卡',
    date: '2024-09-03'
  },
  {
    start: '2024-09-03 20:00:00',
    end: '2024-09-03 21:00:00',
    content: '晚上打卡',
    date: '2024-09-03'
  },
  {
    start: '2024-09-04 10:00:00',
    end: '2024-09-04 10:00:00',
    content: '早上打卡',
    date: '2024-09-04'
  },
  {
    start: '2024-09-05 10:00:00',
    end: '2024-09-05 10:00:00',
    content: '早上打卡',
    date: '2024-09-05'
  },
  {
    start: '2024-09-06 10:00:00',
    end: '2024-09-06 10:00:00',
    content: '早上打卡',
    date: '2024-09-06'
  },
  {
    start: '2024-09-07 10:00:00',
    end: '2024-09-07 10:00:00',
    content: '早上打卡',
    date: '2024-09-07'
  },
  {
    start: '2024-09-08 10:00:00',
    end: '2024-09-08 10:00:00',
    content: '早上打卡',
    date: '2024-09-08'
  },
  {
    start: '2024-09-09 10:00:00',
    end: '2024-09-09 10:00:00',
    content: '早上打卡',
    date: '2024-09-09'
  },
  {
    start: '2024-09-10 10:00:00',
    end: '2024-09-10 10:00:00',
    content: '早上打卡',
    date: '2024-09-10'
  },
  {
    start: '2024-09-11 10:00:00',
    end: '2024-09-11 10:00:00',
    content: '早上打卡',
    date: '2024-09-11'
  },
  {
    start: '2024-09-12 10:00:00',
    end: '2024-09-12 10:00:00',
    content: '早上打卡',
    date: '2024-09-12'
  }
])
const monthEvents = ref({})
const statisticsData = reactive({})

const current = dayjs()

const formatDays = (day, format = 'YYYY-MM-DD') => day?.format(format)

const viewChange = (...arg) => {
  console.log('viewChange', arg)
}

const eventArray2Object = (eventArray) => {
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

onMounted(() => {
  // 获取按照月份的对象
  monthEvents.value = eventArray2Object(events.value)

  // 初始化
  statisticsData.value = dealWithRecord(getTodayEvents(formatDays(current)))
})
</script>

<style scoped></style>
