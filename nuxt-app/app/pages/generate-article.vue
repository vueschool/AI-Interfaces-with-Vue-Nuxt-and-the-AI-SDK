<script setup lang="ts">
import { useCompletion } from '@ai-sdk/vue'

const { completion, isLoading, stop, complete } = useCompletion({
  api: '/api/completion'
})

const prompt = ref('Write an article about the benefits of using AI in the workplace.')
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">
      Generate Article
    </h1>
    <UButton :loading="isLoading" @click="complete(prompt)">
      Generate Article
    </UButton>
    <UButton v-if="isLoading" variant="outline" @click="stop()">
      Stop
    </UButton>
    <UButton v-if="!isLoading" variant="outline" @click="completion = ''">
      Clear
    </UButton>
    <div v-if="completion" class="overflow-y-auto h-full">
      <MDCCached :key="completion" :value="completion" />
    </div>
  </div>
</template>
