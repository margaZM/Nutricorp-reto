<template>
  <div class="home">
    <Nav />
    <SearchInput />
  </div>
</template>

<script>
import Nav from '../components/Nav';
import SearchInput from '../components/SearchInput.vue';
import querySnapshot from '../firebase/firestore';
import { ref, onMounted } from 'vue';

export default {
  name: 'Home',
  components: {
    Nav,
    SearchInput,
  },
  setup() {
    const products = ref([]);

    const getProductsColl = async () => {
    const dataProducts = await querySnapshot('productosDos');
    products.value = dataProducts.docs.map((doc) => (
     {
       brand: doc.brand,
       name: doc.name,
       price: doc.price,
       suggestedPrice: doc.suggestedPrice,
    }))
    };

    onMounted(getProductsColl);
    
    return {
      products,
      getProductsColl,
    }
  }
}
</script>
