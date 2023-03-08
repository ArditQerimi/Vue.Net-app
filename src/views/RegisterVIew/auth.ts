import axios from "axios";
import '../../axios/axios'
import shopAxios from "@/axios/axios";
import landingPageAxios from "@/axios/LandingPageAxios";
import router from "@/router";
// @ts-ignore
import jwt_decode from "jwt-decode";
// @ts-ignore
const state = () => ({
    products: [],
    user:JSON.parse(localStorage.getItem('user')) || null,

});

const actions = {
    async fetchProducts({ commit }) {
        try {
            const products = await shopAxios.get(
                "http://localhost:5000/api/Products/getAll"
            );
            commit("setProducts", products.data.reverse());
        } catch (error) {
            console.error(error);
        }
    },



    async registerUser({ commit }, payload) {
        try {
            const response = await shopAxios.post(
                `http://localhost:5000/api/Auth/register`,
                payload
            );
            commit("setUser", response.data);
        } catch (error) {}
    },
    async loginUser({ commit }, payload) {
        try {
            const response = await landingPageAxios.post(
                `http://localhost:5000/api/Auth/login`,
                payload
            );
            localStorage.setItem('accessToken', response.data.token);
            const user = jwt_decode(response.data.token) as any;
            console.log(user)
            await router.push('/home')
            commit("setLoggedInUser",user);
        } catch (error) {}
    },


};

const mutations = {
    setProducts(state, products) {
        state.products = products;
    },


    setUser(state, createdUser) {
        state.user = createdUser;
    },
    setLoggedInUser(state, loggedUser) {
        debugger;
        state.user = loggedUser;
        localStorage.setItem('user', JSON.stringify(loggedUser));
    },


};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
