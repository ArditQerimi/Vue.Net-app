import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import products from '@/views/ProductsView/products'
import auth from '@/views/RegisterVIew/auth'
import cart from '@/views/User/cart'

export default createStore({
  modules: {
    products,
    auth,
    cart
  },
  plugins: [
    createPersistedState({
      key: 'my-app',
      paths: ['auth.user']
    })
  ]
})
