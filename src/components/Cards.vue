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
        <p class="amount">{{ carrito[product.id]?.cantidad ?? 0 }}</p>
        <button @click="comprar(product)">+</button>
      </div>
    </div>

    <!-- lado derecho -->
    <div class="product-info">
      <span>
        <h3>{{ product.brand }}</h3>
        <!-- icono de check oculto -->
        <img
          v-if="!isCarrito && carrito[product.id] && carrito[product.id]?.cantidad !== 0"
          class="iconGreen"
          src="../assets/iconos/check.svg"
          alt="icon-check"
        />
      </span>
      <p>{{ product.name }}</p>
      <p>Cantidad: s/{{ product.qty }}</p>
      <template v-if="!isCarrito">
        <p>Precio: s/{{ Number(product.price).toFixed(2) }}</p>
        <p>
          Precio sugerido: s/{{ Number(product.suggestedPrice).toFixed(2) }}
        </p>
        <button
          v-if="!carrito[product.id] || carrito[product.id]?.cantidad === 0"
          @click="comprar(product)"
          class="add-btn"
        >
          AGREGAR<img src="../assets/iconos/cart.svg" alt="icon-cart" />
        </button>
        <!-- Boton 'quitar' oculto -->
        <button v-else class="remove-btn" @click="deleteProduct(product.id)">
          QUITAR<img src="../assets/iconos/trash.svg" alt="icon-trash" />
        </button>
      </template>
      <template v-else>
        <div class="info-product-cart">
          <div class="rentability">
            <p>Compralo a: s/{{ Number(product.price).toFixed(2) }}</p>
            <p>Vendelo a: s/ {{ Number(product.suggestedPrice).toFixed(2) }}</p>
            <p>
              Ganancia: s/
              {{
                (
                  Number(product.suggestedPrice) - Number(product.price)
                ).toFixed(2)
              }}
            </p>
          </div>
          <button class="icon-trash" @click="deleteProduct(product.id)">
            <img src="../assets/iconos/trash.svg" alt="icon-trash" />
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Cards",
  props: {
    isCarrito: {
      type: Boolean,
      required: true,
      default: false,
    },
    product: {
      type: Object,
      required: true,
      default() {
        return {
          brand: "",
          name: "hola",
          price: 5,
          suggestedPrice: 1,
          qty: 8,
          imgUrl: "",
          unitOfMeasure: "",
          category: "",
        };
      },
    },
  },
  setup() {
    const store = useStore();
    const carrito = computed(() => store.state.carrito);
    const comprar = (producto) => {
      store.dispatch("agregarCarrito", producto);
    };
    const disminuir = (id) => {
      store.commit("disminuir", id);
    };
    const deleteProduct = (id) => {
      store.commit("deleteProduct", id);
    };
    return {
      carrito,
      comprar,
      disminuir,
      deleteProduct,
    };
  },
};
</script>

<style>
.card-container {
  display: flex;
  position: relative;
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--color-gray-disable);
  border-radius: 10px;
  max-height: 400px;
}
.card-container:hover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.product-visual {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product-visual figure {
  align-self: center;
  display: flex;
  flex: 1;
  align-items: center;
}
.product-visual figure img {
  max-width: 100px;
  max-height: 150px;
}
.amount-container {
  display: flex;
  justify-content: space-between;
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
  font-family: "Rubik", sans-serif;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1rem;
}
.product-info span {
  text-align: center;
}
.product-info h3 {
  font-size: 16px;
}
.product-info p {
  font-weight: 400;
  margin-bottom: 9px;
  line-height: 17px;
  margin-top: 0;
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
.icon-trash {
  background-color: transparent;
  border: none;
}
.icon-trash {
  position: relative;
  bottom: 100px;
  left: 95%;
  cursor: pointer;
}
.iconGreen {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>