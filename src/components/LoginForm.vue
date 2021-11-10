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
    class="form-login"
  >
    <div class="logo-form">
      <img class="logo" src="../assets/logoNutricorp.png" alt="logo" />
    </div>
    <a-form-item has-feedback name="email">
      <a-input
      v-model:value="formState.email"
      type="email"
      autocomplete="off"
      placeholder="Ingrese su correo electrónico"
      />
    </a-form-item>
    <a-form-item has-feedback name="pass">
      <a-input
      v-model:value="formState.pass"
      type="password"
      autocomplete="off"
      placeholder="Ingrese su contraseña"
      />
    </a-form-item>
    <span class="text-forgot-pass"> <router-link to="/forgot-password"> ¿Olvidaste tu contraseña? </router-link></span>
 <a-form-item>
      <a-button @click="showModal = true" class="buttonCompleted" type="primary" html-type="submit"  style="width: 100%" >
            Continuar
      </a-button>
    </a-form-item>
    <span>¿No te has registrado? <router-link to="/register"> Regístrate aquí </router-link></span>
  </a-form>
  <transition name="modal" appear class="modal-mask">
        <div v-if="showModal" class= "slide">
          <div class="modal-container-order-completed">
            <div class="modal-content-order-completed">
              <span><button @click="showModal = true" >x</button>
              </span>
                  <h3>¡Felicidades!</h3>
                  <p> Has iniciado sesión exitosamente </p>
              <button @click="showModal = false" class="accept-btn">Aceptar
                <router-link to="/"></router-link>
              </button>
              </div>
          </div>
        </div>
    </transition>
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  ref,
} from 'vue';

import { loginUser } from '../firebase/firebaseAuth';

export default defineComponent({
  data(){
    return{
      showModal:false
    }
  },
  setup() {
    const formRef = ref();
    const formState = reactive({
      pass: '',
      email: '',
    });

    const validateEmail = async (_rule, value) => {
      if (value === '') {
        return Promise.reject(new Error('Please input the email'));
      }
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        return Promise.reject(new Error('Please input valid email'));
      }
      return Promise.resolve();
    };

    const validatePass = async (_rule, value) => {
      if (value === '') return Promise.reject(new Error('Please input the password'));
      if (value.length < 8) return Promise.reject(new Error('Minimo 8 caracteres'));
      if (value.length > 20) return Promise.reject(new Error('Máximo 20 caracteres'));
      if (
        !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#&()–[{}\]:;',?/*~$^+=<>]).{8,20}$/.test(value)
      ) {
        return Promise.reject(
          new Error(
            'Debe contener al menos un número, un caracter especial, una letra mayúscula y minúscula',
          ),
        );
      }
      return Promise.resolve();
    };

    const rules = {
      pass: [
        {
          required: true,
          validator: validatePass,
          trigger: 'change',
        },
      ],
      email: [
        {
          required: true,
          validator: validateEmail,
          trigger: 'change',
        },
      ],
    };

    const handleFinish = (values) => {
      formRef.value.resetFields();
      loginUser(values.email, values.pass)
        .then((userCredential) => {
          const { user } = userCredential;
          localStorage.setItem('user', JSON.stringify(user));
        })
        .catch((error) => {
          const errorCode = error.code;
          switch (errorCode) {
            case 'auth/wrong-password':
            case 'auth/user-not-found':
              console.log('Usuario y/o contraseña incorrecta', error);
              break;
            case 'auth/invalid-email':
              console.log('La dirección de correo electrónico no es válida');
              break;
            case 'auth/too-many-requests':
              console.log('Muchos intentos,vuelva a intentarlo mas tarde');
              break;
            default:
              console.log('Hubo un error al intentar iniciar sesión');
          }
        });
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
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
      loginUser,
    };
  },
});
</script>

<style scoped>
.form-login {
  height: 100vh;
  margin-top: 1rem;
}
.logo-form img {
  width: 70%;
  height: 60%;
}
.btn-login {
  border-radius: 8px;
}
.ant-btn-primary {
  margin-top: .8rem;
  width: 90% !important;
  border-radius: 50px;
  height: 45px;
  font-weight: bold;
}
.ant-input {
  background: white !important;
}
/**** */
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
  display: flex;
  justify-content: center;
}
.modal-content-order-completed p {
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  font-size: 16px;
  padding:25px;
  text-align:center;
  
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

/**** */


</style>

