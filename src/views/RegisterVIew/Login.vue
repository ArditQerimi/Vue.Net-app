<!--<template>-->
<!--  <div>-->
<!--    <label for="email">Email</label>-->
<!--    <input type="email" id="email" name="email" v-model="email" :class="getInputClass(emailError)" @change="handleEmailChange" @blur="handleEmailBlur" />-->
<!--    <span>{{ getErrorMessage(emailError) }}</span>-->

<!--    <label for="password">Password</label>-->
<!--    <input type="password" id="password" name="password" v-model="password" :class="getInputClass(passwordError)" @change="handlePasswordChange" @blur="handlePasswordBlur" />-->
<!--    <span>{{ getErrorMessage(passwordError) }}</span>-->

<!--    <button @click="handleSubmit">Submit</button>-->
<!--  </div>-->
<!--</template>-->
<template>
  <v-container style="padding:40px 0; height:100vh" class="d-flex align-center justify-center ">
    <v-card style="width: 100%; height:100%; ">
      <v-row style="width: 100%; height:100%">
        <v-col cols="12" md="6">
          <img style="width: 100%; height: 100%; object-fit: cover;" :src="randomPhotoUrl" alt="Random photo">
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center justify-center ">
          <div style="width: 100%">
            <v-card-title class="text-center">Login</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                    v-model="email"
                    :class="getInputClass(emailError)"
                    :error-messages="getErrorMessage(emailError)"
                    @input="handleEmailChange"
                    @blur="handleEmailBlur"
                    label="Email"
                    type="email"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :class="getInputClass(passwordError)"
                    :error-messages="getErrorMessage(passwordError)"
                    @input="handlePasswordChange"
                    @blur="handlePasswordBlur"
                    label="Password"
                    type="password"
                    required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="handleSubmit">Submit</v-btn>
            </v-card-actions>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

</template>

<script>
import {mapState} from "vuex";

export default {
  data: () => ({
    randomPhotoUrl: '',
    form: false,
    // email: null,
    isValidating:false,
    values: {
      email: '',
    },
    errors: {},
    loading: false,
    validation: false,
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  }),
  mounted() {
    this.fetchRandomPhoto()
  },

  methods: {

    async fetchRandomPhoto() {
      const response = await fetch('https://source.unsplash.com/random')
      this.randomPhotoUrl = response.url
    },
    handleEmailChange(event) {
      const { value } = event.target;
      this.email = value;
      this.validateEmail(value);
    },
    handlePasswordChange(event) {
      const { value } = event.target;
      this.password = value;
      this.validatePassword(value);
    },
    handleEmailBlur() {
      this.validateEmail(this.email);
    },
    handlePasswordBlur() {
      this.validatePassword(this.password);
    },
    handleSubmit(event) {
      event.preventDefault();
      this.validateAllFields();
      this.validation = true;

      if (this.formIsValid()) {
        const userInfo = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch(`auth/loginUser`, userInfo);
      }
    },
    validateEmail(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        this.emailError = 'Email is required';
      } else if (!emailRegex.test(value)) {
        this.emailError = 'Must be a valid email';
      } else {
        this.emailError = '';
      }
    },
    validatePassword(value) {
      if (!value) {
        this.passwordError = 'Password is required';
      } else {
        this.passwordError = '';
      }
    },
    validateAllFields() {
      this.validateEmail(this.email);
      this.validatePassword(this.password);
    },
    formIsValid() {
      return !this.emailError && !this.passwordError;
    },
    getErrorMessage(error) {
      if (this.validation && error) {
        return error;
      }
      return '';
    },
    getInputClass(error) {
      if (this.validation && error) {
        return 'error';
      }
      return '';
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