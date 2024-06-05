<template>
  <div class="menu-list">
    <div
      :class="['menu-item', { 'menu-item-background': matchPath(item.path) }]"
      v-for="item in menuList"
      :key="item.path"
      @click="routerClick(item.path)"
    >
      <div class="menu-item-title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const { menuList } = defineProps({ menuList: Array })

const router = useRouter()
const currentPath = ref(router.currentRoute.value.path)

const matchPath = (_path) => _path === currentPath.value

const routerClick = (_path) => {
  router.push(_path)
  currentPath.value = _path
}
</script>

<style scoped>
.menu-list {
  display: flex;
  flex-direction: column;
  padding: 10px 10px;

  .menu-item {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 10px;

    &:hover {
      color: #409eff;
    }
  }
  .menu-item-background {
    background-color: rgb(64 158 255 / 10%);
    color: #409eff;
  }
}
</style>
