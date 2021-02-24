<template>
  <div class="counter">
    <div>
      <div>
        <div><h3>{{title}} </h3></div>
        <div align="center">{{ parity }}</div>
        <div class="priceBox">Update Count: {{ id }}</div>
        <div  class="priceBox">BTC/USD: <div id="usd"> {{ usd }}</div></div>
        <div  class="priceBox">BTC/EUR: <div id="eur">{{ eur }}</div></div>
        <div  class="priceBox">BTC/ETH: <div id="eth">{{ eth }}</div></div>
        <div  class="priceBox">BTC/XRP:<div id="xrp"> {{ xrp }}</div></div>
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
  name: "CurrentPriceBTC",
  computed: {
    ...mapState("priceBTC", ['id', 'usd', 'eur', 'eth', 'xrp']),
    ...mapGetters("priceBTC", ["parity"])
  },
  created: function() {
    let self=this;

    this.connection = new WebSocket("ws://localhost:8083")

    this.connection.onopen = function() {
      self.connectionSuccess();
    }
    this.connection.onmessage = function(event) {
      self.onUpdatePayload(event.data);
    }

  },
  methods: {
    ...mapActions("priceBTC", [
      "updatePayload"
    ]),

    onUpdatePayload(payload) {
      this.updatePayload(JSON.parse(payload));
    },
    closeConnection() {
      this.connection.close()
    },

    connectionSuccess () {
      let self=this;
      let currencies = ['usd', 'eur', 'eth', 'xrp'];
      for(let currency of currencies) {
        let element = document.getElementById(currency);
        self.$watch(currency, function (newVal, oldVal) {

          if(newVal > oldVal) {
            element.classList.add('green');
            element.classList.remove('red');
          } else if(oldVal > newVal) {
            element.classList.add('red');
            element.classList.remove('green');
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
      title: 'BTC pair Values',
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

.green {
  color: green;
}

.red {
  color: red;
}

.priceBox{
  background-color: lightcyan;
  border: 1px solid;
  padding: 10px;
  box-shadow: 5px 10px #888888;
}
</style>
