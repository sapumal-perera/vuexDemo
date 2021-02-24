<template>
  <h5 class="w3-bar-item">Price values</h5>
  <div class="tab">
    <button class="tablinks" v-on:click="openTab('Usd')">USD </button>
    <button class="tablinks" v-on:click="openTab('Btc')">BTC </button>
  </div>

  <div style="margin-left:130px">

    <div class="tabcontent city" id="Usd"  style="display:none">
     <CurrentPriceUSD/>
    </div>

    <div id="Btc" class="tabcontent city" style="display:none">
      <CurrentPriceBTC/>
    </div>
  </div>
</template>

<script>
import CurrentPriceUSD from "./CurrentPriceUSD";
import CurrentPriceBTC from "./CurrentPriceBTC";
export default {
  name: "PriceValues",
  components: {
    CurrentPriceUSD,
    CurrentPriceBTC
  },
  methods: {
    openTab(currencyName) {
      var i;
      var x = document.getElementsByClassName("city");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      document.getElementById(currencyName).style.display = "block";
    }
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
}


.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}


.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}

.tab button:hover {
  background-color: #ddd;
}

.tab button.active {
  background-color: #ccc;
}


.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
}

</style>
