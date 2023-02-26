<template>
  <div class="navbar">
    <ul>
      <li><router-link to="/home">Home</router-link></li>
      <li><router-link to="/products">Products</router-link></li>
      <li><router-link to="/categories">Categories</router-link></li>
      <li><router-link to="/sizes">Sizes</router-link></li>
      <li><router-link to="/colors">Colors</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
.navbar {
  background-color: #333;
  overflow: hidden;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar li {
  float: left;
}

.navbar li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.navbar li a:hover {
  background-color: #111;
}
</style>
