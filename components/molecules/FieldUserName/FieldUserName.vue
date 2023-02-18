<template>
  <v-text-field
    label="ユーザー名を入力してください"
    variant="outlined"
    counter="20"
    density="compact"
    :rules="[(value) => !!value || 'ユーザー名は必須です。']"
    :model-value="modelValue"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
  ></v-text-field>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
})
</script>
