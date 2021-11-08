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

.logo-form {
  width: 100%;
  height: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
.logo-form img {
  width: 30%;
  height: 60%;
}

.ant-form {
  padding: 2.5rem;
  max-width: 500px;
  margin: auto;
}
</style>
