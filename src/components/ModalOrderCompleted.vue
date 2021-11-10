<template>
  <div :class="`modal-container-order-completed ${ isOpen ? ' ' : 'containerClose' }`">
    <div :class="`modal-content-order-completed ${ isOpen ? ' ' : 'modalClose' }`">
      <span>
        <button @click="closeModal">x</button>
      </span>
      <h3>¡Felicidades!</h3>
      <p>
        Tu pedido ha sido registrado exitosamente y será descontado en tu
        próxima planilla.
      </p>
      <button @click="closeModal" class="accept-btn">ACEPTAR</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ModalOrderCompleted",
    props: {
      isOpen: Boolean,
      closeModal: Function,
    }
  };
</script>

<style>
.modal-container-order-completed {
  position: fixed;
  min-height: 100vh;
  width: 100%;
  left: 0px;
  top: 0px;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.containerClose{
  opacity: 0;
  visibility: hidden;
}
.modal-content-order-completed {
  display: flex;
  flex-direction: column;
  padding: 24px 26px 24px 26px;
  background-color: var(--color-white);
  border-radius: 5px;
  width: 80%;
  max-width: 400px;
  animation: open 0.5s forwards;
}
.modalClose{
  animation: close 0.5s forwards;
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

/* Modal Animation*/
@keyframes open{
    0%{
        transform: scale(0);
    }
    50%{
        transform: scale(1.2);
    }
    70%{
        transform: scale(0.95);
    }
    95%{
        transform: scale(1.1);
    }
    100%{
        transform: scale(1);
    }
}

@keyframes close{
    100%{
        transform: translateY(-100vh) scale(0);
    }
    50%{
        transform: scale(1.2);
    }
    30%{
        transform: scale(0.95);
    }
    5%{
        transform: scale(1.1);
    }
    0%{
        transform: scale(1);
    }
}
</style>