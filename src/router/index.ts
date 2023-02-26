import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/products",
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

export default router;
