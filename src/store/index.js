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
    aumentar(state, payload) {
      const isBuy = state.credit - state.carrito[payload].price;
      if(isBuy >= 0) {
        state.carrito[payload].cantidad = state.carrito[payload].cantidad + 1;
      }
    },
    disminuir(state, payload) {
      state.carrito[payload].cantidad = state.carrito[payload].cantidad - 1;
      state.credit = state.credit + state.carrito[payload].price;
      if (state.carrito[payload].cantidad === 0) {
        delete state.carrito[payload];
      }
    },
    setCredit(state, payload) {
      state.credit = payload;
      console.log(state.credit)
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
    async getUserCredit({ commit }){
      commit('setCredit', 300);
    },
    agregarCarrito({ commit, state, getters }, producto) {
      Object.prototype.hasOwnProperty.call(state.carrito, 'id')
      ? (producto.cantidad = state.carrito[producto.id].cantidad + 1)
      : (producto.cantidad = 1);
      commit('setCarrito', producto);
      commit('setCredit', state.credit - getters.totalPrecio);
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
