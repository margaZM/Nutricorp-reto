<template>
  <router-view/>
</template>

<script>
/* import { onAuthStateChanged } from 'firebase/auth';
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { auth } from './firebase/firebaseConfig';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

     onBeforeMount(() => {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.replace('/login');
        } else if (route.path === '/login' || route.path === '/register') {
          router.replace('/');
        }
      });
    }); 
  },
}; */
</script>

<style>
:root{
  --color-primary: #EE3037;
  --color-secondary: #999999;
  --color-black: #2C2929;
  --color-white: #FFFCFC;
  --color-gray-active: #616161;
  --color-gray-disable: #EDE7E7;
  --color-green: #35AD33;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
/* Formularios */
.container-form {
  background-image: url('./assets/fondo-form.png');
  background-repeat: no-repeat;
  background-position: bottom;
  background-attachment: fixed;
  background-size: 100% 30%;
  height: 100vh;
}

.logo-form {
  text-align: center;
  display: flex;
  justify-content: center;
}
.ant-form {
  padding: 1rem 2.3rem;
  max-width: 500px;
  margin: auto;
}
.ant-input {
  padding: .8rem 0;
  border: none;
  border-bottom: solid 1px gray;
  background-color: #dad6d6;
}
.ant-input:placeholder-shown {
  padding-left: 0;
}

.ant-btn-primary {
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

</style>
