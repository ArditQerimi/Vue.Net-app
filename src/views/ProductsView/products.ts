// import '../../axios/axios'
// import shopAxios from "@/axios/axios";
import axios from "axios";


export const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken"); // or however you retrieve the token
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

const state = () => ({
  products: [],
  categories: [],
  sizes: [],
  colors: [],
  loading: false,
  modalVisible:false
});

const actions = {
  async openModal({commit}) {
    try {
      commit('openModal')
    } catch {

    }
  },
  async closeModal({commit}) {
    try {
      commit('closeModal')
    } catch {

    }
  },
  async fetchProducts({ commit }) {
    try {
      const products = await instance.get(
        "/Products/getAll"
      );
      commit("setProducts", products.data.reverse());
    } catch (error) {
      console.error(error);
    }
  },
  async fetchCategories({ commit }) {
    try {
      const categories = await instance.get(
        "/Categories/AllCategories"
      );
      commit("setCategories", categories.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchSizes({ commit }) {
    try {
      const sizes = await instance.get("/Size/AllSizes");
      commit("setSizes", sizes.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchColors({ commit }) {
    try {
      const colors = await instance.get(
        "/Color/AllColors"
      );
      commit("setColors", colors.data);
    } catch (error) {
      console.error(error);
    }
  },
  async editProduct({ commit }, payload) {
    try {
      const response = await instance.put(
        `/Products/UpdateProduct`,
        payload
      );
      debugger;
      commit("setEditedProduct", response.data);
    } catch (error) {}
  },
  async addProduct({ commit }, payload) {

    const newPayload = {

        name: payload.name,
        price: payload.price,
        categoryId: payload.categoryId,
        sizeId: payload.sizeId,
        colorIds: payload.colorIds


    }

    debugger
    try {
      const response = await instance.post(
        `/Products/CreateOneProduct`,
          newPayload
      );
      debugger

      commit("setAddedProduct", response.data);
    } catch (error) {}
  },
  async deleteProduct({ commit }, payload) {
    try {
      const response = await instance.delete(
        "/Products/DeleteOneProduct",
        { data: { id: payload.id } }
      );

      commit("removeProduct", response.data);
    } catch (e) {}
  },
};

const mutations = {
  openModal(state){
    state.modalVisible = true;
    debugger
  },
  closeModal(state){
    state.modalVisible = false
  },
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
    state.modalVisible = false;
  },
  setAddedProduct(state, createdProduct) {
    state.products.unshift(createdProduct);
    state.modalVisible = false;
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
