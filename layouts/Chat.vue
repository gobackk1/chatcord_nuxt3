<template>
  <v-navigation-drawer
    permanent
    disable-resize-watcher
    disable-route-watcher
    :rail="true"
    :rail-width="70"
    class="overflow-visible"
    :absolute="false"
  >
    <slot name="side" />
  </v-navigation-drawer>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <slot name="main" />
</template>
