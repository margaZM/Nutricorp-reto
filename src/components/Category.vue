<template>
    <div class="card-body">
      <div class="container-category">
          <div class="circle">
              <img id="aceite" src="../assets/iconos/aceite.webp"/>
            </div>        
          <h5 class="card-title">Aceite </h5>
      </div>

      <div class="container-category">
          <div class="circle">
              <img id="conserva" src="../assets/iconos/conservas.webp"/>
            </div>        
          <h5 class="card-title">Conservas </h5>
      </div> 

      <div class="container-category">
          <div class="circle">
              <img id="pasta" src="../assets/iconos/pastas.webp"/>
          </div>        
          <h5 class="card-title">Pastas </h5>
      </div>

      <div class="container-category">
          <div class="circle">
              <img id="detergente" src="../assets/iconos/detergente.webp"/>
          </div>        
          <h5 class="card-title">Detergentes </h5>
      </div>

      <div class="container-category">
          <div class="circle">
              <img id="jabon" src="../assets/iconos/jabon.webp"/>
          </div>        
          <h5 class="card-title">Jabones </h5>
      </div>
 </div> 
</template>
<style scoped>
.card-body {
  display: flex;
  gap: 0.5rem;
  overflow-y: auto;
  background-color: #b4b3b3;
  padding: .5rem;
  margin: 1rem 0;
}
.circle {
  border: 1px solid var(--color-primary);
  background-color: var(--color-white);
  width: 70px;
  height: 70px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-title {
  color: black;
  font-size: 12px;
  text-align: center;
}
#aceite {
  width: 25%;
}
#pasta {
  width: 35%;
}
#detergente {
  width: 45%;
}
#jabon {
  width: 65%;
}
#conserva {
  width: 60%;
}
::-webkit-scrollbar {
  width: 1px;
  height: 5px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #EE3038;
  border: 0px none #ffffff;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background:rgba(0,0,15,0.7);
}
::-webkit-scrollbar-thumb:active {
  background: rgba(0,0,15,1);
}
::-webkit-scrollbar-track {
  background: #666666;
  border: 0px none #ffffff;
  border-radius: 5px;
}
::-webkit-scrollbar-track:hover {
  background: #666666;
}
::-webkit-scrollbar-track:active {
  background: #333333;
}
::-webkit-scrollbar-corner {
  background: transparent;
}

</style>

<script>
export default{
}
</script>