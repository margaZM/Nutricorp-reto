<template>
  <div>
    <header>
      <Nav :isCarrito="isCarrito" />
    </header>
    <main class="clientContainer">
      <section class="clientAccountBalanceContainer text-bold">
        <router-link to="/">
          <img
            class="arrow-left arrowContainer"
            src="../assets/iconos/arrow-left.png"
            alt="return"
          />
        </router-link>
        Saldo disponible: S/. {{ creditUser.toFixed(2) }}
      </section>
      <section class="titleContainer">Cliente</section>
      <form class="clientForm" @submit.prevent="addClient">
        <div class="inline-evenly">
          <label class="radioForm"
            >Para mí
            <input
              type="radio"
              value="me"
              checked="checked"
              name="client"
              v-model="formState.client"
            />
            <span class="checkmark"></span>
          </label>
          <label class="radioForm"
            >Otro cliente
            <input
              type="radio"
              value="other"
              name="client"
              v-model="formState.client"
            />
            <span class="checkmark"></span>
          </label>
        </div>
        <label class="labelForm" for="name">Nombre:</label>
        <input
          class="inputForm"
          type="text"
          name="name"
          v-model="formState.name"
        />
        <label class="labelForm" for="documento">
          <template v-if="formState.client === 'me'"
            >Código de trabajador:</template
          >
          <template v-else>DNI:</template>
        </label>
        <input
          class="inputForm"
          type="text"
          name="document"
          v-model="formState.document"
        />
        <label class="labelForm" for="region">Código de zona:</label>
        <input
          class="inputForm"
          type="text"
          name="region"
          v-model="formState.region"
        />
        <div class="inline">
          <img src="../assets/iconos/info.png" alt="Código de zona" />
          <a
            class="linkForm"
            rel="nofollow noopener noreferrer"
            target="_blank"
            href="http://www.codigopostal.gob.pe/pages/invitado/consulta.jsf"
            >Consulta el código de zona</a
          >
        </div>
        <input
          :disabled="
            formState.name === '' ||
            formState.document === '' ||
            formState.region === ''
          "
          class="buttonForm"
          type="submit"
          value="AGREGAR CLIENTE"
        />
      </form>
      <div v-if="formState.client === 'other'" class="container">
        <table class="table">
          <thead class="ant-table-thead">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">DNI /Código de trabajador</th>
              <th scope="col">Código de zona</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody v-for="client in clients" :key="client.document">
            <tr>
              <!--  <th></th> -->
              <td>{{ client.name }}</td>
              <td>{{ client.document }}</td>
              <td>{{ client.region }}</td>
              <td>
                <button
                  type="button"
                  class="btn-edit"
                  @click="updateClient(client.document)"
                >
                  <img
                    class="img-edit"
                    src="../assets/iconos/edit.png"
                    alt="edit"
                  />
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn-delete"
                  @click="deleteClient(client.document)"
                >
                  <img
                    class="img-delete"
                    src="../assets/iconos/trash.svg"
                    alt="delete"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          @click="addOrder"
          type="button"
          class="buttonForm finishedButton"
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </main>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { reactive, onMounted, ref } from "vue";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { updateCollection, querySnapshotDoc, addCollection } from "../firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Nav from "../components/Nav";

