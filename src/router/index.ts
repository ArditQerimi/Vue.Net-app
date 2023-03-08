import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/RegisterVIew/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterVIew/Register.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/products",
      name: "products",
      component: () => import("../views/ProductsView/ProductsView.vue"),
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("../views/CategoriesView/CategoriesView.vue"),
    },
    {
      path: "/sizes",
      name: "sizes",
      component: () => import("../views/SizesView/ProductSizesView.vue"),
    },
    {
      path: "/colors",
      name: "colors",
      component: () => import("../views/ColorsView/ProductColorsView.vue"),
    },
  ],
});



router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  if (to.path === '/login' || to.path === '/register') {

    if (isLoggedIn) {
      next({ path: '/home' });
    } else {
      next();
    }
  } else {
    if (!isLoggedIn) {
      next({ path: '/login' });
    } else {
      next();
    }
  }
});



export default router;
