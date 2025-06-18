<template>
  <el-dialog
    v-model="visible"
    title="修改时间"
    width="90%"
    align-center
    :close-on-click-modal="false"
  >
    <template #footer>
      <div class="time-container">
        <div class="time-raw">
          <span>开始时间：</span>
          <div>
            <el-time-picker
              v-model="startTime"
              placeholder="请输入开始时间"
              @change="startTimeChange"
            ></el-time-picker>
          </div>
        </div>

        <div class="time-raw">
          <span>结束时间：</span>
          <div>
            <el-time-picker
              key="endTime"
              v-model="endTime"
              placeholder="请输入结束时间"
            ></el-time-picker>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['visible', 'statisticsData'])
const emit = defineEmits(['update:visible'])
const { statisticsData } = props
const visible = ref(props.visible)

const startTime = ref(statisticsData?.start?.start ?? '')
const endTime = ref(statisticsData.end?.end ?? '')

const startTimeChange = (startTime) => {
  console.log(startTime, 'startTime')
}

watch(
  () => props.visible,
  (newValue) => {
    visible.value = newValue
  }
)
</script>

<style scoped>
.time-container {
  padding-bottom: 10px;
}
.time-raw {
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 10px 0;
}
</style>
