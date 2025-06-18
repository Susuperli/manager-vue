<template>
  <div class="statistics-container">
    <div class="records-line" />
    <div>当前时间 {{ currentTime }}</div>
    <div>{{ statisticsData?.start?.content }} {{ statisticsData?.start?.start }}</div>
    <div>{{ statisticsData?.end?.content }} {{ statisticsData?.end?.start }}</div>
    <div>本日打卡时长为：{{ statisticsData?.duration }} 小时</div>
    <div class="records-line" />
    <div>本月打卡时长为：{{ formattedTime(statisticsData?.total) }}</div>
    <div>本月打卡天数为：{{ statisticsData?.dayNum }} 天</div>
    <div>
      本月平均打卡时长为：{{ formattedTime(statisticsData?.total / statisticsData?.dayNum) }}
    </div>
    <div>
      超出时间为：{{ formattedTime(statisticsData?.total - defaultTime * statisticsData?.dayNum) }}
    </div>
  </div>
</template>

<script setup>
import { toRefs, ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'

import { formattedTime } from '@/utils'
import { defaultTime } from './../../constant'

const currentTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
let rafId = null

const updateTime = () => {
  currentTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  rafId = requestAnimationFrame(updateTime)
}

onMounted(() => {
  rafId == requestAnimationFrame(updateTime)
})
onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})

const props = defineProps(['statisticsData'])

const { statisticsData } = toRefs(props)
</script>

<style scoped>
.statistics-container {
  padding: 0 16px;
  color: #000;

  .records-line {
    margin: 5px 0;
    border: 1px #000 dashed;
  }
}
</style>
