<template>
  <div class="home">
    <LogIn />
    <!-- <authenticator>
      <template>
        <h1>Hello!</h1>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator> -->

    
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from '@/components/LogIn.vue';

export default {
  name: 'HomeView',
  components: {
    LogIn
    
  }
}
</script>
