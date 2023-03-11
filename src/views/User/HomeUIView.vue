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
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  },
  computed: {

    ...mapState({
      user: (state) => state.auth.user,
      products:(state)=>state.auth.products
    }),
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
    <v-app-bar app >
      <div style="margin-inline-start: 10px; margin-right: 10px">
        <v-img src="https://wtmarketing.com/wp-content/uploads/2019/04/1280px-Shopify_logo_2018.svg.png" alt="Logo" style="width:100px; height: 50px"></v-img>
      </div>
<!--      <v-toolbar-title style="width: 125px"><v-img src="https://wtmarketing.com/wp-content/uploads/2019/04/1280px-Shopify_logo_2018.svg.png" alt="Logo" style="width:125px; height: 50px"></v-img></v-toolbar-title>-->
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


      <v-menu v-if="this.user">
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
    <v-main>
      <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows="hover"
      >
        <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
        >
          <v-sheet
              :color="colors[i]"
              height="100%"
          >
            <div class="d-flex fill-height justify-center align-center">
              <div class="text-h2">
                {{ slide }} Slide
              </div>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-main>
    <v-footer app>
      <!-- Footer content -->
    </v-footer>
  </v-app>

</template>
