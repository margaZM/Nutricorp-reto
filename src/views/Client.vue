<template>
  <div>
<ClientForm/>
<Tabla/>
  </div>
</template>
<script>
import ClientForm  from '@/components/ClientForm.vue';
import Tabla  from '@/components/Tabla.vue';
export default {
  name: 'Client',
  components:{
   ClientForm,
   Tabla
}
}
</script>

