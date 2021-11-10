<template>
<div>
  <form class="clientForm" @submit.prevent="onSubmit">
    <div class="inline-evenly">
      <label class="radioForm"
        >Para mí
        <input type="radio" value="me" checked="checked" name="client" v-model="formState.client"/>
        <span class="checkmark"></span>
      </label>
      <label class="radioForm"
        >Otro cliente
        <input type="radio" value="other" name="client" v-model="formState.client"/>
        <span class="checkmark"></span>
      </label>
    </div>
    <label class="labelForm" for="name">Nombre:</label>
    <input class="inputForm" type="text" name="name" v-model="formState.name">
    <label class="labelForm" for="documento">
      <template v-if="formState.client === 'me'">Código de trabajador:</template>
      <template v-else>DNI:</template>
    </label>
    <input class="inputForm" type="text" name="document" v-model="formState.document">
    <label class="labelForm" for="region">Código de zona:</label>
    <input class="inputForm" type="text" name="region" v-model="formState.region">
    <div class="inline">
      <img src="../assets/iconos/info.png" alt="Código de zona">
      <a
        class="linkForm"
        rel="nofollow noopener noreferrer"
        target="_blank"
        href="http://www.codigopostal.gob.pe/pages/invitado/consulta.jsf"
      >Consulta el código de zona</a>
    </div>
    <input class="buttonForm" type="submit" value="AGREGAR CLIENTE">
  </form>

</div>
</template>

<script>
  import { defineComponent, reactive } from 'vue';
  import { updateCollection, querySnapshotDoc }  from '../firebase/firestore'

  export default defineComponent({
    setup() {
      const formState = reactive({
        client: 'me',
        name: '',
        document: '',
        region: ''
      });
      const onSubmit = async () => {
        // data de usuario
        const user = JSON.parse(localStorage.getItem('user'));
        const uid = user.uid;

         // Obtener la data de usuario
        let getuser = await querySnapshotDoc('users', uid);
        const dataClients = getuser.data().clients;
        const existClient = dataClients.find((item) => item.document === formState.document)
        if (!existClient) {
          // Objeto de clientes
          const clients = {
            clients: [...dataClients, {...formState}],
          }
          // agregar colección a firebase
          await updateCollection('users', uid, clients);
        }
      };

      return {
        onSubmit,
        formState,
      }
    }
  });
</script>

<style>
.clientForm{
  padding: 2rem;
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
  color: var(--color-black);
  max-width: 600px;
  margin: 0 auto;
}
.inline-evenly{
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
}
.inline{
  display: flex;
  gap: 5px;
  margin-bottom: 1rem;
}
.labelForm{
  font-weight: 700;
  align-self: start;
}
.inline img{
  width: 20px;
  height: 20px;
}
/*************** Input ************** */
.inputForm{
  border: 1px solid var(--color-gray-active);
  border-radius: 5px;
  color: var(--color-gray-active);
  font-weight: 700;
}
.inputForm:focus{
  border: 1px solid var(--color-primary);
  outline: 0;
}
/* *************** Radio Button ********************/
.radioForm {
  position: relative;
  padding-left: 18px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.radioForm input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.checkmark {
  position: absolute;
  top: 3px;
  left: 0;
  height: 15px;
  width: 15px;
  border: 2px solid var(--color-primary);
  border-radius: 50%;
}
.radioForm:hover input ~ .checkmark {
  background-color: var(--color-white);
}
.radioForm input:checked ~ .checkmark {
  background-color: var(--color-primary);
}
/* *************** Link ********************/
.linkForm{
  font-size: 12px;
  color: var(--color-black);
}
.linkForm:hover{
  color: var(--color-primary);
}
/********************* Button **********/
.inactive{
  background-color: var(--color-gray-disable);
}
.buttonForm:hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
</style>