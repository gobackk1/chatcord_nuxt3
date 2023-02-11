<template>
  <div>
    <slot />
  </div>
</template>

<style>
/* NOTE: min-heightを上書きしないと、DOCSブロックのサンプルページが縦に長すぎて読み辛い */
.v-application__wrap {
  min-height: auto;
}
</style>
