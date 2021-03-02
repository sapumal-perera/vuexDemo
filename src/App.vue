<template>
  <div id="app">
    <div class="container">
     <div align="center"> </div>
      <div id="nav">
        <ul>
      <li> <router-link to="/watchLists">Watchlist</router-link></li>
          <li>   <router-link to="/priceValues">priceValues</router-link></li>
          <li>   <router-link to="/feedback">Feedback</router-link></li>
          <li>  <router-link to="/orderBook">OrderBook</router-link></li>
          <li class="logoContainer"><img class="logo" alt="Vue logo" src="./assets/vuex.png"></li>
        </ul>
      </div>
      <div class="component-container">
      <router-view />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "app",
  components: {
  }
};
</script>

<style>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  line-height: 1.6;
  background: #e8f7f0;
}
.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}

.logo{
  width: 50px;
  height: 50px;
}

.logoContainer{
  float: right;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #4CAF50;
}
.component-container {
  margin: 5%;
  border: 1px solid #cccccc;
  height: 100%;
}

</style>
