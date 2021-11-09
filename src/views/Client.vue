<template>
  <div>
    <header>
      <Nav :isCarrito="false" />
    </header>
    <main class="clientContainer">
      <section class="accountBalanceContainer text-bold">
        <router-link to="/">
          <img
            class="arrow-left arrowContainer"
            src="../assets/iconos/arrow-left.png"
            alt="return"
          />
        </router-link>
        Saldo disponible: S/. {{ saldo.toFixed(2) }}
      </section>
      <section class="titleContainer">Cliente</section>
      <ClientForm />
      <Tabla />
    </main>
  </div>
</template>
<script>
import Nav from "../components/Nav";
import ClientForm from "@/components/ClientForm.vue";
import Tabla from "@/components/Tabla.vue";
export default {
  name: "Client",
  components: {
    Nav,
    ClientForm,
    Tabla,
  },
  setup() {
    const saldo = 300;
    return {
      saldo,
    };
  },
};
</script>

<style>
.clientContainer {
  width: 100%;
}
.accountBalanceContainer{
  text-align: center;
  margin-bottom: 1rem;
}
.arrowContainer{
  display: block;
  margin-left: 1rem;
  margin-top: 1rem;
}
.titleContainer {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 1rem 2rem;
}
</style>
