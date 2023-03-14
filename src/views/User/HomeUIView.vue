<script >



import {mapState} from "vuex";
import login from "@/views/RegisterVIew/Login.vue";
import router from "@/router";

export default {
  name: "HomeUIView",
  data () {
    return {
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      search: '',
      // user: {
      //   name: 'John Doe',
      //   email: 'johndoe@example.com',
      //   avatarUrl: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      // },
      // user:null,

      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
          'https://d-themes.com/vue/porto/demo-4/images/home/slider/slide-2.jpg',
          'https://static.vecteezy.com/system/resources/previews/002/294/859/original/flash-sale-web-banner-design-e-commerce-online-shopping-header-or-footer-banner-free-vector.jpg'
        // 'First',
        // 'Second',
        // 'Third',
        // 'Fourth',
        // 'Fifth',
      ],
      sidebar: true,
      searchTerm: '',
      selectedCategory: '',
      selectedColor: '',
      selectedSize: '',
      products2: [
        { name: 'Product A', category: 'Category 1', color: 'Red', size: 'Small', image: 'https://source.unsplash.com/500x500/?product,red' },
        { name: 'Product B', category: 'Category 1', color: 'Blue', size: 'Medium', image: 'https://source.unsplash.com/500x500/?product,blue' },
        { name: 'Product C', category: 'Category 2', color: 'Green', size: 'Large', image: 'https://source.unsplash.com/500x500/?product,green' },
        { name: 'Product D', category: 'Category 3', color: 'Yellow', size: 'Small', image: 'https://source.unsplash.com/500x500/?product,yellow' },
        { name: 'Product E', category: 'Category 3', color: 'Pink', size: 'Medium', image: 'https://source.unsplash.com/500x500/?product,pink' },
      ],
      categories: ['Category 1', 'Category 2', 'Category 3'],
      colors2: ['Red', 'Blue', 'Green', 'Yellow'],
      sizes: ['Small', 'Medium', 'Large'],
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      products:(state)=>state.auth.products
    }),
    filteredProducts() {
      let filtered = this.products;
      if (this.searchTerm) {
        filtered = filtered.filter(product => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
      if (this.selectedCategory) {
        filtered = filtered.filter(product => product.category === this.selectedCategory);
      }
      if (this.selectedColor) {
        filtered = filtered.filter(product => product.color === this.selectedColor);
      }
      if (this.selectedSize) {
        filtered = filtered.filter(product => product.size === this.selectedSize);
      }
      return filtered;
    },
  },
  methods: {
    push() {
      return push
    },

    async logOut(actionType) {
      await this.$store.dispatch(`auth/${actionType}`);
    },
    async logOutUser() {
      await this.logOut("logOut");
    },
    logout() {
      // Your logout logic here
    },
    toAdmin(){
      window.location.href = '/admin'
    }

  },
  created() {

    this.$store.dispatch("auth/fetchProducts");
  },
};



</script>
<template>
  <v-app>
    <v-app-bar app style="position: relative">
      <div style="margin-inline: 10px">
        <v-img src="https://wtmarketing.com/wp-content/uploads/2019/04/1280px-Shopify_logo_2018.svg.png" alt="Logo" style="width:100px; height: 50px"></v-img>
      </div>
      <v-spacer></v-spacer>

      <div style="display: flex; width:400px; align-items:center; gap:5px">

      <v-text-field
          clearable
          v-model="search"
          label="Search"
          hide-details
          solo-inverted
          density="compact"
          variant="solo"
      >
      </v-text-field>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>


      <v-menu v-if="this.user"  >
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" alt="User avatar"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="this.toAdmin">
            <v-list-item-avatar>
              <v-img
                  src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                  alt="User avatar"
                  style="width: 50px"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.UserName }} </v-list-item-title>
              <v-list-item-subtitle>{{ user.Email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="logOutUser">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div v-else>

      <v-btn to="/login">Login</v-btn>
      <v-btn to="/register">Register</v-btn>
      </div>

    </v-app-bar>
    <v-main style="  --v-layout-top: 0px;
  padding-top: var(--v-layout-top);">
      <v-carousel
          cycle
          height="450"
          show-arrows="hover"
hide-delimiter-background
      >
        <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
        >
          <v-sheet
              height="100%"
          >
            <div class="d-flex fill-height justify-center align-center">
                <img :src='slide' style="object-fit: contain; height:100%"/>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-sidebar v-model="sidebar" app>
              <v-list>
                <v-list-item>
                  <v-text-field v-model="searchTerm" label="Search by name" />
                </v-list-item>
                <v-list-item>
                  <v-select v-model="selectedCategory" :items="categories" label="Category" />
                </v-list-item>
                <v-list-item>
                  <v-select v-model="selectedColor" :items="colors" label="Color" />
                </v-list-item>
                <v-list-item>
                  <v-select v-model="selectedSize" :items="sizes" label="Size" />
                </v-list-item>
              </v-list>
            </v-sidebar>
          </v-col>
          <v-col cols="12" sm="6" md="9">
            <v-row>
              <v-col v-for="(product, index) in filteredProducts" :key="index" cols="12" sm="12" md="6" lg="4">
                <v-card>
                  <v-img src='https://mahadevfastfoodvns.websites.co.in/twenty-seventeen/img/product-placeholder.png' height="200"></v-img>
                  <v-card-title>{{ product.name }}</v-card-title>
                  <v-card-text>
                    <p>Category: {{ product.category.name }}</p>
                    <p>Color: <span v-for="color in product.colors">
                   <span style="margin-right: 2px">{{color.name}}</span>
                  </span></p>
                    <p>Size: {{ product.size.test }}</p>
                    <p>User: {{ product.userId }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
        <v-footer
            class="bg-indigo-lighten-1 text-center d-flex flex-column"
            style="background-color: #1E88E5 !important;"
        >
          <div>
            <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4"
                :icon="icon"
                variant="text"
            ></v-btn>
          </div>

          <div class="pt-0">
            We are a leading e-commerce platform offering a wide selection of products including clothing, electronics, home goods, and more. Our mission is to provide our customers with the best shopping experience possible, from the moment they browse our products to the moment they receive their order. We are committed to offering high-quality products at affordable prices, and we are constantly updating our inventory to stay up-to-date with the latest trends and technology.
          </div>

          <v-divider></v-divider>

          <div>
            {{ new Date().getFullYear() }} — <strong>My E-Commerce App</strong>
          </div>

    </v-footer>
  </v-app>

</template>
<style>
.v-carousel .v-window-dots .v-window-dot {
  background-color: white !important;
}

.v-carousel__controls .v-btn .v-btn__content .v-icon {
  color: white;
}
.v-carousel__controls .v-btn .v-btn__content  .v-btn--active .v-icon {
  background:white;

}
</style>