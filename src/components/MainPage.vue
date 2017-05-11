<template>
  <div class="main-page">
    <h1>Welcome {{ user.given_name + ' ' + user.family_name}}{{ user }}</h1>
    <img :src="user.picture" />
    <button @click="getUserInfo">Get user info</button>
    <div>{{ userInfo }}</div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'MainPage',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    user () {
      return this.$store.state.authentication.user
    },
    userId () {
      return this.user.identities[0].user_id
    }
  },
  methods: {
    getUserInfo () {
      const url = `https://api.vk.com/method/users.get?user_ids=${this.userId}`
      axios.get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(res => { this.userInfo = res })
        .catch(err => { console.log(err) })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
