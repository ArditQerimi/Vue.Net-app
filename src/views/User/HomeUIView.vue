<script >


import {mapActions, mapGetters, mapState} from "vuex";
import login from "@/views/RegisterVIew/Login.vue";
import router from "@/router";

export default {
  name: "HomeUIView",
  data () {
    return {
      search: '',
      selectedName:'',
      selectedSize: "",
      selectedCategory: "",
      selectedColor: '',
      selectedPriceRange:[0,1000],
      selectedUser:'',

      slides: [
          'https://d-themes.com/vue/porto/demo-4/images/home/slider/slide-2.jpg',
          'https://static.vecteezy.com/system/resources/previews/002/294/859/original/flash-sale-web-banner-design-e-commerce-online-shopping-header-or-footer-banner-free-vector.jpg'
      ],
      sidebar: true,
      searchTerm: '',

      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      value:[0, 1000],
      cart: [
        { name: 'Product 1', price: 10, quantity: 1 },
        { name: 'Product 2', price: 20, quantity: 2 },
        { name: 'Product 3', price: 30, quantity: 3 },
      ],
      showCart: false,
      drawer:true,
      totalPrice:null
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      products:(state)=>state.auth.products,
      categories:(state)=> state.products.categories,
      sizes:(state)=> state.products.sizes,
      colors:(state)=> state.products.colors,
      items: state => state.cart.items
    }),
    ...mapGetters("cart", ["cartItems"]),
    sizesName() {
      return this.sizes.map((size) => size.name);
    },
    colorsName() {
      return this.colors.map((color) => color.name);
    },
    categoriesName() {
      return this.categories.map((category) => category.name);
    },
    cartTotal(){
      let totalPrice = 0;
      for (let i = 0; i < this.items.length; i++) {
        totalPrice += this.items[i].total;
      }
      return totalPrice
    }

  },
  methods: {
    ...mapActions("cart", ["addItemToCart",
      "incrementCartItemQuantity",
      "decrementCartItemQuantity",
        "removeCartItem",
        "clearCart"

    ]),
    isItemInCart(productId){
      const foundedItem = this.items?.findIndex((item)=> item.product.id === productId);
      return foundedItem > -1
    },
    addToCart(productId) {
      const foundedItem = this.items?.findIndex((item)=> item.product.id === productId)
      const isInCart = foundedItem > -1
      if(!isInCart) {
        this.addItemToCart({ productId: productId });
      }
    },
    incrementQuantity(itemId) {
      this.incrementCartItemQuantity({ itemId: itemId });
      this.$store.dispatch("cart/fetchCartItems");
    },
    decrementQuantity(itemId) {
      this.decrementCartItemQuantity({ itemId: itemId });
      this.$store.dispatch("cart/fetchCartItems");
    },
    clearCartItems() {
      this.clearCart();
    },
    removeItem(itemId){
      const itemToRemove = {
        itemId: itemId
      }
      this.removeCartItem(itemToRemove)
    },
    toggleCart(){
      this.showCart = !this.showCart
    },
     async onFilter(){
       const filter = {
         name:this.selectedName,
         price:this.selectedPriceRange,
         color:this.selectedColor,
         size:this.selectedSize,
         category:this.selectedCategory,
         user: this.selectedUser,
       }
       await this.$store.dispatch('auth/filterProducts', filter)
     },
    async onClear() {
          this.selectedName='';
          this.selectedSize= "";
          this.selectedCategory= "";
          this.selectedColor= '';
          this.selectedPriceRange=[0,1000];
          this.selectedUser='';
          await this.$store.dispatch('auth/filterProducts', {})
    },
    async logOut(actionType) {
      await this.$store.dispatch(`auth/${actionType}`);
    },
    async logOutUser() {
      await this.logOut("logOut");
    },
    toAdmin(){
      window.location.href = '/admin'
    }

  },


  created() {
    this.$store.dispatch("auth/filterProducts",{});
    this.$store.dispatch("products/fetchCategories");
    this.$store.dispatch("products/fetchSizes");
    this.$store.dispatch("products/fetchColors");
    this.$store.dispatch("cart/fetchCartItems");

  },

};



</script>
<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
          v-model="showCart"
          temporary
          location="right"

      >
