<template>
  <div :isOpen="isOpen" class="modal-container-order-completed">
    <div class="modal-content-order-completed">
      <span>
        <button>x</button>
      </span>
      <h3>¡Felicidades!</h3>
      <p>
        Tu pedido ha sido registrado exitosamente y será descontado en tu
        próxima planilla.
      </p>
      <button class="accept-btn">ACEPTAR</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ModalOrderCompleted",
    props: {
      isOpen: false,
    }
  };
</script>

<style>
.modal-container-order-completed {
  height: 300px;
  width: 300px;
  left: 0px;
  top: 0px;
  border-radius: 5px;
  border: 1px solid var(--color-primary);
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
</style>