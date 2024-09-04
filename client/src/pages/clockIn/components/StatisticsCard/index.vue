<template>
  <div class="statistics-container">
    <div class="records-line">=====记录=====</div>
    <div>{{ statisticsData.value?.start.content }} {{ statisticsData.value?.start.start }}</div>
    <div>{{ statisticsData.value?.end.content }} {{ statisticsData.value?.end.start }}</div>
  </div>
</template>

<script setup>
const { statisticsData } = defineProps(['statisticsData'])
</script>

<style scoped>
.statistics-container {
  padding: 0 16px;
  .records-line {
    margin: 0 auto;
    text-align: center;
  }
}
</style>
