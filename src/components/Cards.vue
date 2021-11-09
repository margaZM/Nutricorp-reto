<template>
  <section class="cards-grid-container">
    <!-- card -->
    <div class="card-container">
      <!-- lado izquierdo -->
      <div class="product-visual">
        <figure>
          <img src="../assets/logo.png" alt="" />
        </figure>
        <div class="amount-container">
          <button>-</button>
          <p class="amount">0</p>
          <button>+</button>
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
          <p>Precio: S/{{ price }}</p>
          <p>Precio sugerido: s/00</p>
          <button class="add-btn">
            AGREGAR<img src="../assets/iconos/cart.svg" alt="" />
          </button>
          <!-- Boton 'quitar' oculto -->
          <button class="remove-btn" style="display: none">
            QUITAR<img src="../assets/iconos/trash.svg" alt="" />
          </button>
        </template>
        <template v-else>
          <p>Compralo a: S/00</p>
          <p>Vendelo a: s/00</p>
          <p>Ganancia: s/00</p>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
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
          name: 'hola',
          price: 5,
          qty: 8,
        }
      }
    },
    methods: {

    }
  },
};
</script>

<style>
.cards-grid-container {
  display: grid;
  /* grid-template-columns: 200px 200px 200px; */
  grid-template-columns: repeat(auto-fit, 324px);
  grid-template-rows: 1fr;
  gap: 15px;
  justify-content: center;
}

.card-container {
  width: 324px;
  height: 214px;
  border: 1px solid var(--color-secondary);
  border-radius: 4px;
  display: flex;
  padding: 15px 21px 15px 21px;
  justify-content: space-between;
  align-items: inherit;
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
</style>