<template>
  <router-view />
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { auth } from "./firebase/firebaseConfig";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      onAuthStateChanged(auth, (user) => {
        // console.log(user)
        if (!user) {
          router.replace("/login");
        } else if (route.path === "/login" || route.path === "/register") {
          router.replace("/");
        }
      });
    });
  },
};
</script>

<style>
:root {
  --color-primary: #ee3037;
  --color-secondary: #999999;
  --color-black: #2c2929;
  --color-white: #fffcfc;
  --color-gray-active: #616161;
  --color-gray-disable: #ede7e7;
  --color-green: #35ad33;
  --font-family: "Rubik", sans-serif;
}

#app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-black);
}
/* Navegacion */
.ant-menu-submenu:hover .ant-menu-submenu-title:hover,
.ant-menu-overflow-item:hover,
.ant-menu-submenu-horizontal:hover {
  background-color: transparent !important;
  color: #ffffff !important;
}
.ant-menu-item-selected {
  background-color: transparent !important;
  color: #ffffff !important;
}

.ant-menu-submenu-open {
  background-color: transparent !important;
  color: #ffffff !important;
}
.text-bold {
  font-weight: 700;
}
/* Formularios */
.logo-form {
  text-align: center;
  display: flex;
  justify-content: center;
}
.ant-form {
  padding: 0 2.3rem;
  max-width: 500px;
  margin: auto;
  background-image: url('./assets/fondo-form.png');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100% 30%;
  min-height: 100vh;
}
.ant-input {
  padding: 0.8rem 0;
  border: none;
  border-bottom: solid 1px gray;
  background-color: #dad6d6;
}
.ant-input:placeholder-shown {
  padding-left: 0;
}

.ant-btn-primary,
.ant-btn-primary:hover {
  background-color: var(--color-primary);
  border: solid 1px var(--color-primary);
}
a {
  color: var(--color-primary);
  font-weight: bold;
}

a:hover {
  color: var(--color-primary);
}

/* Button Forms */
.buttonForm{
  border: 0;
  color: var(--color-white);
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  border-radius: 40px;
  background-color: var(--color-primary);
  align-self: center;
  padding: 1rem 2rem;
}

</style>
