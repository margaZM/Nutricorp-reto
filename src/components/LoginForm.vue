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
      <a-button type="primary" html-type="submit" class="btn-login" style="width: 100%">
        <router-link to="/shopping"> Ingresar </router-link>
      </a-button>
    </a-form-item>
    <span>¿No te has registrado? <router-link to="/register"> Regístrate aquí </router-link></span>
  </a-form>
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

<style scoped>
.form-login {
  height: 100vh;
  margin-top: 2rem;
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
}
.ant-input {
  background: white !important;
}

</style>

