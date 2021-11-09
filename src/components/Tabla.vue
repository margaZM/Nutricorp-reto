<template>
  <div>
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
    <tbody>
      <tr>
      <!--  <th></th> -->
        <td>Juan Parra</td>
        <td>76757489</td> 
        <td>07071</td> 
        <td>
        <button type="button" class="btn-edit">
          <img class="img-edit" src="../assets/iconos/edit.png" alt="edit"/>
        </button>
        </td>
        <td>
        <button type="button" class="btn-delete">
          <img class="img-delete" src="../assets/iconos/trash.png" alt="delete"/>
        </button>
        </td>
      </tr>
    </tbody>
  </table>
  <button  type="button" class="btn-finalizar"> FINALIZAR PEDIDO
        </button>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clientes: [],
      cliente: {
      nombre: '',
      dni: '',
      codigoZona: '',
      editar:'',
      eliminar:''
    }
    }
  },
}
</script>
<style scoped>
.ant-table-thead > tr > th {
  background-color: var(--color-primary);
  border: var(--color-primary);
  color:white;
  font-family: 'Rubik', sans-serif;
}
button{
  background-color: white;
  border: 0;
  margin:5px;
}
/* .btn-delete{
  background-color: red
} */
.img-delete{
  width: 100%;
  height: 100%;
}
.img-edit{
  width: 150%;
  height: 150%;
}
.btn-finalizar {
  border-radius: 8px;
  margin-top: .8rem;
  width: 50% !important;
  border-radius: 50px;
  height: 45px;
  background-color: #EE3037;
  color:white;
  font-family: 'Rubik', sans-serif;
}

</style>