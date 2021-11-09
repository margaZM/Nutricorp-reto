import { createStore } from 'vuex';
import { db } from '../firebase/firebaseConfig';
import {getDocs, collection } from 'firebase/firestore';

export default createStore({
  state: {
    productos: [],
    carrito: {}
  },
  mutations: {
    setProductos(state, payload) {
      state.productos = payload
    },
    setCarrito(state, payload) {
      state.carrito[payload.id] = { ...payload }
      console.log(state.carrito)
    },
    setVaciar(state) {
      state.carrito = {}
    },
    aumentar(state, payload) {
      console.log(state, payload)
      state.carrito[payload].cantidad = state.carrito[payload].cantidad + 1
    },
    disminuir(state, payload) {
      state.carrito[payload].cantidad = state.carrito[payload].cantidad - 1
      if (state.carrito[payload].cantidad === 0) {
        delete state.carrito[payload]
      }
    }
  },
  actions: {
    async getProductsColl({commit})  {
      try {
        const dataProducts = await getDocs(collection(db, 'productosDos'))
        const data = dataProducts.docs.map((doc) => (
          {
            id: doc.id,
            ...doc.data(),
          }))
          console.log(data)
        commit('setProductos', data)
      } catch (error) {
        console.log(error)
      }
    },
    agregarCarrito({ commit, state }, producto) {
      console.log(producto)
      Object.prototype.hasOwnProperty.call(state.carrito, "id")
        ? producto.cantidad = state.carrito[producto.id].cantidad + 1
        : producto.cantidad = 1
      commit('setCarrito', producto)
    }
  },
  getters: {
    totalCantidad(state) {
      return Object.values(state.carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    },
    totalPrecio(state) {
      return Object.values(state.carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
    }
  }
})
