<template>
  <div class="chatting-input">
    <div class="microphone control-center">
      <el-icon>
        <Microphone class="icon" v-if="isText()" @click="changeInputType(INPUT_TYPE.VOICE)" />
        <ChatSquare class="icon" v-else @click="changeInputType(INPUT_TYPE.TEXT)" />
      </el-icon>
    </div>
    <div class="input control-center">
      <el-input
        type="textarea"
        :rows="1"
        placeholder="请输入内容"
        v-model="chattingInput"
        show-word-limit
        v-if="isText()"
      ></el-input>
      <el-button v-else class="voice-button" @click="voiceClick">按住说话</el-button>
    </div>
    <div class="send-button control-center">
      <el-button type="primary" @click="submit">发送</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Microphone, ChatSquare } from '@element-plus/icons-vue'

import { INPUT_TYPE } from './constance'

const chattingInput = ref('')
const inputType = ref(INPUT_TYPE.VOICE)

const isText = () => inputType.value === INPUT_TYPE.TEXT

const changeInputType = (type) => (inputType.value = type)
const voiceClick = () => ElMessage.info('功能暂未开发')
const submit = () => {
  /**
   * @todo 发送相关内容
   */
}
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
