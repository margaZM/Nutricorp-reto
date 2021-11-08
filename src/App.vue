<template>
  <router-view/>
</template>

<style>
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
