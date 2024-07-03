<template>
  <div class="chatting-card-container">
    <div class="chatting-card-item" v-for="(item, index) in chattingRecords" :key="index">
      <img
        :class="['chatting-avatar', !isUser(item?.role) ? 'visibility' : 'hidden']"
        :src="item?.avatar ?? DEFAULT_BOT_AVATAR"
      />
      <div class="chatting-content">{{ item?.content }}</div>
      <img
        :class="['chatting-avatar', isUser(item?.role) ? 'visibility' : 'hidden']"
        :src="item?.avatar ?? DEFAULT_USER_AVATAR"
      />
    </div>
  </div>
</template>

<script setup>
import { ROLE } from '@/constance/index'
import { DEFAULT_USER_AVATAR, DEFAULT_BOT_AVATAR } from '@/constance'

const { chattingRecords } = defineProps({ chattingRecords: Array })

const isUser = (role) => role === ROLE.USER
</script>

<style scoped>
.chatting-card-container {
  width: 500px;
  height: 500px;

  .chatting-card-item {
    display: flex;
    gap: 10px;

    width: 100%;
    padding: 10px;

    .chatting-avatar {
      display: block;

      width: 40px;
      height: 40px;

      border-radius: 5px;
    }
    .chatting-content {
      flex: 1;

      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      padding: 2px 4px;

      font-size: 12px;
    }

    .visibility {
      visibility: visible;
    }
    .hidden {
      visibility: hidden;
    }
  }
}
</style>
