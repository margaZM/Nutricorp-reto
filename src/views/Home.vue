<template>
  <div class="home">
    <Nav />
    <SearchInput />
    <Category />
    <section class="cards-grid-container">
    <Cards  v-for="product in products" :key="product" :product="product"/>
    </section>
    <AccountBalance />
  </div>
</template>

<script>
import Nav from '../components/Nav';
import SearchInput from '../components/SearchInput.vue';
// import querySnapshot from '../firebase/firestore';
import { ref, onMounted } from 'vue';
import Category from '../components/Category.vue';
import Cards from '../components/Cards.vue';
import AccountBalance from '../components/AccountBalance.vue';
import { db } from '../firebase/firebaseConfig';
import {getDocs, collection } from 'firebase/firestore';

export default {
  name: 'Home',
  components: {
    Nav,
    SearchInput,
    Category,
    Cards,
    AccountBalance,
  },
 setup() {
    const products = ref([]);
    const  getProductsColl = async() => {
      const dataProducts = await getDocs(collection(db, 'productosDos'))
      console.log(dataProducts)
      products.value = dataProducts.docs.map((doc) => (
      {
        id: doc.id,
        brand: doc.data().brand,
        name: doc.data().name,
        price: doc.data().price,
        suggestedPrice: doc.data().suggestedPrice,
      }))
      console.log(products)
    };

    onMounted(getProductsColl);
    
    return {
      products,
      getProductsColl,
    }
  }
}
</script>

<style>
.cards-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 324px);
    grid-template-rows: 1fr;
    gap: 15px;
    justify-content: center;
}
</style>