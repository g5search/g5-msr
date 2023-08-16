<template>
  <b-navbar toggleable="lg" class="justify-content-between bg-primary-70 py-2" type="dark">
    <b-navbar-brand to="/" class="h1 my-0 text-white font-weight-bold text-uppercase">
      <b-img-lazy src="/g5-logo-white.png" alt="G5 Logo" height="40" class="mr-2" />
      <b-icon-journal-check scale="1.2em" class="mr-1" />
      Activity Tracker
    </b-navbar-brand>
    <div class="flex-grow-1" />
    <slot />
    <!-- <hamburger-menu v-if="!hideHamburger" /> -->
  </b-navbar>
</template>

<script>
export default {
  props: {
    hideHamburger: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.dangle-anchor {
  position: relative;
}
.approval-btn:focus  {
  outline: none;
  box-shadow: none;
}
</style>
