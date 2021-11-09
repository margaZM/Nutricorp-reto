<template>
  <div class="cart">
    <router-link to="/"> 
      <img class="arrow-left container-cart" src="../assets/iconos/arrow-left.png" alt="" />
    </router-link>
    <div class="head-cart">
      <span class="available text-bold"> Saldo disponible: s/50.00 </span>
      <div class="title-table">
        <span class="container-cart"> Cantidad </span>
        <span class="container-cart">Producto / Descripción</span>
      </div>
    </div>
    <div class="body-cart container-cart"></div>
    <div class="footer-cart container-cart text-bold">
      <a-divider style="height: 2px; background-color: #5c5c5c" />
      <div class="footer-total">
        <span> Monto Total </span>
        <span> Cantidad </span>
      </div>
      <div class="footer-total text-primary">
        <span> Descuento de colaborador </span>
        <span> Cantidad </span>
      </div>
      <a-divider style="height: 1.5px; background-color: #5c5c5c" />
      <div class="footer-total">
        <span> Total a pagar </span>
        <span> Cantidad </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.cart {
  font-size: 14px;
  color: var(--color-black);
  font-family: 'Rubik', sans-serif; 
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
  min-height: 40vh; 
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
</style>
