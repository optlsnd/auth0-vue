<template>
  <div id="app">
    <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <span class="nav-item nav-link"><router-link to="/">Home</router-link></span>          
          <span class="nav-item nav-link"><router-link to="/public">Public</router-link></span>
          <span class="nav-item nav-link" v-if="authenticated"><router-link to="/private">Private</router-link></span>
          <span class="nav-item nav-link navbar-right" v-if="!authenticated" @click="login">Log in</span>                
          <span class="nav-item nav-link navbar-right" v-if="authenticated" @click="logout">Log out</span>                
        </div>
        <span class="nav-item nav-link pull-right">{{user.name}}<img class="userpic" :src="user.picture" /></span>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

import Auth0Lock from 'auth0-lock'

export default {
  name: 'app',
  data () {
    return {
      authenticated: false,
      secretThing: '_kYPhunoANsiBcoPcb5I6jKZ5FSp3YR3nKZsqnppPxP3-f4kzc4EHMVbfuZlt0qo',
      lock: new Auth0Lock('Y2cYqxQihLIa5CDAKCNImwBjZPzZ7GBt', 'optlsnd.auth0.com'),
      user: {}
    }
  },
  mounted () {
    this.authenticated = !!localStorage.getItem('id_token')
    this.user = JSON.parse(localStorage.getItem('profile'))

    this.lock.on('authenticated', (authResult) => {
      console.log('authenticated')
      localStorage.setItem('id_token', authResult.idToken)
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.error('oh shit!')
          return
        }
        // Set the token and user profile in local storage
        this.user = profile
        localStorage.setItem('profile', JSON.stringify(profile))

        this.authenticated = true
      })
    })

    this.lock.on('authorization_error', (error) => {
      console.error('auth error', error)
    })
  },
  methods: {
    login () {
      this.lock.show()
    },
    logout () {
      localStorage.removeItem('id_token')
      localStorage.removeItem('profile')
      this.authenticated = false
      this.user = {}
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  margin: 0 10px;
}

.userpic {
  border-radius: 50%;
}
</style>
