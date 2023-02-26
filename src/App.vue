<script>
import HelloWorld from "./components/HelloWorld.vue";
import HomeView from "./views/HomeView.vue";
import NavbarView from "./views/NavbarView.vue";

export default {
  components: {
    "home-view": HomeView,
    "navbar-view": NavbarView,
    HelloWorld,
  },
};
</script>

<template>
  <navbar-view> </navbar-view>
  <router-view></router-view>
</template>

<style scoped></style>