export default {
  name: "Client",
  components: {
    Nav,
  },
  setup() {
    const store = useStore();
    const isCarrito = false;
    const creditUser = computed(() => store.state.credit);
    const carrito = computed(() => store.state.carrito);
    const userId = JSON.parse(localStorage.getItem("user")).uid;
    /*********** Form *****************  */
    const formState = reactive({
      client: "me",
      name: "",
      document: "",
      region: "",
    });

    const addClient = async () => {
      // data de usuario
      const getuser = await querySnapshotDoc("users", userId);
      if (formState.client === "me") {
        const updatedUser = {
          displayName: formState.name,
          document: formState.document,
          region: formState.region,
          creditAvailable: creditUser.value,
        };
        await updateCollection("users", userId, updatedUser);
        delete updatedUser.creditAvailable;
        await addCollection('orders', {
          client: {...updatedUser},
          products: {...carrito.value},
          dateCreated: new Date(Date.now()),
          dateProcessed: new Date(Date.now()),
        })
        console.log('se agrego xD')
      } else {
        // Obtener la data de usuario
        const dataClients = getuser.data().clients;
        const existClient = dataClients.find(
          (item) => item.document === formState.document
        );
        if (!existClient) {
          // Objeto de clientes
          const clients = {
            clients: [...dataClients, { ...formState }],
          };
          // agregar colección a firebase
          await updateCollection("users", userId, clients);
        }
      }
    };

    /* ***************** Table ****************/
    const clients = ref([]);
    const getClients = async () => {
      //Obtener la data de usuario
      onSnapshot(doc(db, "users", userId), (doc) => {
        clients.value = doc.data().clients;
      });
    };

    // Borrar cliente
    const deleteClient = async (document) => {
      const collection = doc(db, "users", userId);
      const getInfo = await getDoc(collection);
      const allClients = getInfo.data().clients;

      // filtrar por documento
      const clientFilter = allClients.filter(
        (client) => client.document !== document
      );

      const clients = {
        clients: [...clientFilter],
      };

      // agregar colección a firebase
      await updateCollection("users", userId, clients);
    };

    // Actualizar cliente
    const updateClient = async (document) => {
      console.log(document);
      // const collection = doc(db, 'users', userId);
      // const getInfo = await getDoc(collection);
      // const allClients = getInfo.data().clients;

      // // filtrar por documento
      // const clientFilter = allClients.filter((client) => client.document == document);

      // // Objeto de clientes
      // const clients = {
      //   clients: [...dataClients, {...formState}],
      // }
      // // console.log(clients)

      // // agregar colección a firebase
      // await updateCollection('users', userId, clients);
    };

    const addOrder = async() => {
      const updatedUser = {
        creditAvailable: creditUser.value,
      };
      await updateCollection("users", userId, updatedUser);

      delete updatedUser.creditAvailable;
      await addCollection('orders', {
        client: {...clients.value},
        products: {...carrito.value},
        dateCreated: new Date(Date.now()),
        dateProcessed: new Date(Date.now()),
      })
      console.log('se agrego xD')
    }

    onMounted(async () => {
      const getUser = await querySnapshotDoc("users", userId);
      formState.name = getUser.data().displayName;
      formState.document = getUser.data().document ?? "";
      formState.region = getUser.data().region ?? "";
      getClients();
    });

    return {
      creditUser,
      isCarrito,
      formState,
      addClient,
      clients,
      getClients,
      updateClient,
      deleteClient,
      addOrder
    };
  },
};
</script>

<style>
.clientContainer {
  width: 100%;
}
.clientAccountBalanceContainer {
  text-align: center;
  margin-bottom: 1rem;
}
.arrowContainer {
  display: block;
  margin-left: 1rem;
  margin-top: 1rem;
}
.titleContainer {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 1rem 2rem;
}
/* ************************ Table *******************/
.table {
  margin: 0 auto;
}
.ant-table-thead > tr > th {
  background-color: var(--color-primary);
  border: var(--color-primary);
  color: white;
  font-family: "Rubik", sans-serif;
}
.container {
  display: flex;
  flex-direction: column;
}
/* .btn-delete{
  background-color: red
} */
.img-delete {
  width: 20px;
  height: 20px;
}
.img-edit {
  width: 25px;
  height: 25px;
  margin: 0;
}
.btn-edit,
.btn-delete {
  background-color: transparent;
  border: 0;
  cursor: pointer;
}
.finishedButton {
  margin: 2rem 0rem;
}
/* *********************** Client Form *************************/
.clientForm {
  padding: 2rem;
  display: flex;
  flex-flow: column wrap;
  gap: 10px;
  color: var(--color-black);
  max-width: 600px;
  margin: 0 auto;
}
.inline-evenly {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
}
.inline {
  display: flex;
  gap: 5px;
  margin-bottom: 1rem;
}
.labelForm {
  font-weight: 700;
  align-self: start;
}
.inline img {
  width: 20px;
  height: 20px;
}
/*************** Input ************** */
.inputForm {
  border: 1px solid var(--color-gray-active);
  border-radius: 5px;
  color: var(--color-gray-active);
  font-weight: 700;
}
.inputForm:focus {
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
.linkForm {
  font-size: 12px;
  color: var(--color-black);
}
.linkForm:hover {
  color: var(--color-primary);
}
/********************* Button **********/
.inactive {
  background-color: var(--color-gray-disable);
}
.buttonForm:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
