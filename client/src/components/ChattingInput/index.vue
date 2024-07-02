<template>
  <div class="chatting-input">
    <div class="microphone control-center">
      <el-icon class="icon" :size="18" v-if="needVoice">
        <Microphone v-if="isText()" @click="changeInputType(INPUT_TYPE.VOICE)" />
        <ChatSquare v-else @click="changeInputType(INPUT_TYPE.TEXT)" />
      </el-icon>
    </div>
    <div class="input control-center">
      <el-input
        type="textarea"
        :rows="1"
        placeholder="请输入内容"
        v-model="model"
        show-word-limit
        v-if="isText()"
        :disabled="loading"
      ></el-input>
      <el-button v-else class="voice-button" @click="voiceClick">按住说话</el-button>
    </div>
    <div class="send-button control-center">
      <el-button type="primary" @click="submitClick" :loading="loading">发送</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Microphone, ChatSquare } from '@element-plus/icons-vue'

import { INPUT_TYPE } from './constance'

const { needVoice, submit } = defineProps({
  needVoice: { type: Boolean, required: true },
  submit: { type: Function, required: true },
  loading: { type: Boolean }
})
const model = defineModel({ default: '' })

const inputType = ref(INPUT_TYPE.TEXT)

const isText = () => inputType.value === INPUT_TYPE.TEXT
const changeInputType = (type) => (inputType.value = type)
const voiceClick = () => ElMessage.info('功能暂未开发')
const submitClick = () => submit?.({ type: inputType.value, content: model.value })
</script>
<style scoped>
.chatting-input {
  display: flex;
  height: 50px;
  align-items: center;
  background-color: #eaeaef;

  .control-center {
    text-align: center;
  }
  .microphone {
    width: 10%;

    .icon {
      cursor: pointer;
    }
  }
  .input {
    flex: 1;

    .voice-button {
      width: 100%;
    }
  }
  .send-button {
    width: 20%;
  }
}
</style>
