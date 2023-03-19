// cart.js

import {instance} from "@/views/ProductsView/products";


const state = {
    items: [],
};

const getters = {
    cartItems: (state) => state.items,
};

const actions = {
    async addItemToCart({ commit }, payload) {
        try {
            const response = await instance.post("http://localhost:5000/api/Cart/cart", payload);
            commit("ADD_ITEM_TO_CART", response.data);
        } catch (error) {
            console.log(error);
        }
    },

    async fetchCartItems({ commit }) {
        try {
            const response = await instance.get("http://localhost:5000/api/Cart/getAll");
            commit("SET_CART_ITEMS", response.data);
        } catch (error) {
            console.log(error);
        }
    },

    async removeCartItem({ commit }, payload) {


        try {
            const response = await instance.delete("http://localhost:5000/api/Cart/removeItem", { data: {  itemId:payload.itemId } });
            commit("REMOVE_CART_ITEM", response.data);
        } catch (error) {
            console.log(error);
        }
    },

    async clearCart({ commit }) {
        try {
            await instance.delete("http://localhost:5000/api/Cart/clearCart");
            commit("CLEAR_CART");
        } catch (error) {
            console.log(error);
        }
    },

    async incrementCartItemQuantity({ commit }, payload) {
        try {
            const response = await instance.patch(`http://localhost:5000/api/Cart/${payload.itemId}/incrementQuantity`);
            commit("INCREMENT_CART_ITEM_QUANTITY", { itemId: payload.itemId, quantity: response.data.quantity, total: response.data.total });
        } catch (error) {
            console.log(error);
        }
    },

    async decrementCartItemQuantity({ commit }, payload) {
        try {
            const response = await instance.patch(`http://localhost:5000/api/Cart/${payload.itemId}/decrementQuantity`);
            debugger

            commit("DECREMENT_CART_ITEM_QUANTITY", { itemId: payload.itemId,quantity: response.data.quantity, total: response.data.total  });
        } catch (error) {
            console.log(error);
        }
    },
};

const mutations = {
    ADD_ITEM_TO_CART(state, item) {
        debugger
        state.items.push(item);
    },

    SET_CART_ITEMS(state, items) {
        state.items = items;
    },

    REMOVE_CART_ITEM(state, itemId) {
        state.items = state.items.filter((item) => item.id !== itemId);
    },

    CLEAR_CART(state) {
        state.items = [];
    },

    INCREMENT_CART_ITEM_QUANTITY(state, payload) {
        const item = state.items.find((item) => item.id === payload.itemId);
        item.quantity = payload.quantity;
        item.total = payload.total;
    },
    DECREMENT_CART_ITEM_QUANTITY(state, payload) {
        const item = state.items.find((item) => item.id === payload.itemId);
        item.quantity = payload.quantity;
        item.total = payload.total;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
