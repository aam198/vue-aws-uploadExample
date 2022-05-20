<template>
  <div>

  </div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
  methods: {
    async logout(){
      await this.$store.dispatch("auth/logout");
      // will send to the main page
      this.$router.push("/");
    }
  },
  computed: {
    // To get the user object
    ...mapGetters({
      user: "auth/user",
    }),
  }
}
</script>

<style>

</style>