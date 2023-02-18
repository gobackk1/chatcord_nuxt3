<template>
  <div :class="$style.root">
    <div :class="$style.form">
      <slot />
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.form {
  width: 500px;
}
</style>
