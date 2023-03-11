<template>
  <router-link to="/home" ><v-btn color="success" >Home</v-btn></router-link>
  <v-card
      class="mx-auto"
      max-width="344"
      title="User Registration"
  >
    <v-container>
      <v-text-field
          v-model="username"
          color="primary"
          label="Username"
          variant="underlined"
      ></v-text-field>
      <v-text-field
          v-model="first"
          color="primary"
          label="First name"
          variant="underlined"
      ></v-text-field>

      <v-text-field
          v-model="last"
          color="primary"
          label="Last name"
          variant="underlined"
      ></v-text-field>

      <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          variant="underlined"
      ></v-text-field>

      <v-text-field
          v-model="password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
      ></v-text-field>

      <v-checkbox
          v-model="terms"
          color="secondary"
          label="I agree to site terms and conditions"
      ></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success" @click="saveUser()">
        Complete Registration

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import {mapState} from "vuex";

export default {
  data: () => ({
    first: null,
    last: null,
    email: null,
    password: null,
    username: null,
    terms: false,
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  created() {
    this.$store.dispatch("auth/registerUser");
  },

methods:{
  async setUser(actionType) {

    const newForm = {
      firstname: this.first,
      lastname: this.last,
      email: this.email,
      password: this.password,
      username: this.username,
    };
    this.$store.dispatch(`auth/${actionType}`, newForm);
  },
  async saveUser() {
    await this.setUser('registerUser');
  },
},


  watch: {

    user(user) {
      console.log(user);
    },
  },

}
</script>