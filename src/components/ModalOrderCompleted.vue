<template>
  <transition name="modal">
  <div class="modal-container-order-completed">
    <div class="modal-content-order-completed">
      <span>
        <button>x</button>
      </span>
      <h3>¡Felicidades!</h3>
      <p>
        Tu pedido ha sido registrado exitosamente y será descontado en tu
        próxima planilla.
      </p>
      <!-- <button  @click="showModal = false" class="accept-btn">ACEPTAR</button>
      <button class="button" @click="showModal = false">Close Modal</button> -->
    </div>
  </div>
  </transition>
</template>

<script>
  export default {
    name: "ModalOrderCompleted",

  };
</script>

<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  font-family: "Roboto";
  background-color: #f5f5f5b0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.modal-container-order-completed {
  height: 300px;
  width: 300px;
  left: 0px;
  top: 0px;
  border-radius: 5px;
  border: 1px solid var(--color-primary);
  flex-direction: column;
}
.modal-content-order-completed {
  display: flex;
  flex-direction: column;
  padding: 24px 26px 24px 26px;
}
.modal-content-order-completed span {
    display: flex;
    justify-content: flex-end;
}

.modal-content-order-completed span button {
  height: 35px;
  border-radius: 40px;
  border: none;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  color: white;
  background-color: var(--color-primary);
  cursor: pointer;
  font-size: 20px;
  width: 36px;
  height: 36px;
}
.modal-content-order-completed h3 {
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  font-size: 25px;
}
.modal-content-order-completed p {
  font-weight: 500;
  font-size: 16px;
  line-height: 18, 96px;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
}
.accept-btn {
  height: 40px;
  border-radius: 40px;
  border: none;
  background-color: var(--color-primary);
  color: white;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  margin-bottom: 10px;
  cursor: pointer;
}
.accept-btn:hover {
    background-color: red;
}
</style>