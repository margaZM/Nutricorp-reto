<template>
  <div class="category">
    <div class="embed-responsive embed-responsive-16by9">
    </div>
    <div class="card-body">
            <div class="container-category">
                <div class="circle">
                    <img src="../assets/iconos/aceite.webp"/>
                 </div>        
                <h5 class="card-title">Aceite </h5>
            </div>

            <div class="container-category">
                <div class="circle">
                    <img src="../assets/iconos/conservas.webp"/>
                 </div>        
                <h5 class="card-title">Conservas </h5>
            </div> 

            <div class="container-category">
                <div class="circle">
                    <img src="../assets/iconos/pastas.webp"/>
                </div>        
                <h5 class="card-title">Pastas </h5>
            </div>

            <div class="container-category">
                <div class="circle">
                    <img src="../assets/iconos/detergente.webp"/>
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
 
   <!-- <div >
    <a-tabs
      default-active-key="1"
      :tab-position="mode"
      :style="{ height: '200px' }"
      @prevClick="callback"
      @nextClick="callback"
    >
      <a-tab-pane v-for="i in 5" :key="i" :tab="`Categoría-${i}`"> Contenido de categoría {{ i }} </a-tab-pane>

    </a-tabs>
  </div> -->

 </div> 
</template>
<style scoped>

.category {
    margin-top: 50px;

}
.card-body {
    display: flex;
    overflow-y: auto;
    background-color: #999999;
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    justify-content: center;
}
.circle {
    border: 1px solid var(--color-primary);
    background-color: var(--color-white);
    width: 120px;
    height: 120px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
}
.card-title {
    background-color: rgba(153, 153, 153 );
    color: black;
    font-size: 1rem;

}

.img{
    width: 90%;
}
#jabon {
    width: 70%;
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