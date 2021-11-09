<template>
    <div class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <img src="@/assets/modal/notFound.png" />
        </div>
        <div class="modal-body">
          <slot name="body">
            Revisa si ingresaste bien tu contraseña o dale clik en 'Olvidaste contraseña'
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
          <button class="accept">Entendido</button>
          </slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'ModalWrongPassword',
}
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

.modal-container {
  width: 250px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 5px 50px rgba(206, 29, 29, 0.33);
  font-family: Helvetica, Arial, sans-serif;

}

.modal-header{
  margin-top: 0;
  padding: auto;
  text-align: center;
}

.modal-body {
  margin: 20px 0;
  margin-bottom: 40px;
  font-size: 18px;

}

img {
    width: 82px;
    margin-bottom: 15px;

}

button.accept {
    background-color: #ed6755;
    border: none;
    border-radius: 5px;
    width: 200px;
    padding: 14px;
    font-size: 16px;
    color: white;
    box-shadow: 0px 6px 18px -5px rgba(238, 48, 56, 1);
  }
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}


</style>