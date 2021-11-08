<template>
  <a-menu
    mode="horizontal"
    :default-selected-keys="['2']"
    :style="{ lineHeight: '64px' }"
    class="nav"
  >
    <a-sub-menu key="sub1">
      <template #title>
        <MenuOutlined class="icon-menu"/>
      </template>
      <a-menu-item 
      key="1"> 
      <HomeOutlined class="icon-sub-nav" /> Inicio 
      </a-menu-item>

      <a-menu-item 
      key="3"> 
      <ShoppingCartOutlined class="icon-sub-nav" /> Carrito de compras 
      </a-menu-item>

      <a-menu-item 
      key="4" @click="logoutSesion"> 
      <img class="icon-sub-nav" src="../assets/iconos/log-out.png" alt="icon-logout"> Salir 
      </a-menu-item>

    </a-sub-menu>

    <a-menu-item key="5" class="logo"> Nutrimarket </a-menu-item>

    <a-sub-menu key="sub2">
      <template #title>
        <ShoppingCartOutlined class="icon-cart" @click="showCart"/>
      </template>
    </a-sub-menu>
  </a-menu>
  <InputSearch />
</template>

<style >
.nav {
  background-color: var(--color-primary) !important;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  color: #FFFFFF; 
}
.logo {
  font-size: 25px;
  font-weight: bold;
  color: #FFFFFF;
  margin-right: 15px;
}
.icon-sub-nav {
  font-size: 120% !important;
  color: black !important;
  width: 13%;
}
.icon-sub-nav:hover {
  color: var(--color-primary)
}
.icon-menu {
  font-size: 230% !important;
  margin-top: 18px;
}
.nav-item a:hover {
    color: #FFFFFF !important;
}
.icon-cart {
  font-size: 300% !important;
  margin-top: 12px;
}
.ant-menu-submenu:first-child{
  margin-left: -60px !important;
}
</style>

<script>
import InputSearch from './inputSearch.vue';
import { logOut } from '../firebase/firebaseAuth';

import {
    MenuOutlined,
    ShoppingCartOutlined,
    HomeOutlined,
} from '@ant-design/icons-vue';

export default {
  components: {
    MenuOutlined,
    ShoppingCartOutlined,
    InputSearch,
    HomeOutlined,
  },
  setup() {
    const logoutSesion = () => {
      logOut()
        .then(() => {
          console.log('salió exitosamente');
          localStorage.clear();
        })
        .catch((error) => console.log('error', error));
    };
    return {
      logoutSesion,
    };
  },
};

</script>
