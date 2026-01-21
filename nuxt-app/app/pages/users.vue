<script setup lang="ts">
import { experimental_useObject as useObject } from '@ai-sdk/vue'
import { z } from 'zod'

const schema = z.object({
  elements: z.array(userSchema)
})

const { object, submit: generateUsers, isLoading, stop, clear } = useObject({
  api: '/api/users/generate',
  initialValue: {
    elements: []
  } as unknown as z.infer<typeof schema>,
  schema: schema
})

const users = computed(() => {
  return (object.value?.elements || []).filter(u => u !== undefined)
})
</script>

<template>
  <div class="p-4 overflow-y-auto">
    <h1 class="text-2xl font-bold mb-4">
      Users
    </h1>
    <div class="flex gap-2">
      <UButton :loading="isLoading" @click="generateUsers('')">
        Generate Users
      </UButton>
      <UButton @click="stop()">
        Stop
      </UButton>
      <UButton @click="clear()">
        Clear
      </UButton>
    </div>
    <ul>
      <li v-for="user in users" :key="user.username">
        <pre>{{ user }}</pre>
      </li>
    </ul>
  </div>
</template>
