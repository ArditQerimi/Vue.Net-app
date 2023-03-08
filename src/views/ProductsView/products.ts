import axios from "axios";
import '../../axios/axios'

const state = () => ({
  products: [],
  categories: [],
  sizes: [],
  colors: [],
  loading: false,
});

const actions = {
  async fetchProducts({ commit }) {
    try {
      const products = await axios.get(
        "http://localhost:5000/api/Products/getAll"
      );
      commit("setProducts", products.data.reverse());
    } catch (error) {
      console.error(error);
    }
  },
  async fetchCategories({ commit }) {
    try {
      const categories = await axios.get(
        "http://localhost:5000/api/Categories/AllCategories"
      );
      commit("setCategories", categories.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchSizes({ commit }) {
    try {
      const sizes = await axios.get("http://localhost:5000/api/Size/AllSizes");
      commit("setSizes", sizes.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchColors({ commit }) {
    try {
      const colors = await axios.get(
        "http://localhost:5000/api/Color/AllColors"
      );
      commit("setColors", colors.data);
    } catch (error) {
      console.error(error);
    }
  },
  async editProduct({ commit }, payload) {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/Products/UpdateProduct`,
        payload
      );
      debugger;
      commit("setEditedProduct", response.data);
    } catch (error) {}
  },
  async addProduct({ commit }, payload) {
    debugger
    try {
      const response = await axios.post(
        `http://localhost:5000/api/Products/CreateOneProduct`,
        payload
      );
      debugger

      commit("setAddedProduct", response.data);
    } catch (error) {}
  },
  async deleteProduct({ commit }, payload) {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/Products/DeleteOneProduct",
        { data: { id: payload.id } }
      );

      commit("removeProduct", response.data);
    } catch (e) {}
  },
};

const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setSizes(state, sizes) {
    state.sizes = sizes;
  },
  setColors(state, colors) {
    state.colors = colors;
  },
  setEditedProduct(state, updatedProduct) {
    const foundedIndex = state.products.findIndex(
      (p) => p.id === updatedProduct.id
    );
    debugger;

    state.products[foundedIndex] = updatedProduct;
  },
  setAddedProduct(state, createdProduct) {
    state.products.unshift(createdProduct);
  },
  removeProduct(state, deletedProduct) {
    const indexOfProduct = state.products.findIndex(
      (p) => p.id == deletedProduct.id
    );
    if (indexOfProduct > -1) {
      state.products.splice(indexOfProduct, 1);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
