<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <v-navigation-drawer width="250" permanent>
    <slot name="side" />
  </v-navigation-drawer>
  <v-app-bar density="compact" flat border>
    <slot name="app-bar" />
  </v-app-bar>
  <v-main :class="$style.main">
    <slot name="main" />
  </v-main>
  <!-- <v-card class="flex-grow-1" height="100vh"></v-card> -->
</template>

<style module lang="scss">
.main {
  height: 100vh;
  overflow-y: scroll;
}
</style>
