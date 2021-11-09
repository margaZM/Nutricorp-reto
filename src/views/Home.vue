<template>
  <div class="home">
    <Nav :isCarrito="true" />
    <a-input-search
    v-model:value="value"
    placeholder="Encuentra tu producto aquí..."
    style="width: 200px"
    @input="onSearch"
    class="input-search"
  />
    <Category />
    <section class="cards-grid-container">
      <Cards
        v-for="producto of productos"
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
//import SearchInput from "../components/SearchInput.vue";
import Category from "../components/Category.vue";
import Cards from "../components/Cards.vue";
import AccountBalance from "../components/AccountBalance.vue";

export default {
  name: "Home",
  components: {
    Nav,
    //SearchInput,
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

    const productos = computed(() => store.state.productos);
    const credit = computed(() => store.state.credit);
    return {
      productos,
      credit
    };
  },
  methods:{
    onsearch
  }
};
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
</style>
