<template>
  <div class="img-container">
    <img
      src="https://j1.58cdn.com.cn/jinrong/images/ems17237890474912c3ca57053252.png"
      alt="图片展示"
      class="img"
    />

    <div class="shadow" />
  </div>
</template>
<script setup></script>
<style scoped>
.img-container {
  position: relative;

  width: 400px;
  height: 600px;

  background: rgb(0, 255, 127);

  .img {
    width: 400px;
    height: auto;
  }

  .shadow {
    position: absolute;
    bottom: 100px;

    width: 400px;
    height: 200px;

    background: linear-gradient(transparent, rgba(255, 255, 255, 0.1), transparent);
  }
}
</style>
