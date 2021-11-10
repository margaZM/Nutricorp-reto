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
    <br>
    <input  @click="showModal = true" class="buttonCompleted" type="submit" value="FINALIZAR PEDIDO">
    <!--MODAL-FINALIZAR-PEDIDO-->
        <transition name="modal" appear class="modal-mask">
        <div v-if="showModal" class= "slide">
          <div class="modal-container-order-completed">
            <div class="modal-content-order-completed">
              <span><button @click="showModal = false" >x</button>
              </span>
              <h3>¡Felicidades!</h3>
              <p>Tu pedido ha sido registrado exitosamente y será descontado en tu
                  próxima planilla.
              </p>
              <button  @click="showModal = false" class="accept-btn">ACEPTAR</button>
            </div>
          </div>
        </div>     
    </transition>

  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { updateCollection }  from '../firebase/firestore'

// getDoc
// deleteDoc
import { db } from '../firebase/firebaseConfig';

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
      const collection = doc(db, 'users', uid);
      const getInfo = await getDoc(collection);  
      const allClients = getInfo.data().clients;

      // filtrar por documento
      const clientFilter = allClients.filter((client) => client.document !== document);

      const clients = {
          clients: [...clientFilter],
        }
      
        // agregar colección a firebase
        await updateCollection('users', uid, clients);
    }
     
    // Actualizar cliente
    const updateClient = async (document) => {
      console.log(document)
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
    }
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
  align-items: center;
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
.buttonCompleted{
  background: #EE3037;
  padding: 14px;
  border-radius : 20px;
  width: 60%;
  align-items: center;
  color: white;
  border: none;
}
.buttonCompleted:hover{
  background: #773537;
  padding: 14px;
  border-radius : 20px;
  width: 60%;
  align-items: center;
  color: white;
  border: none;
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
