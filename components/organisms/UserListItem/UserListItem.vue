<template>
  <v-list-item>
    <template #prepend>
      <mol-avatar
        :photo-url="user.photoURL"
        :display-name="user.displayName"
        size="x-large"
      />
    </template>
    {{ user.displayName }}
    <template #append>
      <slot name="list-item-actions" />
    </template>
  </v-list-item>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
})
</script>
