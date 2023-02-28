import { createStore, createLogger } from "vuex";
import products from "@/views/ProductsView/products";
// import cart from './modules/cart'

// const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    // cart,
    products,
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
});
