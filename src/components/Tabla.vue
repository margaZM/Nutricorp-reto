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
      <tbody>
        <tr>
          <!--  <th></th> -->
          <td>Nombre</td>
          <td>Documento</td>
          <td>zona</td>
          <td>
            <button type="button" class="btn-edit">
              <img
                class="img-edit"
                src="../assets/iconos/edit.png"
                alt="edit"
              />
            </button>
          </td>
          <td>
            <button type="button" class="btn-delete">
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
    <button type="button" class="buttonForm">FINALIZAR PEDIDO</button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      clientes: [],
      cliente: {
        nombre: "",
        dni: "",
        codigoZona: "",
        editar: "",
        eliminar: "",
      },
    };
  },

};
</script>

<style scoped>
.table{
  margin: 0 auto;
}
.ant-table-thead > tr > th {
  background-color: var(--color-primary);
  border: var(--color-primary);
  color: white;
  font-family: "Rubik", sans-serif;
}
.container{
  display: flex;
  flex-direction: column;
}
/* .btn-delete{
  background-color: red
} */
.img-delete{
  width: 20px;
  height: 20px;
}
.img-edit{
  width: 25px;
  height: 25px;
  margin: 0;
}
.btn-edit, .btn-delete{
  background-color: transparent;
  border: 0;
}
</style>