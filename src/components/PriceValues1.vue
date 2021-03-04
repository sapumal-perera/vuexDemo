<template>
  <div class="counter">
    <div>
      <div>
        <div><h3>{{title}} </h3></div>
        <div align="center">{{ parity }}</div>
        <div class="priceBox">Update Count: {{ payload.id }}</div>
        <div class="priceBox">USD: {{ payload.usd }}</div>
        <div class="priceBox">EUR: {{ payload.eur }}</div>
        <div class="priceBox">BTC: {{ payload.btc }}</div>
        <div class="priceBox">ETH: {{ payload.eth }}</div>
        <div class="priceBox">XRP: {{ payload.xrp }}</div>
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
</template>
<script>

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "CurrentPrice",
  computed: {
    ...mapState("watchListX", ["count","payload"]),
    ...mapGetters("watchListX", ["parity"])
  },
  created: function() {
    let self=this;

    this.connection = new WebSocket("ws://localhost:8082")

    this.connection.onmessage = function(event) {
      self.onUpdatePayload(event.data);
    }
  },
  methods: {
    ...mapActions("watchListX", [
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
      title: 'Current Price LKR (Rs)',
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
  padding: 10px;
  box-shadow: 5px 10px #888888;
}
</style>
