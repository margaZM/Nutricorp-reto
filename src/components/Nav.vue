<template>
  <a-menu
    mode="horizontal"
    :default-selected-keys="['2']"
    :style="{ lineHeight: '64px' }"
    class="nav"
  >
    <a-sub-menu key="sub1">
      <template #title>
        <MenuOutlined :style="{ color: '#FFFFFF' }" class="icon-menu" />
      </template>

      <a-menu-item key="1" class="greeting">
        ¡Hola, {{ user?.displayName }}!
      </a-menu-item>

      <a-menu-item key="2" class="submenuItem">
        <router-link to="/">
          <HomeOutlined class="icon-sub-nav" /> Inicio
        </router-link>
      </a-menu-item>

      <a-menu-item key="3" class="submenuItem">
        <router-link to="/cart">
          <ShoppingCartOutlined class="icon-sub-nav" /> Carrito de compras
        </router-link>
      </a-menu-item>

      <a-menu-item key="4" @click="logoutSesion" class="submenuItem">
        <img
          class="icon-sub-nav"
          src="../assets/iconos/log-out.png"
          alt="icon-logout"
        /><router-link to="/"> Salir </router-link>
      </a-menu-item>
    </a-sub-menu>

    <a-menu-item key="5" class="logo"> Nutrimarket </a-menu-item>

    <a-menu-item v-if="isCarrito" key="6">
      <a-badge
        :count="totalCantidad"
        class="badge"
        :number-style="{
          backgroundColor: '#fff',
          color: '#ee3037',
          boxShadow: '0 0 0 1px #d9d9d9 inset',
        }"
      >
        <router-link to="/cart">
          <ShoppingCartOutlined class="icon-cart" />
        </router-link>
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
  position: sticky;
  top: 0;
  z-index: 1;
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
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected::after {
  border-bottom: none !important;
}
.ant-menu-horizontal > .ant-menu-item::after,
.ant-menu-horizontal > .ant-menu-submenu::after {
  display: none !important;
}
.ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-expand-icon, .ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow {
  color: var(--color-primary) !important;
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
  color: var(--color-black) !important;
}
.greeting:hover, .submenuItem:hover, .submenuItem:hover a {
  color: var(--color-primary) !important;
  background-color: rgba(238, 48, 55, 0.1) !important;
}

.ant-menu-vertical.ant-menu-sub, .ant-menu-vertical-left.ant-menu-sub, .ant-menu-vertical-right.ant-menu-sub {
  min-width: 200px !important;
}
</style>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { logOut } from "../firebase/firebaseAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

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
    const user = ref({});
    const logoutSesion = () => {
      logOut()
        .then(() => {
          localStorage.clear();
        })
        .catch((error) => console.log("error", error));
    };
    const getUser = async () => {
      const localUser = JSON.parse(localStorage.getItem("user"));
      const docRef = doc(db, "users", localUser?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        user.value = { ...docSnap.data() };
      } else {
        console.log("No encontro usuario!");
      }
    };
    const store = useStore();
    const totalCantidad = computed(() => store.getters.totalCantidad);
    onMounted(async () => {
      getUser();
    });
    return {
      logoutSesion,
      user,
      totalCantidad,
    };
  },
};
</script>