<template>
  <div class="layout-initial text-center pa-2 pa-md-4">
    <div class="title font-weight-bold">Administration Dashboard</div>
    <div class="body-2 mb-6">Welcome, please sign in into your account</div>
    <slot></slot>
    <div class="overline mt-2">Firelayer - 1.0.0 Valiant</div>
  </div>
</template>

<style lang="scss" scoped>
.layout-initial {
  background-color: $primary;
  color: #fff;
  flex: 1 1 auto;
}
</style>
