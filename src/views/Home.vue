<template>
  <div class="home">
    <Nav />
    <SearchInput />
  </div>
</template>

<script>
import Nav from '../components/Nav';
import SearchInput from '../components/SearchInput.vue';

export default {
  name: 'Home',
  components: {
    Nav,
    SearchInput,
  }
}
</script>
