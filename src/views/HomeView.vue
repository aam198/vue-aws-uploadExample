<template>
  <div class="home">

    <authenticator>
      <template>
        <h1>Hello!</h1>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>

    
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {

  }
}
</script>