<v-banner-text class="p-2 text-center font-weight-bold text-h6">Shopping cart</v-banner-text>
        <v-list class="p-2">
          <v-list-item-group>
            <v-card v-for="(item, index) in cartItems" :key="item.id" class="mb-3" elevation="2">
            <v-list-item >
              <div  class="d-flex flex-column gap-2">
                <div class="d-flex align-center">
                  <img style='height:50px; width:50px' src="https://mahadevfastfoodvns.websites.co.in/twenty-seventeen/img/product-placeholder.png" />
                  <div class="d-flex flex-column pl-2">
                    <v-list-item-title class="text-body-1 font-weight-medium">{{ item?.product?.name }}</v-list-item-title>
                    <v-list-item-subtitle class="text-body-3">Price: {{ item?.product?.price }}</v-list-item-subtitle>
                  </div>
                </div>
                <div class="d-flex align-center">
                  <div class="d-flex align-center w-50">

                <v-btn small class="ml-2" color="primary" size="30" style="width:30px" :disabled="item.quantity === 1" @click="decrementQuantity(item.id)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                    <div class="quantity">{{ item?.quantity }}</div>

                    <v-btn small class="ml-auto mr-2" size="30" style="width:30px" color="primary" @click="incrementQuantity(item.id)" >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                  <div class="w-50 d-flex justify-content-between align-center">
                    <div class="total text-center ml-2"> Total: {{ item?.total }}</div>

                    <v-btn  small icon size="30" style="width:30px" class="delete-btn" color="error" @click="removeItem(item.id)" >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>

                  </div>

              </div>
            </v-list-item>
            </v-card>
          </v-list-item-group>
          <v-divider></v-divider>
          <div class="d-flex justify-space-between align-center mt-2 total-container">
            <div class="text-body-2 font-weight-medium">Total:</div>
            <div class="total">{{ cartTotal }}</div>
          </div>
        </v-list>


      </v-navigation-drawer>
      <v-main>
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
              <v-btn icon @click="toggleCart">
                <v-badge :content="Number(items?.length)" color="error">
                  <v-icon>mdi-cart-outline</v-icon>
                </v-badge>

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
                        <v-text-field v-model="selectedName" label="Search by name" density="comfortable" hide-details/>
                      </v-list-item>
                      <v-list-item>
                        <v-text-field v-model="selectedUser" label="Search by UserName" density="comfortable" hide-details />
                      </v-list-item>
                      <v-list-item>
                        <v-card style="paddingTop: 15px">
                          <v-card-text >
                            <v-range-slider
                                v-model="selectedPriceRange"
                                :min="0"
                                :max="1000"
                                :step="10"
                                density="comfortable"
                                label="Price"
                                thumb-label="always"
                                hide-details
                                style="
                                 .v-slider__thumb-label {
                                    font-size: 16px;
                                  }
                                "

                            ></v-range-slider>
                          </v-card-text>
                        </v-card>
                      </v-list-item>
                      <v-list-item>

                        <v-select v-model="selectedCategory" :items="categoriesName" label="Category" density="comfortable" hide-details/>
                      </v-list-item>
                      <v-list-item>
                        <v-select v-model="selectedColor" :items="colorsName" label="Color" density="comfortable" hide-details/>
                      </v-list-item>
                      <v-list-item>
                        <v-select v-model="selectedSize" :items="sizesName" label="Size" density="comfortable" hide-details/>
                      </v-list-item>

                    </v-list>
                    <v-btn width="100%" style="cursor:pointer; margin-bottom:6px" color="light-green" dark @click="this.onFilter">Filter</v-btn>
                    <v-btn width="100%" style="cursor:pointer" color="orange lighten-2" dark @click="this.onClear">Clear</v-btn>

                  </v-sidebar>
                </v-col>
                <v-col cols="12" sm="6" md="9">
                  <v-row>
                    <v-col v-for="(product, index) in this.products" :key="index" cols="12" sm="12" md="6" lg="4">

                      <v-card
                          class="mx-auto "
                          max-width="300"
                      >
                        <template v-slot:loader="{ isActive }">
                          <v-progress-linear
                              :active="isActive"
                              color="deep-purple"
                              height="4"
                              indeterminate
                          ></v-progress-linear>
                        </template>

                        <v-img
                            cover
                            height="200"
                            src="https://mahadevfastfoodvns.websites.co.in/twenty-seventeen/img/product-placeholder.png"
                        ></v-img>

                        <v-card-item>
                          <v-card-title>{{ product.name }}</v-card-title>

                          <v-card-subtitle>
                            <span class="me-1">{{ product.category.name }}</span>

                            <v-icon
                                color="error"
                                icon="mdi-fire-circle"
                                size="small"
                            ></v-icon>
                          </v-card-subtitle>
                        </v-card-item>

                        <v-card-text class="m-0 pb-0">
                          <v-row
                              align="center"
                              class="mx-0"
                          >
                            <v-rating
                                :model-value="product.rating"
                                color="amber"
                                density="compact"
                                half-increments
                                readonly
                                size="small"
                            ></v-rating>

                            <div class="text-grey ms-4">
                              {{ product.rating }} ({{  }} 23 reviews)
                            </div>
                          </v-row>

                          <div class="mt-3 text-subtitle-1">
                            {{ product.price }}€ • {{ product.size.name }}
                          </div>

                          <!--                    <div>{{ product.description }}</div>-->

                          <div class="my-1 text-subtitle-2">
                            Posted by: {{ product.user?.userName }}
                          </div>
                        </v-card-text>

                        <v-divider class="mx-4 mb-1"></v-divider>

                        <v-card-actions class="justify-content-end">
                          <v-btn
                              color="deep-purple-lighten-2"
                              variant="outlined"
                              @click="addToCart(product.id)"
                              :disabled="isItemInCart(product.id)"
                              :hidden="product?.user?.id == user?.UserId"
                          >
                          {{isItemInCart(product.id) ? 'In Cart' : 'Add to Cart'}}
                          </v-btn>
                          <v-card-subtitle :hidden="product?.user?.id != user?.UserId">{{'Your product'}}</v-card-subtitle>
                        </v-card-actions>
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



        <v-container>





        </v-container>
      </v-main>
    </v-layout>
  </v-card>

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

.quantity {
  margin: 0 10px;
  font-size: 16px;
  font-weight: 500;
}
.total {
  font-size: 16px;
  font-weight: 500;
}
.delete-btn {
  padding: 4px;
  width: 40px;
  height: 40px;
  min-width: 0;
}
.total-container {
  margin-top: 20px;
}
</style>