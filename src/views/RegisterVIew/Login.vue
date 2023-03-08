<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form
          v-model="form"
          @submit.prevent="onSubmit"
      >
        <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Email"
        ></v-text-field>

        <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Password"
            placeholder="Enter your password"
        ></v-text-field>

        <br>

        <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>
<script>
import {mapState} from "vuex";

export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),

  methods: {
    onSubmit () {
      if (!this.form) return

      this.loading = true

      setTimeout(() => (this.loading = false), 2000)

      const userInfo = {
        email:this.email,
        password: this.password
      }
debugger
      this.$store.dispatch(`auth/loginUser`, userInfo);
    },
    required (v) {
      return !!v || 'Field is required'
    },
    async saveUser() {
      await this.onSubmit('loginUser');
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
}
</script>