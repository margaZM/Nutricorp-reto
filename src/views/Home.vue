<template>
  <div class="home">
    <Nav />
    <SearchInput />
    <Category />
    <Cards />
    <AccountBalance />
  </div>
</template>

<script>
import Nav from '../components/Nav';
import SearchInput from '../components/SearchInput.vue';
import Category from '../components/Category.vue';
import Cards from '../components/Cards.vue';
import AccountBalance from '../components/AccountBalance.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    SearchInput,
    Category,
    Cards,
    AccountBalance,
  }
}
</script>
