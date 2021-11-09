<template>
  <a-input-search
    v-model="search"
    placeholder="Encuentra tu producto aquí..."
    style="width: 200px"
    @search="onSearch"
    class="input-search"
  />
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: "InputSearch",
  setup() {
    const search = '';
    return {
      search
    }
  }
});
</script>

<style>
.input-search {
  width: 75% !important;
  margin-top: 1.2rem;
  border-radius: 50px;
  background-color: #dad6d6;
  height: 45px;
}
.input-search svg {
  color: var(--color-primary);
  font-size: 160%;
}
.ant-input {
  background-color: #dad6d6;
}
.ant-input::placeholder {
  color: rgb(90, 89, 89);
  margin-bottom: 0.3rem;
}
</style>