<template>
  <h4 class="w3-bar-item">Manage watchlists</h4>
  <button class="button btn2" v-on:click="terminateCon()">Terminate WS</button>

  <div class="tab">
    <div class="buttonDiv">
      <button class="button btn1" v-on:click="CreateWatchList()">
        Create New
      </button>
    </div>
    <button class="tablinks" v-for="(item, index) in watchLisArr" v-bind:key="index" v-on:click="openTab(item+index)">
      {{ item }}
    </button>
  </div>

  <div style="margin-left:130px">
    <div class="tabcontent city" v-for="(item, index) in watchLisArr" v-bind:key="index" v-bind:id="item+index"
         style="display:none">
      <watchList v-bind:name="item"/>
    </div>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="showModal">
        <input type="text" v-model="watchListName" placeholder="Enter watchlist name...">
        <br>
        <button class="button btn3" v-on:click="confirmCreate(watchListName)" @click="showModal = false">
          Confirm
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import watchList from "./Watchlist";
import {mapActions} from "vuex";

export default {
  name: "watchListTab",
  components: {
    watchList,
  },
  computed: {},
  created() {
    this.initCon();
  },
  methods: {
    ...mapActions([
      "handleSubscription"
    ]),
    initCon() {
      this.handleSubscription({type: "init", symbol: ""});
    },
    CreateWatchList() {
      this.showModal = true;
    },
    confirmCreate(watchListName) {
      this.watchLisArr.push(watchListName);
      this.showModal = false;
      this.watchListName = '';
    },
    terminateCon() {
      this.handleSubscription({type: "terminate", symbol: ""});
    },
    openTab(currencyName) {
      var i;
      var x = document.getElementsByClassName("city");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      document.getElementById(currencyName).style.display = "block";
    }
  },
  data() {
    return {
      watchLisArr: ["My WatchList 1", "My Trade WatchList 2"],
      showModal: false,
      watchListName: 'My Watchlist X'
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

.logo {
  width: 50px;
  height: 50px;
}

.logoContainer {
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

.buttonDiv {
  float: right;
  margin-right: 0px;
}

.button {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  color: #FFF;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
}

.btn1 {
  background-image: linear-gradient(to right, darkgreen, mediumseagreen);
  font-size: 12px;
  font-weight: 400;
  padding: 10px 15px;
  border-radius: 8px;
}

.btn2 {
  background-image: linear-gradient(to right, darkred, red);
  font-size: 8px;
  font-weight: 200;
  padding: 5px 10px;
  border-radius: 4px;
}

.btn3 {
  background-image: linear-gradient(to right, darkgreen, green);
  font-size: 10px;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 8px;
}


.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;

  width: 80%;
  max-width: 200px;
  background-color: #FFF;
  border-radius: 14px;
  padding: 10px;
}

h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}

p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}

input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  background-color: #3CBC8D;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}

</style>
