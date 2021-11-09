<template>
  <a-input-search
    v-model:value="value"
    placeholder="Encuentra tu producto aquí..."
    style="width: 200px"
    @input="onSearch"
    class="input-search"
  />
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: "InputSearch",
  setup() {
    const value = ref('');

    const onSearch = searchValue => {
      console.log('use value', searchValue);
      console.log('or use this.value', value.value);
    };

    return {
      value,
      onSearch,
    };
  },
  // const searchResult = (dataUsers, searchValue) => dataUsers.filter(user => product.name.toLowerCase().includes(searchValue.toLowerCase()))


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