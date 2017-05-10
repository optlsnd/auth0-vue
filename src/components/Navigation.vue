<template>
  <div class="navigation">
    <ul class="navigation-links">
      <li class="navigation-link"><router-link to="/">Home</router-link></li>
      <li class="navigation-link" v-if="authenticated"><router-link to="/private">Private</router-link></li>
      <li class="navigation-link"><router-link to="/public">Public</router-link></li>
    </ul>
    <div class="navigation-user">
      <span class="user-name navigation-link" v-if="authenticated">{{user.name}}</span>
      <a class="navigation-link" href="#" v-if="!authenticated" @click.prevent="login">Log in</a>
      <a class="navigation-link" href="#" v-if="authenticated" @click.prevent="logout">Log out</a>
    </div>
  </div>
</template>

<script>
  import Auth0Lock from 'auth0-lock'

  const lockOptions = {
    theme: {
      logo: '',
      primaryColor: '#000000'
    },
    languageDictionary: {
      title: 'Test app login'
    }
  }

  export default {
    name: 'navigation',
    data () {
      return {
        authenticated: false,
        secretThing: '_kYPhunoANsiBcoPcb5I6jKZ5FSp3YR3nKZsqnppPxP3-f4kzc4EHMVbfuZlt0qo',
        lock: new Auth0Lock('Y2cYqxQihLIa5CDAKCNImwBjZPzZ7GBt', 'optlsnd.auth0.com', lockOptions),
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
        this.$router.push('/')
      }
    }
  }
</script>

<style>
  .navigation {
    display: flex;
    justify-content: space-between;
    /*width: 100%;*/
    padding: 0 20px;
    background-color: #dedede;
  }
  .navigation-links {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .navigation-link {
    display: inline-block;
    margin: 15px 5px;
  }
  .navigation-link:first-child {
    margin-left: 0;
  }
</style>

