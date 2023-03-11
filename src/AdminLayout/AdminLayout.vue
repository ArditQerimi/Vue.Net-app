<script>
import HomeView from "@/views/HomeView.vue";
import NavbarView from "@/views/NavbarView.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";
import ProductsView from "@/views/ProductsView/ProductsView.vue";
import CategoriesView from "@/views/CategoriesView/CategoriesView.vue";
import ProductSizesView from "@/views/SizesView/ProductSizesView.vue";
import ProductColorsView from "@/views/ColorsView/ProductColorsView.vue";


export default {
  components: {ProductColorsView, ProductSizesView, CategoriesView, ProductsView, HomeView},

  data() {
    return {
      drawer: true,
      rail: false,
      navItems: [
        {
          title: 'User Home',
          value: 'home',
          path: '/home',
          icon:'mdi-home'
        },
        {
          title: 'Admin Home',
          value: 'home',
          path: '/admin',
          icon:'mdi-home-account'
        },
        {
          title: 'Products',
          value: 'products',
          path: '/admin/products',
          icon: 'mdi-basket-outline'
        },
        {
          title: 'Categories',
          value: 'Categories',
          path: '/admin/categories',
          icon:'mdi-shape'
        },
        {
          title: 'Sizes',
          value: 'Sizes',
          path: '/admin/sizes',
          icon:'mdi-size-xl'
        },      {
          title: 'Colors',
          value: 'Colors',
          path: '/admin/colors',
          icon:'mdi-palette'
        },

      ],
      currentPath: null,
    }},
   mounted() {
    this.currentPath = (this.$route.path)
    },

};
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
      >
        <v-list-item
            prepend-avatar="https://scontent.fprn4-1.fna.fbcdn.net/v/t39.30808-6/331079199_580824200352423_6120570523418384426_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=q9wTzLM0kPAAX_LdpG0&_nc_ht=scontent.fprn4-1.fna&oh=00_AfANuXpwplSGlJm0ay2wSuU8InOlAwBwGG5ChQ7Dbmla3w&oe=641227C5"
            title="Ardit Qerimi"
            nav
        >
          <template v-slot:append>
            <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <router-link :to="navItem.path" v-for="navItem in navItems" :key="navItem.value">
            <v-list-item style="color: #000" :prepend-icon="navItem.icon" :title="navItem.title" :value="navItem.value"></v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-app-bar
            color="primary"
            prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>My files</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn variant="text" icon="mdi-magnify"></v-btn>

          <v-btn variant="text" icon="mdi-filter"></v-btn>

          <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
        </v-app-bar>


        <v-container>



          <div v-if="$route.path === '/admin'">
            <HomeView></HomeView>
          </div>
          <div v-if="$route.path === '/admin/products'">
            <ProductsView></ProductsView>
          </div>  <div v-if="$route.path === '/admin/categories'">
            <CategoriesView></CategoriesView>
          </div>  <div v-if="$route.path === '/admin/sizes'">
            <ProductSizesView></ProductSizesView>
          </div>  <div v-if="$route.path === '/admin/colors'">
            <ProductColorsView></ProductColorsView>
          </div>

        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>