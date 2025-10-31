<template>
  <el-dialog
    v-model="visible"
    title="修改时间"
    width="90%"
    align-center
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="time-container">
      <div class="time-raw">
        <span>开始时间：</span>
        <div>
          <el-time-picker
            v-model="startTime"
            placeholder="请输入开始时间"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            @change="handleStartTimeChange"
          ></el-time-picker>
        </div>
      </div>

      <div class="time-raw">
        <span>结束时间：</span>
        <div>
          <el-time-picker
            v-model="endTime"
            placeholder="请输入结束时间"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            :disabled-hours="disabledEndHours"
            :disabled-minutes="disabledEndMinutes"
            :disabled-seconds="disabledEndSeconds"
          ></el-time-picker>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saving">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { usePost } from '@/request'
import { formatSeconds } from '../../constant'

const props = defineProps(['visible', 'statisticsData', 'clickDate'])
const emit = defineEmits(['update:visible', 'refresh'])

const visible = ref(props.visible)
const startTime = ref('')
const endTime = ref('')
const saving = ref(false)

// 解析时间字符串，提取时间部分
const extractTime = (dateTimeStr) => {
  if (!dateTimeStr || dateTimeStr === '未查询到打卡记录') return ''
  const time = dayjs(dateTimeStr, formatSeconds)
  return time.isValid() ? time.format('HH:mm:ss') : ''
}

// 初始化时间数据
const initTimeData = () => {
  const { start, end } = props.statisticsData
  startTime.value = extractTime(start?.start)
  endTime.value = extractTime(end?.end)
}

// 开始时间变化时的处理
const handleStartTimeChange = (value) => {
  // 如果结束时间早于开始时间，清空结束时间
  if (endTime.value && value && value >= endTime.value) {
    endTime.value = ''
    ElMessage.warning('结束时间必须晚于开始时间')
  }
}

// 获取开始时间的小时、分钟、秒
const startHour = computed(() => {
  if (!startTime.value) return 0
  return parseInt(startTime.value.split(':')[0])
})

const startMinute = computed(() => {
  if (!startTime.value) return 0
  return parseInt(startTime.value.split(':')[1])
})

const startSecond = computed(() => {
  if (!startTime.value) return 0
  return parseInt(startTime.value.split(':')[2])
})

// 禁用结束时间小于开始时间的选项
const disabledEndHours = () => {
  if (!startTime.value) return []
  const hours = []
  for (let i = 0; i < startHour.value; i++) {
    hours.push(i)
  }
  return hours
}

const disabledEndMinutes = (hour) => {
  if (!startTime.value || hour > startHour.value) return []
  if (hour < startHour.value) {
    const minutes = []
    for (let i = 0; i < 60; i++) {
      minutes.push(i)
    }
    return minutes
  }
  // hour === startHour.value
  const minutes = []
  for (let i = 0; i <= startMinute.value; i++) {
    minutes.push(i)
  }
  return minutes
}

const disabledEndSeconds = (hour, minute) => {
  if (!startTime.value || hour > startHour.value || (hour === startHour.value && minute > startMinute.value)) {
    return []
  }
  if (hour < startHour.value || minute < startMinute.value) {
    const seconds = []
    for (let i = 0; i < 60; i++) {
      seconds.push(i)
    }
    return seconds
  }
  // hour === startHour.value && minute === startMinute.value
  const seconds = []
  for (let i = 0; i <= startSecond.value; i++) {
    seconds.push(i)
  }
  return seconds
}

// 保存修改
const handleSave = async () => {
  if (!startTime.value) {
    ElMessage.warning('请选择开始时间')
    return
  }
  if (!endTime.value) {
    ElMessage.warning('请选择结束时间')
    return
  }
  if (startTime.value >= endTime.value) {
    ElMessage.warning('结束时间必须晚于开始时间')
    return
  }

  try {
    saving.value = true
    const dateStr = props.clickDate.format('YYYY-MM-DD')
    const newStart = `${dateStr} ${startTime.value}`
    const newEnd = `${dateStr} ${endTime.value}`

    const { start, end } = props.statisticsData
    
    await usePost('/clockIn/update', {
      date: dateStr,
      oldStart: start?.start,
      oldEnd: end?.end,
      newStart,
      newEnd
    })

    ElMessage.success('修改成功')
    emit('refresh')
    handleClose()
  } catch (error) {
    console.error('修改时间失败:', error)
  } finally {
    saving.value = false
  }
}

// 关闭弹窗
const handleClose = () => {
  visible.value = false
  emit('update:visible', false)
}

// 监听 visible 变化
watch(
  () => props.visible,
  (newValue) => {
    visible.value = newValue
    if (newValue) {
      initTimeData()
    }
  }
)

// 监听 statisticsData 变化
watch(
  () => props.statisticsData,
  () => {
    if (visible.value) {
      initTimeData()
    }
  },
  { deep: true }
)
</script>

<style scoped>
.time-container {
  padding: 20px 0;
}
.time-raw {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}
.time-raw span {
  width: 80px;
  text-align: right;
  margin-right: 10px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
