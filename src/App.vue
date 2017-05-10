<template>
  <div id="app">
    <!--<nav class="navbar navbar-toggleable-md navbar-light bg-faded">
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
    </nav>-->
    <nav class="pure-menu pure-menu-horizontal">
      <div class="pure-g">
        <div class="pure-u-2-3">
          <a href="#" class="pure-menu-heading pure-menu-link">Oauth0 test app</a>
          <ul class="pure-menu-list">
              <li class="pure-menu-item"><a href="/" class="pure-menu-link">Home</a></li>
              <li class="pure-menu-item"><a href="/public" class="pure-menu-link">Public</a></li>
              <li class="pure-menu-item"><a href="/private" class="pure-menu-link" v-if="authenticated">Private</a></li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link" v-if="!authenticated" @click.prevent="login">Log in</a></li>
              <li class="pure-menu-item"><a href="#" class="pure-menu-link" v-if="authenticated" @click.prevent="logout">Log out</a></li>
          </ul>
        </div>
        <div class="pure-u-1-3 user-info" v-if="authenticated">
          <span>{{user.name}}<img class="userpic" :src="user.picture" /></span>
        </div>
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
      secretThing: 'krPnBiWLJlDRAupMl4yTfS7ppqU6JTGBUU86Abiq4qsg59T5YdrgUdAd9IdrlGu0',
      lock: new Auth0Lock('gX5Z7mAi8fzcl5T2hkHMs5zmQK1ewa0e', 'damnedweb.auth0.com'),
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

.user-info {
  padding: .5rem 0;
  text-align: right;
}

.userpic {
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
}
</style>
