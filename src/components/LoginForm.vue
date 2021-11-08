<template>
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
      <img class="logo" src="../assets/logo.png" alt="logo" />
    </div>
    <a-form-item has-feedback label="Email" name="email">
      <a-input v-model:value="formState.email" type="email" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Contraseña" name="pass">
      <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="btn-login" style="width: 100%">
        Login
      </a-button>
      <!-- <a-button style="margin-left: 10px" @click="resetForm"> Borrar </a-button> -->
    </a-form-item>
    <span>¿No te has registrado? <router-link to="/register"> Regístrate aquí </router-link></span>
  </a-form>
</template>
<script>
import {
  defineComponent,
  reactive,
  ref,
  // onBeforeMount,
} from 'vue';

import { loginUser } from '../firebase/firebaseAuth';

export default defineComponent({
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
          localStorage.setItem('iduser', user.uid);
        })
        .catch((error) => {
          const errorCode = error.code;
          switch (errorCode) {
            case 'auth/wrong-password':
            case 'auth/user-not-found':
              console.log('Usuario y/o contraseña incorrecta');
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

<style>
.form-login {
  margin-top: 4rem;
}
.btn-login {
  border-radius: 8px;
}
</style>
