<template>
  <nav>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <Nav />
  </nav>
  <router-view/>
</template>
<script>

import Nav from '@/components/Nav.vue'
import { mapActions } from "vuex";

export default {
  mounted() {
    this.authAction();
  },
  components: {
    Nav
  },
  methods: {
    // Setting so that when the page loads it looks for authAction in store/auth
    ...mapActions("auth", ["authAction"])
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
