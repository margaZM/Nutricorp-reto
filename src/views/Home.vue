<template>
  <div class="home">
    <Nav :isCarrito="true" />
    <SearchInput class="input-search"/>
    <Category />
    <section class="cards-grid-container">
    <Cards
    v-for="producto of productos"
    :key="producto.id"
    :product="producto"
    :isCarrito="false"
    />
    </section>
    <AccountBalance />
  </div>
</template>

<script>
import {useStore} from 'vuex'
import { computed, onMounted } from 'vue'
import Nav from '../components/Nav';
import SearchInput from '../components/SearchInput.vue';
import Category from '../components/Category.vue';
import Cards from '../components/Cards.vue';
import AccountBalance from '../components/AccountBalance.vue';

export default {
  name: 'Home',
  components: {
    Nav,
    SearchInput,
    Category,
    Cards,
    AccountBalance,
  },
  setup(){
    const store = useStore()
    onMounted(async() => {
      store.dispatch('getProductsColl')
    })

    const productos = computed(() => store.state.productos)

    return {productos}
  }
}
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
}
.input-search {
  align-self: center;
}
.cards-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 324px);
    grid-template-rows: 1fr;
    gap: 15px;
    justify-content: center;
}
</style>
