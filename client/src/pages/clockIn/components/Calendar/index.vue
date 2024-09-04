<template>
  <vue-cal
    class="vuecal--rounded-theme vuecal--green-theme"
    xsmall
    hide-view-selector
    locale="zh-cn"
    style="width: 100%; height: 300px"
    active-view="month"
    :disable-views="['week']"
    :events="events"
    :dblclickToNavigate="false"
    @cell-click="clickDay"
    @view-change="viewChange"
  >
  </vue-cal>
</template>

<script setup>
import VueCal from 'vue-cal'

import 'vue-cal/dist/vuecal.css'

const { events, clickDay, viewChange } = defineProps({
  events: { type: Array },
  clickDay: { type: Function },
  viewChange: { type: Function }
})
</script>

<style scoped></style>
