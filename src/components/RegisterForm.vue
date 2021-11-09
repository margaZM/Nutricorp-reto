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
      <a-button type="primary" html-type="submit"> Registrarse </a-button>
    </a-form-item>
    <span>¿Ya estás registrado? <router-link to="/"> Inicia Sesión </router-link> </span>
  </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import { registerUser, updateProfileUser } from '../firebase/firebaseAuth';
import { addUserCollection } from '../firebase/firestore';

export default defineComponent({
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
          };
          updateProfileUser(userCollection)
          addUserCollection('users', userCollection, userCredential.user.uid);
          console.log('usuario registrado');
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
}
.ant-input {
  background: white !important;
}
</style>
