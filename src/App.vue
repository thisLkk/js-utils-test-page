<script setup lang="ts">
</script>
  
<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style lang='scss'>
@import './assets/css/reset.css';
.app {
  width: 750px;
  background: red;
  &-a {
    width: 100px;
    height: 40px;
    color: blue;
  }
}
</style>
