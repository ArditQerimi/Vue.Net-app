import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import products from '@/views/ProductsView/products'
import auth from '@/views/RegisterVIew/auth'

export default createStore({
  modules: {
    products,
    auth
  },
  plugins: [
    createPersistedState({
      key: 'my-app',
      paths: ['auth.user']
    })
  ]
})
