<template>
  <div class="home">
    <Nav :isCarrito="true" />
    <!-- search input -->
    <a-input-search
      placeholder="Encuentra tu producto aquí..."
      style="width: 200px"
      @input="onSearch"
      class="input-search"
    />
    <Category :filterCategory="filterCategory"/>
    <section class="cards-grid-container">
    <Cards
    v-for="producto of products"
    :key="producto.id"
    :product="producto"
    :isCarrito="false"
    />
    </section>
    <AccountBalance :credit="credit"/>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import Nav from "../components/Nav";
import Category from "../components/Category.vue";
import Cards from "../components/Cards.vue";
import AccountBalance from "../components/AccountBalance.vue";

export default {
  name: "Home",
  components: {
    Nav,
    Category,
    Cards,
    AccountBalance,
  },
  setup() {
    const store = useStore();
    onMounted(async () => {
      store.dispatch("getProductsColl");
      store.dispatch("getUserCredit");
    });

    const allProducts = computed(() => store.state.productos);
    const credit = computed(() => store.state.credit)

    return {
      allProducts, credit,
    }
  },
  data(){
    return {
      searchText: "",
      selectedCategory: ''
    }
  },
  computed: {
    products(){
      if( this.selectedCategory !== '') {
        return this.allProducts.filter((item) => item.category === this.selectedCategory);
      }
      if( this.searchText === '') return this.allProducts;
      const filterProducts = this.allProducts.filter((item)=> item.name.toLowerCase().includes(this.searchText.toLowerCase()))
      return  filterProducts;
    }
  },
  methods:{
    onSearch(event) {
      this.searchText = event.target.value;
      this.selectedCategory = '';
    },
    filterCategory(category) {
      this.selectedCategory = category;
    }
  }
}
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
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
  margin-bottom: 4rem;
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
.ant-input:hover, .ant-input:focus{
  border-color: var(--color-primary) !important;
}
.ant-input-affix-wrapper:hover, .ant-input-affix-wrapper:focus{
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 2px rgb(255 24 24 / 20%) !important;
}
</style>
