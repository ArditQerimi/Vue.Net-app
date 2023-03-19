<template>
  <div style="background-color:#dfdfdf;" class="d-flex align-items-center w-100 justify-content-center p-2">


    <v-card width="450">
      <v-card-title class="text-center">Register</v-card-title>

      <v-card-text class="">
        <v-text-field
            v-model="username"
            label="Username"
            type="text"
            :error-messages="getErrorMessage(usernameError)"
            :class="getInputClass(usernameError)"
            @input="handleUsernameChange"
            @blur="handleUsernameBlur"
            outlined
            dense
            required
        ></v-text-field>

        <v-text-field
            v-model="firstName"
            label="First Name"
            type="text"
            :error-messages="getErrorMessage(firstNameError)"
            :class="getInputClass(firstNameError)"
            @input="handleFirstnameChange"
            @blur="handleFirstnameBlur"
            outlined
            dense
            required
        ></v-text-field>

        <v-text-field
            v-model="lastName"
            label="Last Name"
            type="text"
            :error-messages="getErrorMessage(lastNameError)"
            :class="getInputClass(lastNameError)"
            @input="handleLastnameChange"
            @blur="handleLastnameBlur"
            outlined
            dense
            required
        ></v-text-field>

        <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :error-messages="getErrorMessage(emailError)"
            :class="getInputClass(emailError)"
            required
            density="comfortable"
            @input="handleEmailChange"
            @blur="handleEmailBlur"
        ></v-text-field>

        <v-text-field
            v-model="password"
            label="Password"
            :error-messages="getErrorMessage(passwordError)"
            :class="getInputClass(passwordError)"
            outlined
            density="comfortable"
            type="password"
            required
            @blur="handlePasswordBlur"
            @input="handlePasswordChange"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="w-100" variant="elevated" @click="handleSubmit">Register now</v-btn>
        </v-card-actions>

      </v-card-text>
      <div style="display:flex; justify-content:center; flex-direction: column; align-items: center; gap: 1px; margin:10px 0; font-size:16px">
        <p class="m-0">Already have an account? <router-link to="/login">Login now</router-link></p>
        <p class="m-0">Or, go to <router-link to="/home">Home</router-link></p>
      </div>
    </v-card>

  </div>
</template>



<script>

export default {
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
      showPassword: false,
      usernameError: "",
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
      termsError: "",
      validation: false,
    };
  },
  methods: {
    handleEmailChange(event) {
      const {value} = event.target;
      this.email = value;
      this.validateEmail(value);
    },
    handleUsernameChange(event) {
      const {value} = event.target;
      this.username = value;
      this.validateUsername(value);
    },
    handleFirstnameChange(event) {
      const {value} = event.target;
      this.firstName = value;
      this.validateFirstName(value);
    },
    handleLastnameChange(event) {
      const {value} = event.target;
      this.lastName = value;
      this.validateLastName(value);
    },
    handlePasswordChange(event) {
      const {value} = event.target;
      this.password = value;
      this.validatePassword(value);
    },
    handleEmailBlur() {
      this.validateEmail(this.email);
    },
    handlePasswordBlur() {
      this.validatePassword(this.password);
    },
    handleFirstnameBlur() {
      this.validateFirstName(this.password);
    },
    handleLastnameBlur() {
      this.validateLastName(this.password);
    },
    handleUsernameBlur() {
      this.validateUsername(this.password);
    },
    handleSubmit(event) {
      event.preventDefault();
      this.validateAllFields();
      this.validation = true;
      if (this.formIsValid()) {
        const userInfo = {
          email: this.email,
          password: this.password,
          userName:this.username,
          firstName:this.firstName,
          lastName:this.lastName,
        };
        this.$store.dispatch(`auth/registerUser`, userInfo);
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
    validateUsername(value) {
      if (!value) {
        this.usernameError = 'Username is required';
      } else {
        this.usernameError = '';
      }
    },
    validateFirstName(value) {
      if (!value) {
        this.firstNameError = 'First name is required';
      } else {
        this.firstNameError = '';
      }
    },
    validateLastName(value) {
      if (!value) {
        this.lastNameError = 'Last name is required';
      } else {
        this.lastNameError = '';
      }
    },
    validateAllFields() {
      this.validateEmail(this.email);
      this.validatePassword(this.password);
      this.validateFirstName(this.firstName);
      this.validateLastName(this.lastName);
      this.validateUsername(this.username);
    },
    formIsValid() {
      return !this.emailError && !this.passwordError && !this.lastNameError && !this.firstNameError && !this.usernameError;
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
    }
  }}

</script>

