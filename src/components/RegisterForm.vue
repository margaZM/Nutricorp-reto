<template>
  <div class="container-form">
    <a-form
      ref="formRef"
      name="custom-validation"
      :model="formState"
      :rules="rules"
      layout="vertical"
      @finish="handleFinish"
      @validate="handleValidate"
      @finishFailed="handleFinishFailed"
      >
      <div class="logo-form">
        <img class="logo" src="../assets/logoNutricorp.png" alt="logo">
      </div>
    <a-form-item
      has-feedback name="name"
      >
    <a-input
      v-model:value="formState.name"
      type="text" autocomplete="off"
      placeholder="Ingrese su nombre completo"
    />
    </a-form-item>
    <a-form-item
    has-feedback name="email"
    >
      <a-input
      v-model:value="formState.email"
      type="email"
      autocomplete="off"
      placeholder="Ingrese su correo electrónico"
      />
    </a-form-item>
    <a-form-item
    has-feedback name="pass"
    >
      <a-input
      v-model:value="formState.pass"
      type="password"
      autocomplete="off"
      placeholder="Ingrese su contraseña"
      />
      </a-form-item>
      <a-form-item
      has-feedback name="checkPass"
      >
        <a-input
        v-model:value="formState.checkPass"
        type="password"
        autocomplete="off"
        placeholder="Confirme la contraseña ingresada"
        />
    </a-form-item>

    <a-form-item>
      <a-button style="margin-left: 10px" class="btn-reset" @click="resetForm"> Borrar Todo </a-button>
      <a-button @click="showModal = true" type="primary" html-type="submit"> Registrarse </a-button>
    </a-form-item>
    <span>¿Ya estás registrado? <router-link to="/login"> Inicia Sesión </router-link> </span>
    </a-form>

    <transition name="modal" appear class="modal-mask">
        <div v-if="showModal" class= "slide">
          <div class="modal-container-order-completed">
            <div class="modal-content-order-completed">
              <span><button @click="showModal = true" >x</button>
              </span>
              <h3>¡Bienvenido!</h3>
              <p>Te has registrado con éxito.
              </p>
              <button  @click="showModal = true" class="accept-btn">ACEPTAR</button>
            </div>
          </div>
        </div>
    </transition>
    </div>


</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { registerUser, updateProfileUser } from '../firebase/firebaseAuth';
import { addUserCollection } from '../firebase/firestore';
//import ModalRegister from '../components/ModalRegister.vue'

export default defineComponent({
  data(){
    return {
      showModal: false
    }
  },
  setup() {
    const formRef = ref();
    const formState = reactive({
      pass: '',
      checkPass: '',
      email: '',
      name: '',
    });

    const validateEmail = async (_rule, value) => {
      if (value === '') return Promise.reject(new Error('Por favor ingrese el email'));
      if (!(/^\S+@\S+\.\S+$/.test(value))) return Promise.reject(new Error('Por favor ingrese un email válido'));
      return Promise.resolve();
    };

    const validatePass = async (_rule, value) => {
      if (value === '') return Promise.reject(new Error('Ingrese contraseña'));
      if (value.length < 8) return Promise.reject(new Error('Minimo 8 caracteres'));
      if (value.length > 20) return Promise.reject(new Error('Máximo 20 caracteres'));
      if (!(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#&()–[{}\]:;',?/*~$^+=<>]).{8,20}$/.test(value))) {
        return Promise.reject(new Error('Debe contener al menos un número, un caracter especial, una letra mayúscula y minúscula'));
      }
      return Promise.resolve();
    };

    const validatePass2 = async (_rule, value) => {
      if (value === '') return Promise.reject(new Error('Confirmar contraseña'));
      if (value !== formState.pass) return Promise.reject(new Error('Las contraseñas no coinciden'));
      return Promise.resolve();
    };

    const validateName = async (_rule, value) => {
      if (value.length < 2) return Promise.reject(new Error('Por favor ingrese su nombre'));
      return Promise.resolve();
    };

    const rules = {
      pass: [{
        required: true,
        validator: validatePass,
        trigger: 'change',
      }],
      checkPass: [{
        required: true,
        validator: validatePass2,
        trigger: 'change',
      }],
      email: [{
        required: true,
        validator: validateEmail,
        trigger: 'change',
      }],
      name: [{
        required: true,
        validator: validateName,
        trigger: 'change',
      }],
    };

    const handleFinish = (values) => {
      registerUser(values.email, values.pass)
        .then((userCredential) => {
          const userCollection = {
            displayName: values.name,
            email: userCredential.user.email,
            photoURL: userCredential.user.photoURL,
            creditAvailable: 300,
            clients: [],
          };
          updateProfileUser(userCollection)
          addUserCollection('users', userCollection, userCredential.user.uid);
          localStorage.setItem('user', JSON.stringify(userCredential.user));
          console.log('usuario registrado');
          localStorage.setItem('user', JSON.stringify(userCredential.user));
          formRef.value.resetFields();
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            console.log('Este correo ya está en uso');
          } else {
            console.log('Error en registro', error);
          }
        });
    };

    const handleFinishFailed = (errors) => {
      console.log(errors, 'hubo un error');
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const handleValidate = (...args) => {
      console.log(args);
    };

    return {
      formState,
      formRef,
      rules,
      handleFinishFailed,
      handleFinish,
      resetForm,
      handleValidate,
      registerUser,
      addUserCollection,
      updateProfileUser,
    };
  },
});
</script>

<style scoped>
.logo-form img {
  width: 45%;
  height: 55%;
}
.btn-reset {
  margin-right: 1.5rem;
  font-weight: bold;
}
.ant-input {
  background: white !important;
}
.ant-btn-primary {
  font-weight: bold;
}
.modal-overlay {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 98;
 background-color: rgba(0, 0, 0, 0.3);
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 400px;
  background-color: #FFF;
  border-radius: 16px;
  padding: 25px;
  
}
.slide-enter-active,
.slide-leave-active {
 transition: transform .5s;
}
.slide-enter,
.slide-leave-to {
 transform: translateY(-50%) translateX(100vw);
}
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
  background-color: #f5f5f5d7;
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
