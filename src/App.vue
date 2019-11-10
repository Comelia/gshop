<template>
  <div id="app">
    <router-view></router-view>
    <footer-guide v-if="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  mounted () {
    this.$store.dispatch('getAddress')
  },
  components: {
    FooterGuide
  }
}
</script>

<style>
</style>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.app {
  color: read;
}
</style>
