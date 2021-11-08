<template>
  <div class="header">
    <div class="nav">
      <MenuOutlined class="icon-menu"/>
      <span class="logo">Nutrimarket</span>
      <ShoppingCartOutlined class="icon-cart"/>
    </div>
    <InputSearch />
  </div>
</template>

<style >
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.nav {
  background-color: var(--color-primary);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem 1rem;
  color: #FFFFFF;
}
.logo {
  font-size: 25px;
  font-weight: bold;
  color: #FFFFFF;
}
.icon-menu {
  font-size: 230%;
}
.icon-cart {
  font-size: 300%;
}
</style>

<script>
import InputSearch from './inputSearch.vue';
import {
    MenuOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons-vue';

export default {
  components: {
    MenuOutlined,
    ShoppingCartOutlined,
    InputSearch,
  },
};

</script>
