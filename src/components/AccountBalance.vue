<template>
  <section class="accountBalanceContainer">
    Saldo disponible <span class="separate"> S/. {{ saldo.toFixed(2) }} </span>
  </section>
</template>

<script>
export default {
  setup() {
    const saldo = 300;
    return {
      saldo,
    };
  },
};
</script>

<style>
.accountBalanceContainer {
  background-color: var(--color-primary);
  color: var(--color-white);
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 20px 20px 0px 0px;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
}
.separate{
  margin-left: 20px;
}

</style>