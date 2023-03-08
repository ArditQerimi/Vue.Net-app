<script >



import {mapState} from "vuex";

export default {
  computed: {
    ...mapState({

      // user: (state) => (state.auth.user),
      user: (state) => (state.auth.user),
      // loading: (state) => state.loading,
      // error: (state) => state.error,
    }),
    watch() {
      console.log(this.user)
      console.log('component created');
    },
  }
}

</script>

<template>
  <main>
    <div style="background-color: #fff; height:100vh; display:flex; align-items: center;justify-content: center">
      Email: {{this.user && this.user.Email}} <br/>
      UserName: {{this.user && this.user.UserName}}

    </div>
  </main>
</template>
