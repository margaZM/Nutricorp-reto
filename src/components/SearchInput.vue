<template>

</template>

// <script>


// import { defineComponent, ref } from 'vue';
// export default defineComponent({
//   name: "InputSearch",
//   props: {
//     product: {
//       type: Object,
//       required: true,
//       default() {
//         return {
//           brand: '',
//           name: 'hola',
//           price: 5,
//           suggestedPrice: 1,
//           qty: 8,
//           imgUrl: '',
//           unitOfMeasure: '',
//           category: '',
//         }
//       }
//     },
//     methods: {

//     },
//   },
//   computed: {
//     filterText(){
//       let filter = filterText.value
//       if (!filter.length) {
//       return this.product
//       }
//       return this.product.value.filter( card =>
//       card.name.toLowerCase().includes(filter.toLowerCase()))
//       return {
//       filterText,
//       //onSearch,
//       filterCards
//       }
//     }
//   },
//   setup() {
//     const filterText = ref('');
//     return {
//       (filterText
//     }

//     // const onSearch = searchValue => {
//     //   console.log('use value', searchValue);
//     //   console.log('or use this.value', filterText.value);
//   }
// });

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


