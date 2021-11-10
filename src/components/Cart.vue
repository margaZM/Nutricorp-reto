<template>
  <div class="cart">
    <router-link to="/">
      <img class="arrow-left container-cart" src="../assets/iconos/arrow-left.png" alt="return" />
    </router-link>
    <div class="head-cart">
      <span class="available text-bold"> Saldo disponible: s/{{ creditUser.toFixed(2) }} </span>
      <div class="title-table">
        <span class="container-cart"> Cantidad </span>
        <span class="container-cart">Producto / Descripción</span>
      </div>
    </div>
    <div
      v-if="Object.keys(carrito).length === 0"
      class="body-cart container-cart"
    >
      <p> No hay productos agregados en el carrito... </p>
    </div>
    <div
    v-else
    class="container-cart">
      <Cards
        v-for="product in carrito" :key="product.id"
        :product="product"
        :isCarrito="true"
        style="border: none"
        class="card-carrito"
      />
    </div>
    <div
    :isCarrito="false"
    class="footer-cart container-cart text-bold"
    >
      <a-divider style="height: 2px; background-color: #5c5c5c" />
      <div class="footer-total">
        <span> Monto Total </span>
        <span> s/ {{ totalPrecio.toFixed(2) }} </span>
      </div>
      <div class="footer-total text-primary">
        <span> Descuento de colaborador </span>
        <span> {{ }}  </span>
      </div>
      <a-divider style="height: 1.5px; background-color: #5c5c5c" />
      <div class="footer-total">
        <span> Total a pagar </span>
        <span> s/ {{ totalPrecio.toFixed(2) }} </span>
      </div>
    </div>
    <a-button type="primary" html-type="submit">
      <router-link to="/client"> CONTINUAR </router-link>
    </a-button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Cards from '../components/Cards.vue';

export default {
  components: {
    Cards,
  },
  name: "Cart",
  setup(){
    const store = useStore();
    const carrito = computed(() => store.state.carrito);
    const totalPrecio = computed(() => store.getters.totalPrecio);
    const creditUser = computed(() => {
      return store.state.credit;
    });
    return {
      carrito,
      totalPrecio,
      creditUser,
    }
  },
}
</script>

<style>
.cart {
  font-size: 14px;
  color: var(--color-black);
  font-family: 'Rubik', sans-serif;
  text-align: center;
}
.container-cart {
  padding: .5rem 1rem;
}
.arrow-left {
  display: block;
  margin: .5rem 0 0 0;
}
.head-cart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.available {
  margin: .5rem;
}
.title-table {
  background: var(--color-primary);
  width: 100%;
  color: #FFFFFF;
  font-weight: bold;
  display: flex;
  justify-content: left;
  padding-top: .5rem;
  padding-bottom: .5rem;
}
.body-cart {
  width: 100%;
  min-height: 30vh; 
}
.footer-total {
  display: flex;
  justify-content: space-between;
}
.footer-cart {
  line-height: 2;
}
.ant-divider-horizontal {
  margin: 15px 0;
}
.text-primary {
  color: var(--color-primary)
}
.ant-btn-primary {
  width: 55%;
  border-radius: 40px;
  font-weight: bold;
}
.card-container:hover {
  border: none !important;
}
</style>
