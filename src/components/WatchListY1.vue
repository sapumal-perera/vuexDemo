<template>
  <div class="counter">
    <h6>watchlist y-1</h6>
    <div class="selectBox">
      <Multiselect
          v-model="SelectedValues"
          mode="tags"
          placeholder="Symbol search.."
          :options="options"
          :search="true"
          @select="selectItem"
          @deselect="removeItem"
          object="true"
      />
    </div>
    <div>
      <div>
        <div class="priceBox">
          <span class="valueBox" >Symbol</span>
          <span class="valueBox">Open</span>
          <span class="valueBox">High</span>
          <span class="valueBox">Low</span>
          <span class="valueBox">Change</span>
        </div>
        <div class="priceBox" v-for="(item, index) in currencyListLocal" v-bind:key="index">
          <div v-if="item">
            <span class="valueBox" >{{ item.symbol}}</span>
            <span class="valueBox" >{{ item.open}}</span>
            <span class="valueBox">{{ item.high}}</span>
            <span class="valueBox">{{ item.low}}</span>
            <span class="valueBox">{{ item.change}}</span>
          </div>
        </div>
      </div>
      <div align="center">
        <div>
          <div>
            <button class="btn" @click="closeConnection">  Unsubscribe All </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState, mapGetters, mapActions } from "vuex";
import Multiselect from '@vueform/multiselect'
export default {

  name: "WatchListY1",
  computed: {
    ...mapState("watchListY", ['usd']),
    ...mapGetters("watchListY", ["parity"]),

    // settings() {
    //   return this.currencyListLocal;
    // }
  },
  components: { Multiselect },
  created: function() {
    this.initCon();
  },
  methods: {
    ...mapActions("watchListY", [
      "handleSubscription",
    ]),
    initCon() {
     // this.handleSubscription({type: "init", symbol:""});
    },


    selectItem(option) {
      this.currencyListLocal.push(option.label);
      this.handleSubscription({type: "add", symbol:option.label});
    },

    removeItem(option) {
      let index = this.currencyListLocal.indexOf(option.label);
      this.currencyListLocal.splice(index,1);
      this.handleSubscription({type: "remove", symbol:option.label});
    },
    watchStateChange () {
      let self=this;
      let currencies = ['usd', 'eur', 'eth', 'xrp'];
      for(let currency of currencies) {
        self.$watch(currency, function (newVal, oldVal) {

          if(newVal.high > oldVal.high) {
          window.alert(newVal.symbol);
          }
          // do something
        }, {
          deep: true
        })
      }
    }
  },
  data()  {
    return {
      numberStore : [],
      title: 'Watch List ($)',
      currencyListLocal : [],
      SelectedValues: [],
      options: ["btc","eth","xrp","ltc"]
    }
  }
};
</script>

<style scoped>
.counter {
  margin-top: 25px;
  height: 500px;
}
h1 {
  font-size: 48px;
}
.btn-group {
  margin-top: 25px;
}
.priceBox{
  background-color: lightcyan;
  border: 1px solid;
  box-shadow: 5px 10px #888888;
}

.valueBox{
  border-right: 1px solid darkblue;
  margin-right: 20px;
  padding-right: 20px;
  min-width: 100px;
  max-width: 100px;
  width: 100px;
  display: inline-block;
}

.btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 2px 1px;
  margin-top: 40px;
  cursor: pointer;
}
.selectBox {
  margin-bottom: 50px;
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>