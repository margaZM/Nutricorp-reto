<template>
  <div class="home">
    <!-- <Nav />
    <SearchInput /> -->
    <Login/>
  </div>
</template>

<script>
/* import Nav from '../components/Nav';
import SearchInput from '../components/SearchInput.vue'; */
import Login from '../components/LoginForm.vue';

export default {
  name: 'Home',
  components: {
    /* Nav,
    SearchInput, */
    Login
  }
}
</script>
