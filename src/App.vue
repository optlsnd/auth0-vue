<template>
  <div id="app">
    <navigation></navigation>
    <h1 v-if="!isAuthenticated">You have to be logged in</h1>
    <div class="main-content" v-if="isAuthenticated">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import Navigation from '@/components/Navigation'

export default {
  name: 'app',
  computed: {
    isAuthenticated () {
      return this.$store.state.authentication.isAuthenticated
    },
    user () {
      return this.$store.state.authentication.user
    }
  },
  components: {
    'navigation': Navigation
  }
}

</script>

<style>

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-content {
  padding: 20px;
}

a, a:visited {
  color: initial;
}

</style>
