<template>
  <v-text-field
    label="メールアドレスを入力して下さい。"
    hint="example@mail.com"
    :counter="MAX_LENGTH"
    :rules="rules"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts">
// import { defineComponent } from 'vue'
import { EMAIL } from '~/utils/config/config'

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
      rules: [
        (value: string) => !!value || 'メールアドレスは必須です。',
        (value: string) => {
          // 以下を参考に実装
          // https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)
          const pattern =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          return pattern.test(value) || '無効なメールアドレスです。'
        },
        (value: string) =>
          value.length <= EMAIL.MAX_LENGTH ||
          'メールアドレスは30文字以内で入力してください。',
      ],
      MAX_LENGTH: EMAIL.MAX_LENGTH,
    }
  },
})
</script>
