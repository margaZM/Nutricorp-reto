<template>
  <a-menu
    mode="horizontal"
    :default-selected-keys="['2']"
    :style="{ lineHeight: '64px' }"
    class="nav"
  >
    <a-sub-menu key="sub1">
      <template #title>
        <MenuOutlined class="icon-menu" />
      </template>
      
      <a-menu-item key="1" class="greeting"> ¡Hola, {{ userAuth.displayName }}! </a-menu-item>
      
      <a-menu-item 
      key="2">
      <router-link to="/"> <HomeOutlined class="icon-sub-nav" /> Inicio </router-link>
      </a-menu-item>

      <a-menu-item key="3">
        <router-link to="/cart"> <ShoppingCartOutlined class="icon-sub-nav" /> Carrito de compras </router-link>
      </a-menu-item>

      <a-menu-item key="4" @click="logoutSesion" class="text-bold">
        <img
          class="icon-sub-nav"
          src="../assets/iconos/log-out.png"
          alt="icon-logout"
        />
        Salir
      </a-menu-item>
    </a-sub-menu>

    <a-menu-item key="5" class="logo"> Nutrimarket </a-menu-item>

    <a-menu-item v-if="isCarrito" key="6">
      <a-badge
      v-for="product in carrito" :key="product.id"
      :count="product.cantidad"
      class="badge"
      :number-style="{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', }" 
      >
      <router-link to="/cart"> <ShoppingCartOutlined class="icon-cart"/> </router-link>
      </a-badge>
    </a-menu-item>
  </a-menu>
</template>

<style >
.noneCursor {
  cursor: default;
}
.nav {
  background-color: var(--color-primary) !important;
  display: flex;
  color: var(--color-white);
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 25px;
  font-weight: bold;
  color: var(--color-white);
}
.icon-sub-nav {
  font-size: 120% !important;
  color: black !important;
  width: 13%;
}
.icon-sub-nav:hover {
  color: var(--color-primary);
}
.icon-menu {
  font-size: 230% !important;
  margin-top: 18px;
}
.nav-item a:hover {
  color: #ffffff !important;
}
.icon-cart {
  font-size: 300% !important;
  margin-top: 12px;
  color: #ffffff;
}
.ant-menu::before,
.ant-menu::after {
  content: none;
}
.ant-menu-submenu-selected {
  color: var(--color-white) !important;
}
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected::after {
  border-bottom: 2px solid #ffffff;
}
.ant-scroll-number {
  top: 20px;
  right: 2px;
}
.greeting {
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 700;
}

</style>

<script>
import { computed } from 'vue'
import {useStore} from 'vuex';
import { logOut } from "../firebase/firebaseAuth";

import {
  MenuOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    MenuOutlined,
    ShoppingCartOutlined,
    HomeOutlined,
  },
  props: {
    isCarrito: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  setup() {
    const logoutSesion = () => {
      logOut()
        .then(() => {
          console.log("salió exitosamente");
          localStorage.clear();
        })
        .catch((error) => console.log("error", error));
    };
    const userAuth = JSON.parse(localStorage.getItem('user'));
    console.log(userAuth)
    const store = useStore()
    const carrito = computed(() => store.state.carrito);
    return {
      logoutSesion,
      userAuth,
      carrito,
    }
  },
};
</script>