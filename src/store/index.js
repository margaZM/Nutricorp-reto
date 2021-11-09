import { createStore } from 'vuex';
import { db } from '../firebase/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';

export default createStore({
  state: {
    productos: [],
    carrito: {},
    credit: 0,
  },
  mutations: {
    setProductos(state, payload) {
      state.productos = payload;
    },
    setCarrito(state, payload) {
      state.carrito[payload.id] = { ...payload }
    },
    setVaciar(state) {
      state.carrito = {};
    },
    disminuir(state, payload) {
      if(state.carrito[payload]){
        state.credit += Number(state.carrito[payload].price);
        state.carrito[payload].cantidad = state.carrito[payload].cantidad - 1;
        if (state.carrito[payload].cantidad === 0) {
          delete state.carrito[payload];
        }
      }
    },
    deleteProduct(state, payload) {
      delete state.carrito[payload];
    },
    setCredit(state, payload) {
      state.credit = payload;
    }
  },
  actions: {
    async getProductsColl({ commit }) {
      try {
        const dataProducts = await getDocs(collection(db, 'productosDos'));
        const data = dataProducts.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        commit('setProductos', data);
      } catch (error) {
        console.log(error);
      }
    },
    async getUserCredit({ commit }) {
      try {
        /* const userCredit = await getDocs(collection(db, 'productosDos'));
        const data = dataProducts.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data); */
        commit('setCredit', 300);
      } catch (error) {
        console.log(error);
      }
    },
    agregarCarrito({ commit, state }, product) {
      const isAvailableForPurchase = state.credit - product.price >= 0;
      if (isAvailableForPurchase) {
        Object.prototype.hasOwnProperty.call(state.carrito, product.id)
        ? (product.cantidad = state.carrito[product.id].cantidad + 1)
        : (product.cantidad = 1);
        commit('setCarrito', product);
        commit('setCredit', state.credit - product.price);
      }
    },
  },
  getters: {
    totalCantidad(state) {
      return Object.values(state.carrito).reduce(
        (acc, { cantidad }) => acc + Number(cantidad),
        0
      );
    },
    totalPrecio(state) {
      return Object.values(state.carrito).reduce(
        (acc, { cantidad, price }) => acc + Number(cantidad) * Number(price),
        0
      );
    },
  },
});
