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
    @cell-click="clickDay"
    @view-change="viewChange"
  >
  </vue-cal>
</template>

<script setup>
import { toRefs } from 'vue'
import VueCal from 'vue-cal'

import 'vue-cal/dist/vuecal.css'

const props = defineProps({
  events: { type: Array },
  clickDay: { type: Function },
  viewChange: { type: Function }
})

const { events, clickDay, viewChange } = toRefs(props)
</script>

<style scoped></style>
