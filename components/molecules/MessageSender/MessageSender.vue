<template>
  <v-form :class="$style.root">
    <v-textarea
      :model-value="modelValue"
      v-bind="$attrs"
      :class="$style.root"
      @keypress.enter="handleKeypressEnter"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue', 'keydown:enter'],
  methods: {
    handleKeypressEnter(event: KeyboardEvent) {
      if (event.shiftKey) return
      event.preventDefault()
      this.$emit('keydown:enter')
    },
  },
})
</script>

<style module lang="scss">
.root {
  textarea {
    max-height: 200px;
    overflow-y: scroll;
  }
}
</style>
