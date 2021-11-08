<template>
  <section class="cards-grid-container">
    <div class="card-container">
          <!-- lado izquierdo -->
        <div class="product-visual">
            <figure>
                <img src="../assets/logo.png" alt="">
            </figure>
            <div class="amount-container">
                <button>-</button>
                <p class="amount">0</p>
                <button >+</button>
            </div>
        </div>
        
            <!-- lado derecho -->
        <div class="product-info">
            <h3>Marca</h3>
            <p>Nombre de producto</p>
            <p>Precio: S/00</p>
            <p>Precio sugerido: s/00</p>
            <button>AGREGAR<img src="../assets/iconos/cart.svg" alt=""></button>
        </div>
    </div>
  </section>
</template>

<script>

export default {
    name: 'Cards',
}
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
}

.product-visual figure img {
    width: 100%;
}

.amount-container {
    display: flex;
    justify-content: space-between;
}

.amount-container button {
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    color: white;
    background-color: var(--color-primary);
    border: none;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.product-info {
   text-align: justify;
   font-family: 'Rubik', sans-serif;

}

.product-info h3 {
    font-size: 16px;
}

.product-info p {
    font-weight: 400;
    font-size: 15px;
}
.product-info button {
    width: 100%;
    height: 35px;
    border-radius: 40px;
    border: none;
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    color: white;
    background-color: var(--color-primary);
    cursor: pointer;
    font-size: 12px;
}

.product-info img {
    margin-left: 6px;
}
</style>