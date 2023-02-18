<template>
  <v-container class="d-flex flex-column" :class="$style.root">
    <slot />
  </v-container>
</template>

<style module lang="scss">
.root {
  height: 100%;
}
</style>
