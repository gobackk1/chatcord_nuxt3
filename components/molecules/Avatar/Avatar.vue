<template>
  <v-avatar v-bind="$attrs">
    <atom-img v-if="photoUrl" :src="photoUrl" :alt="altText" />
    <template v-else
      ><v-icon size="x-large" :class="$style.icon"
        >mdi-account-circle</v-icon
      ></template
    >
  </v-avatar>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AtomImg from '@/components/atoms/Img/Img.vue'

export default defineComponent({
  name: 'AppAvatar',
  components: { AtomImg },
  props: {
    photoUrl: {
      type: String as PropType<string | null | undefined>,
      required: true,
    },
    displayName: {
      type: String as PropType<string | null | undefined>,
      required: true,
    },
  },
  computed: {
    altText(): string {
      return `${this.displayName}のアバター画像`
    },
  },
})
</script>

<style module scss>
.icon {
  transform: scale(1.5);
}
</style>
