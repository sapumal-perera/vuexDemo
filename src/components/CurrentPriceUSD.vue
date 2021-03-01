<template>
  <div class="counter">
    <div>
      <div>
        <div class="priceBox">
          <span class="valueBox" >Symbol</span>
          <span class="valueBox">High</span>
          <span class="valueBox">Low</span>
          <span class="valueBox">Change</span>
        </div>
        <div class="priceBox" v-for="(item, index) in currencyList" v-bind:key="index">
          <div v-if="payload[item]">
          <span class="valueBox" >{{ payload[item].symbol}}</span>
            <span class="valueBox">{{ payload[item].high}}</span>
            <span class="valueBox">{{ payload[item].low}}</span>
            <span class="valueBox">{{ payload[item].change}}</span>
          </div>
        </div>
    </div>
    <div align="center">
      <div>
        <div>
          <button @click="closeConnection">  Unsubscribe </button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>

import { mapState, mapGetters, mapActions } from "vuex";

export default {

  name: "CurrentPrice",
  computed: {
    ...mapState("priceUSD", ["count","payload"]),
    ...mapGetters("priceUSD", ["parity"])
  },
  created: function() {
    let self=this;

    this.connection = new WebSocket("ws://localhost:8083")

    this.connection.addEventListener("open", ()=> {
      this.connection.send(JSON.stringify({type: "add", symbols: self.currencyList.join()}));
    })


    this.connection.onmessage = function(event) {
     self.onUpdatePayload(event.data);
    }
  },
  methods: {
    ...mapActions("priceUSD", [
        "updatePayload"
  ]),

    onUpdatePayload(payload) {
      this.updatePayload(JSON.parse(payload));
    },
    closeConnection() {
      this.connection.close()
    },
},
  data()  {
    return {
      numberStore : [],
      title: 'Current Price USD ($)',
      currencyList : ["btc","eth","xrp"],
    }
  }
};
</script>

<style scoped>
.counter {
  margin-top: 25px;
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
</style>
