<template>
  <v-sheet>
    <v-toolbar class="mb-5">
      <slot name="toolbar" />
    </v-toolbar>
    <v-container>
      <v-row>
        <v-col cols="3" :class="$style.side">
          <slot name="side" />
        </v-col>
        <v-col cols="9">
          <slot name="main" />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style lang="scss" module>
.side {
  border-right: 1px solid lightgrey;
}
</style>
