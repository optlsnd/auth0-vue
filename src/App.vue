<template>
  <div id="app">
    <navigation></navigation>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import Navigation from '@/components/Navigation'

export default {
  name: 'app',
  components: {
    'navigation': Navigation
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.main-content {
  padding: 20px;
}

a, a:visited {
  color: initial;
}

</style>
