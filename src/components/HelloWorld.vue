<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <p>点击计数</p>
    <a-button type="primary" @click="count++">count is {{ count }}</a-button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{ msg: string }>();

  const count = ref(0);
</script>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
