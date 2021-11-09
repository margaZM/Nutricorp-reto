<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Nav />
    <SearchInput />
  </div>
</template>

<script>
import Nav from '../components/Nav';
import SearchInput from '../components/SearchInput.vue';
export default {
components:{
  Nav,
  SearchInput,
}
}
</script>

<style>

</style>
