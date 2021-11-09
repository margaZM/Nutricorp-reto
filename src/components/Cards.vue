<template>
    <!-- card -->
    <div class="card-container">
      <!-- lado izquierdo -->
      <div class="product-visual">
        <figure>
          <img :src="product.imgUrl" :alt="product.name" />
        </figure>
        <div class="amount-container">
          <button @click="disminuir(product.id)">-</button>
          <p class="amount"> {{ carrito[product.id]?.cantidad??0 }} </p>
          <button @click="aumentar(product.id)">+</button>
        </div>
      </div>

      <!-- lado derecho -->
      <div class="product-info">
        <span>
          <h3>{{ product.brand }}</h3>
          <!-- icono de check oculto -->
          <img style="display: none" src="../assets/iconos/check.svg" alt="" />
        </span>
        <p>{{ product.name }}</p>
        <p>Cantidad: S/{{ product.qty }}</p>
        <template v-if="!isCarrito">
          <p>Precio: S/{{ Number(product.price).toFixed(2) }}</p>
          <p>Precio sugerido: S/{{ Number(product.suggestedPrice).toFixed(2) }} </p>
          <button @click="comprar(product)" class="add-btn" >
            AGREGAR<img src="../assets/iconos/cart.svg" alt="" />
          </button>
          <!-- Boton 'quitar' oculto -->
          <button class="remove-btn" style="display: none">
            QUITAR<img src="../assets/iconos/trash.svg" alt="" />
          </button>
        </template>
        <template v-else>
          <div class="info-product-cart">
          <div class="rentability">
            <p>Compralo a: s/{{ Number(product.price).toFixed(2) }}</p>
            <p>Vendelo a: s/ {{ Number(product.suggestedPrice).toFixed(2) }}</p>
            <p>Ganancia: s/ {{ (Number(product.suggestedPrice)  - Number(product.price)).toFixed(2) }} </p>
          </div>
          <span class="icon-trash">
            <img src="../assets/iconos/trash.png" alt="icon-trash">
          </span>
          </div>
        </template>
      </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import {useStore} from 'vuex';
export default {
  name: "Cards",
  props: {
    isCarrito: {
      type: Boolean,
      required: true,
      default: false
    },
    product: {
      type: Object,
      required: true,
      default() {
        return {
          brand: '',
          name: 'hola',
          price: 5,
          suggestedPrice: 1,
          qty: 8,
          imgUrl: '',
          unitOfMeasure: '',
          category: '',
        }
      }
    }
  },
  setup(){
    const store = useStore();
    const carrito = computed(() => store.state.carrito)
    const comprar = producto => {
        store.dispatch('agregarCarrito', producto)
    }
    const aumentar = id => {store.commit('aumentar', id)}
    const disminuir = id => {store.commit('disminuir', id)}
    return {
      carrito,
      comprar,
      aumentar,
      disminuir,
    }
  }
};
</script>

<style>

.card-container {
  width: 324px;
  height: 214px;
  border: 1px solid var(--color-secondary);
  border-radius: 4px;
  display: flex;
  padding: 15px 21px 15px 21px;
  justify-content: space-between;
  align-items: inherit;
  position: absolute
}

.card-container:hover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.product-visual {
  width: 101px;
  height: auto;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: inherit;
}
.product-visual figure {
  width: 101px;
  height: auto;
  margin: 0 auto;
}

.product-visual figure img {
  width: 100%;
  margin-top: 10px;
}

.amount-container {
  display: flex;
  justify-content: space-between;
  /* align-items: baseline; */
  align-items: flex-end;
}

.amount-container button {
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  color: white;
  background-color: var(--color-primary);
  border: none;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.amount-container p {
  margin-bottom: 4px;
}

.product-info {
  text-align: justify;
  font-family: "Rubik", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-info span {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.product-info h3 {
  font-size: 16px;
  margin-left: 20px;
  margin-bottom: 10px;
}

.product-info p {
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 9px;
  line-height: 17px;
}
.product-info .add-btn {
  width: 100%;
  height: 35px;
  border-radius: 40px;
  border: none;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  color: white;
  background-color: var(--color-primary);
  cursor: pointer;
  font-size: 12px;
}

.product-info .remove-btn {
  width: 100%;
  height: 35px;
  border-radius: 40px;
  border: solid 1px var(--color-primary);
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  color: var(--color-primary);
  background-color: white;
  cursor: pointer;
  font-size: 12px;
}

.product-info img {
  margin-left: 6px;
}

.icon-trash img {
  position: relative;
  bottom: 100px;
  left: 95%;
  width: 16%;
}
</style>