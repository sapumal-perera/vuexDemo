<template>
  <div class="counter">
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
        <div class="priceBox" v-for="(item, index) in currencyList" v-bind:key="index">
          <div v-if="payload[item]">
            <span class="valueBox" >{{ payload[item].symbol}}</span>
            <span class="valueBox" >{{ payload[item].open}}</span>
            <span class="valueBox">{{ payload[item].high}}</span>
            <span class="valueBox">{{ payload[item].low}}</span>
            <span class="valueBox">{{ payload[item].change}}</span>
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

  name: "WatchListX1",
  computed: {
    ...mapState("watchListX", ["count","payload"]),
    ...mapGetters("watchListX", ["parity"])
  },
  components: { Multiselect },
  created: function() {
  },
  methods: {
    ...mapActions("watchListX", [
      "handleSubscription",
    ]),



    selectItem(option) {
      this.currencyList.push(option.label);
      this.handleSubscription({type: "add", symbol:option.label});
    },

    removeItem(option) {
       let index = this.currencyList.indexOf(option.label);
      this.currencyList.splice(index,1);
      this.handleSubscription({type: "remove", symbol:option.label});
    }
  },
  data()  {
    return {
      numberStore : [],
      title: 'Watch List ($)',
      currencyList : [],
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