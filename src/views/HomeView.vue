<script >



import {mapState} from "vuex";

export default {
  name: "HomeView",
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      products:(state)=>state.auth.products
    }),
  },
  methods: {
    async logOut(actionType) {
      await this.$store.dispatch(`auth/${actionType}`);
    },
    async logOutUser() {
      await this.logOut("logOut");
    },
  },
  created() {

    this.$store.dispatch("auth/fetchProducts");
  },
};

</script>

<template>
  <main>
    <div style="background-color: #fff; height:100vh; display:flex;flex-direction:column; align-items: center;justify-content: center">
      <div>Email: {{this.user && this.user.Email}} <br/>
      UserName: {{this.user && this.user.UserName}} </div>
      <div>
      <v-btn color="success" @click="logOutUser()">Logout</v-btn>
      </div>

    </div>
  </main>
</template>
