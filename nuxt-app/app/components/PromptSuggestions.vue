<script setup lang="ts">
import { experimental_useObject as useObject } from '@ai-sdk/vue'
import { z } from 'zod'

const input = defineModel<string>()
const selectingSuggestion = ref(false)

const schema = z.object({
  elements: z.array(z.string())
})

const { object, submit, isLoading, stop, clear } = useObject({
  api: '/api/suggestions',
  initialValue: {
    elements: []
  } as unknown as z.infer<typeof schema>,
  schema: schema
})
const suggestions = computed(() => {
  return object.value?.elements as string[]
})

watchDebounced(() => input.value, async (newVal) => {
  // If we are selecting a suggestion, don't fetch new suggestions
  if (selectingSuggestion.value) return

  // If the input is less than 2 characters, don't fetch new suggestions
  if (!newVal || newVal.length < 2) {
    clear()
    return
  }

  // If we are loading, don't fetch new suggestions
  if (isLoading.value) {
    stop()
  }

  // Fetch new suggestions whenever the user types in the textarea
  console.log('fetching new suggestions')
  await submit({ prompt: newVal })
}, { debounce: 500 })

const textareaEl = ref<HTMLTextAreaElement | null>(null)
const selectedSuggestionIndex = ref(-1)

function handleArrowDown() {
  selectedSuggestionIndex.value++
  if (selectedSuggestionIndex.value >= suggestions.value.length) {
    selectedSuggestionIndex.value = 0
  }

  afterUserChoosesIndex()
}

function handleArrowUp() {
  selectedSuggestionIndex.value--
  if (selectedSuggestionIndex.value < 0) {
    selectedSuggestionIndex.value = suggestions.value.length - 1
  }
  afterUserChoosesIndex()
}

function afterUserChoosesIndex() {
  input.value = suggestions.value[selectedSuggestionIndex.value]!
  selectingSuggestion.value = true
  setTimeout(() => {
    selectingSuggestion.value = false
  }, 1000)
}

const unwatchInput = watch(input, () => {
  const hasTextarea = initTextareaRef()
  if (hasTextarea) unwatchInput()
})

function handleTextAreasKeyboardEvents(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    handleArrowDown()
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    handleArrowUp()
  }
}

const wrapperEl = useTemplateRef('wrapperEl')
function initTextareaRef() {
  if (textareaEl.value) return true
  if (!wrapperEl.value) return false
  textareaEl.value = wrapperEl.value.querySelector(`textarea`) as HTMLTextAreaElement
  if (!textareaEl.value) return false
  textareaEl.value?.removeEventListener('keydown', handleTextAreasKeyboardEvents)
  textareaEl.value?.addEventListener('keydown', handleTextAreasKeyboardEvents)
  return true
}
</script>

<template>
  <div ref="wrapperEl" class="relative">
    <slot />
    <Transition name="suggestion-box">
      <div v-if="suggestions?.length > 0 && !isLoading" class="absolute top-full left-0 w-full bg-neutral-950 shadow rounded-md rounded-t-none z-50">
        <ul class="flex flex-col py-2">
          <li
            v-for="(suggestion, index) in suggestions"
            :key="suggestion + index"
            class=" suggestion-item py-2 px-4 cursor-pointer hover:bg-muted"
            :class="{ 'bg-muted': selectedSuggestionIndex === index }"
            :style="{ '--i': index }"
            @click="selectedSuggestionIndex = index; afterUserChoosesIndex()"
          >
            {{ suggestion }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
  }
}
.suggestion-item {
  animation: fadeIn 0.3s ease;
  animation-delay: calc(var(--i) * 100ms);
  animation-fill-mode: both;
}

.suggestion-box-enter-active,
.suggestion-box-leave-active {
  transition: all 0.3s ease;
}
.suggestion-box-enter-from,
.suggestion-box-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
