<template>
  <v-text-field
    label="パスワードを入力してください"
    hint="大文字・小文字・数字を含む、8~20文字で入力してください"
    variant="outlined"
    counter="20"
    density="compact"
    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show ? 'text' : 'password'"
    :rules="rules"
    :model-value="modelValue"
    @click:append="toggleShow"
    @update:model-value="$emit('update:modelValue', $event)"
  />
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
  data() {
    return {
      show: false,
      rules: [
        (value: string) => !!value || 'パスワードは必須です。',
        (value: string) =>
          value.length >= 8 || 'パスワードは8文字以上入力してください。',
        (value: string) =>
          /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])/.test(value) ||
          'パスワードには 大文字・小文字・数字を最低でも１つずつ含めてください。',
        (value: string) =>
          /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,}$/.test(value) ||
          '無効な文字が含まれています',
      ],
    }
  },
  methods: {
    toggleShow(): void {
      this.show = !this.show
    },
  },
})
</script>
