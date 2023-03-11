import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import AdminLayout from "@/AdminLayout/AdminLayout.vue";

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
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/admin",
          name: "home",
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/admin/products",
          name: "products",
          component: () => import("../views/ProductsView/ProductsView.vue"),
        },
        {
          path: "/admin/categories",
          name: "categories",
          component: () => import("../views/CategoriesView/CategoriesView.vue"),
        },
        {
          path: "/admin/sizes",
          name: "sizes",
          component: () => import("../views/SizesView/ProductSizesView.vue"),
        },
        {
          path: "/admin/colors",
          name: "colors",
          component: () => import("../views/ColorsView/ProductColorsView.vue"),
        },
      ],
    },

  ],
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ path: '/login' });
  } else if (to.path === '/login' || to.path === '/register') {
    if (isLoggedIn) {
      next({ path: '/admin' });
    } else {
      next();
    }
  } else {
    next();
  }
});



export default router;
