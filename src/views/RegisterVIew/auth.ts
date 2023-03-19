import axios from "axios";
import '../../axios/axios'
import shopAxios from "@/axios/axios";
import landingPageAxios from "@/axios/LandingPageAxios";
import router from "@/router";
// @ts-ignore
import jwt_decode from "jwt-decode";
import {instance} from "@/views/ProductsView/products";
// @ts-ignore
const state = () => ({
    products: [],
    user:JSON.parse(localStorage.getItem('user')) || null,

});

const actions = {
    async fetchProducts({ commit }) {
        try {
            const products = await landingPageAxios.get(
                "http://localhost:5000/api/Products/getAllProducts"
            );
            commit("setProducts", products.data.reverse());
        } catch (error) {
            console.error(error);
        }
    },

    async filterProducts({ commit }, payload) {
        try {
            const response = await landingPageAxios.post(
                `http://localhost:5000/api/Products/Filter`,
                payload
            );
            commit("setFilter", response.data);
        } catch (error) {}
    },

    async registerUser({ commit }, payload) {
        try {
            const response = await shopAxios.post(
                `http://localhost:5000/api/Auth/register`,
                payload
            );
            localStorage.setItem('accessToken', response.data.token);
            const user = jwt_decode(response.data.token) as any;
            await router.push('/home')
            commit("setUser", user);

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
        async logOut({commit}, payload){
        try {
            window.location.href = "/home";
            await router.push('/home')
            commit("setLogoutUser",);
        } catch (e) {

        }
    }


};

const mutations = {
    setProducts(state, products) {
        state.products = products;
    },
    setFilter(state, products) {
        state.products = products;
    },


    setUser(state, createdUser) {
        state.user = createdUser;
    },
    setLoggedInUser(state, loggedUser) {
        state.user = loggedUser;
        localStorage.setItem('user', JSON.stringify(loggedUser));
    },
    setLogoutUser(state) {
        state.user = null;
        localStorage.removeItem('accessToken');
    },



};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
