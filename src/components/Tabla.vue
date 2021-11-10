<template>
  <div class="container">
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
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { updateCollection } from "../firebase/firestore";

// getDoc
// deleteDoc
import { db } from "../firebase/firebaseConfig";

export default {
  setup() {
    const clients = ref([]);
    // data de usuario
    const user = JSON.parse(localStorage.getItem("user"));
    const uid = user.uid;

    const getClients = async () => {
      //Obtener la data de usuario
      onSnapshot(doc(db, "users", uid), (doc) => {
        clients.value = doc.data().clients;
      });
    };

    onMounted(async () => {
      getClients();
    });

    // Borrar cliente
    const deleteClient = async (document) => {
      const collection = doc(db, "users", uid);
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
      await updateCollection("users", uid, clients);
    };

    // Actualizar cliente
    const updateClient = async (document) => {
      console.log(document);
      // const collection = doc(db, 'users', uid);
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
      // await updateCollection('users', uid, clients);
    };
    return {
      getClients,
      clients,
      deleteClient,
      updateClient,
    };
  },
};
</script>

<style scoped>
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
</style>
