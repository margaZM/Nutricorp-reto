<template>
<div>
<div class="card-body">
  <div class="home">
    </div>
    <div class="container-category" @click="filterCategory('Aceites')" id="aceite">
          <div class="circle">
              <img id="aceite" src="../assets/iconos/aceite.webp"/>
            </div>
          <h5 class="card-title">Aceite </h5>
      </div>

      <div class="container-category" @click="filterCategory('Conservas')" >
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
    <section class="cards-grid-container">
    <Cards
    v-for="producto of filterCategory(cat)"
    :key="producto.id"
    :product="producto"
    :isCarrito="false"
    />
    </section>
  </div>
</template>

<script>
/*import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import Cards from "../components/Cards.vue";


 export default {
  name: "Home",
  components: {
    //Nav,
    //SearchInput,
    //Category,
    Cards,
   // AccountBalance,
  },
  setup() {
    const store = useStore();
    onMounted(async () => {
      store.dispatch("getProductsColl");
      store.dispatch("getUserCredit");
    });

    const allProducts = computed(() => {
    return store.state.productos;
    });
     return {allProducts}
  },
  data(){
    return {
      searchText: "",
      //allProducts: [],
    }
  },
  computed:{
    products(){
      console.log('hola,48');
      if( this.searchText === ''){
        return this.allProducts;
      }
      const filterProducts = this.allProducts.filter((item)=> item.name.toLowerCase().includes(this.searchText.toLowerCase()))

      return  filterProducts;
    }
  },
  methods:{
    onSearch(event) {
      console.log('funciona,63', this.searchText)
      this.searchText = event.target.value;
      console.log('funciona,65', this.searchText)
    }
  }
} */

//     const productos = computed(() => store.state.productos);
//     const credit = computed(() => store.state.credit);
//     return {
//       productos,
//       credit
//     };
//   },
// };

import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import Cards from "../components/Cards.vue";
export default {
  name: "Home",
  components: {
    Cards,
    //AccountBalance,
  },
  setup() {
    const store = useStore();
    onMounted(async () => {
      store.dispatch("getProductsColl");
      store.dispatch("getUserCredit");
    });
    const allProducts = computed(() => {
    return store.state.productos;
    });
    console.log(allProducts, 132)
    console.log(allProducts.value, 133)
     return {allProducts}
  },
  data(){
    return {
      searchText: "",
      //cat: "",
    
    }
  },
  computed:{
    /* showData (){
      return this.filterCategory(cat)
    }, */
      filterCategory(cat){
      console.log('hola,48');
        const filterCat = this.allProducts.filter((item)=> item.category === cat )
        console.log(filterCat)
        console.log(cat)
        const proxy1 = new Proxy(filterCat, {});
      //console.log(proxy1)
      //  console.log({...proxy1})
      const prueba3= JSON.parse(JSON.stringify(proxy1));
      console.log(prueba3)
        return prueba3
    }
      //return this.allProducts;
    /*  if(searchText === ''){
    const filterProducts = this.allProducts.filter((item)=> item.name.toLowerCase().includes(this.searchText.toLowerCase()))
      return  filterProducts;
    } else{
    const showData = this.filterCategory();
    return showData */
   // }
    //const show = filterCategory(cat);
    //return show
    
 
  },
  methods:{
    onSearch(event) {
      console.log('funciona,63', this.searchText)
      this.searchText = event.target.value;
      console.log('funciona,65', this.searchText)
    }, 
   /*  filterCategory(cat){
        // const ctg = event;
       // console.log(ctg) 
       const filterCat = this.allProducts.filter((item)=> item.category === cat )
        console.log(filterCat)
        console.log(cat)
        const proxy1 = new Proxy(filterCat, {});
      //console.log(proxy1)
      //  console.log({...proxy1})
      const prueba3= JSON.parse(JSON.stringify(proxy1));
      console.log(prueba3)
        return prueba3
    } */
      /* const target = {
      message: "hello",
      nestedProxy: new Proxy({message:"nested"}, {}),
      };
 */
      
    /*   filterCategory(cat){
          const pruebaFilter = this.allProducts.filter((item)=> {
          if(item.category === cat){
            const category = item.category
            console.log(category);
            console.log(category.value)
            return category.value}
          })
        console.log(pruebaFilter)
        return pruebaFilter;
    } */
  },
  
}
//     const productos = computed(() => store.state.productos);
//     const credit = computed(() => store.state.credit);
//     return {
//       productos,
//       credit
//     };
//   },
// };
</script>


<style>
.home {
  display: flex;
  flex-direction: column;
}
.input-search {
  align-self: center;
}
.cards-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 324px);
  grid-template-rows: 1fr;
  gap: 15px;
  justify-content: center;
}
.input-search {
  width: 75% !important;
  margin-top: 1.2rem;
  border-radius: 50px;
  background-color: #dad6d6;
  height: 45px;
}
.input-search svg {
  color: var(--color-primary);
  font-size: 160%;
}
.ant-input {
  background-color: #dad6d6;
}
.ant-input::placeholder {
  color: rgb(90, 89, 89);
  margin-bottom: 0.3rem;
}
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
