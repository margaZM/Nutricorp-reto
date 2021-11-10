<template>
  <div class="home">
    <Nav :isCarrito="false" />
    <Cart />
  </div>
</template>

<script>
import Nav from "../components/Nav";
import Cart from "../components/Cart.vue";

export default {
  name: "Home",
  components: {
    Nav,
    Cart,
  },
};
</script>