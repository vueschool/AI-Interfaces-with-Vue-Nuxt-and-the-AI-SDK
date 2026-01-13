<script setup lang="ts">
const md = `**Hello world** This is a test of the MDC parser [google](https://google.com)`
</script>

<template>
  <div class="p-10">
    <MDCCached :cache-key="md" :value="md" />
  </div>
</template>
