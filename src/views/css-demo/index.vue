<script setup lang="ts">

</script>

<template>
  <div class="demo">
    <div class="has">
      <span>:has 属性</span>
    </div>
    <!-- 算一个 -->
    <div class="form">
      <input type="checkbox">
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.has:has(span) {
  color: red;
}
.form {
  input[type="checkbox"] {
    accent-color: hotpink;
  }
}
</style>
