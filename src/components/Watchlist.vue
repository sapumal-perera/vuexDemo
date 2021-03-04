<template>
  <div class="counter">
    <h4>{{ name }}</h4>
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
          <span class="valueBox"><b>Symbol</b></span>
          <span class="valueBox"><b>Open</b></span>
          <span class="valueBox"><b>High</b></span>
          <span class="valueBox"><b>Low</b></span>
          <span class="valueBox"><b>Change</b></span>
        </div>
        <div class="priceBox" v-for="(item, index) in currencyList" v-bind:key="index">
          <div v-if="currencyObjects[item]">
            <div class="valueBox">{{ currencyObjects[item].symbol }}</div>
            <div class="valueBox">{{ currencyObjects[item].open }}</div>
            <div class="valueBox"><span
                v-bind:class="currencyObjects[item].highVal"> {{ currencyObjects[item].high }} </span></div>
            <div class="valueBox"><span
                v-bind:class="currencyObjects[item].lowVal"> {{ currencyObjects[item].low }} </span></div>
            <div class="valueBox"><span
                v-bind:class="currencyObjects[item].changeVal"> {{ currencyObjects[item].change }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {mapState, mapGetters, mapActions} from "vuex";
import Multiselect from '@vueform/multiselect'
import {ref} from 'vue'

export default {

  name: "WatchList1",
  props: ["name"],
  computed: {
    ...mapState([]),
    ...mapGetters(["payloadS", "symbol"])
  },
  components: {Multiselect},

  created: function () {
    this.connectionSuccess();
    this.manageWatchers();
    /**
     * Watch from vuex
     * */
    // for(let currency of this.options){
    //   this.$store.watch(
    //       (state, getters) => getters.symbol(currency),
    //       // eslint-disable-next-line no-unused-vars
    //       (newValue, oldValue) => {
    //         this.currencyObjects[currency] = newValue;
    //         // if(oldValue && oldValue.symbol === 'ltc') {
    //         // window.alert('Updating from '+ (oldValue.symbol));
    //         // }
    //       },
    //   );
    // }


    /**
     * Subscribe for mutations in store
     */
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      //  window.alert('Updating from'+ (mutation.type));
      if (mutation.type === 'watchListX/handleSubscription') {
        console.log(`handleSubscription`);

        if (state.status === 'success') {
          this.complex = {
            deep: 'some deep object',
          };
        }
      }
    });

    /**
     * Subscribe for actions in store
     */
    this.unsubscribe = this.$store.subscribeAction((action, state) => {
      // window.alert('Updating action'+ (JSON.stringify(state)));
      if (action.type === 'updateStatus') {
        console.log(`Updating to ${state.status}`);

        // Do whatever makes sense now
        if (state.status === 'success') {
          this.complex = {
            deep: 'some deep object',
          };
        }
      }
    });
  },
  methods: {
    ...mapActions([
      "handleSubscription",
    ]),
    selectItem(option) {
      this.currencyList.push(option.label);
      this.handleSubscription({type: "add", symbol: option.label});
      this.manageWatchers('add', option.label);
    },
    removeItem(option) {
      let index = this.currencyList.indexOf(option.label);
      this.currencyList.splice(index, 1);
      this.handleSubscription({type: "remove", symbol: option.label});
      this.manageWatchers('remove', option.label);
    },

    /**
     * vm.watch from vue
     */
    connectionSuccess() {
      let self = this;
      self.$watch('count', function (newVal, oldVal) {
        // window.alert(""+newVal);
        if (newVal > oldVal) {
          //window.alert(newVal);
        } else if (oldVal > newVal) {
          //window.alert("oldVal");
        }
        // do something
      }, {
        deep: true,
        immediate: false
      })
    },

    manageWatchers(type, currency) {
      if (type === 'add') {
        this.watchersList[currency] = this.$store.watch(
            (state, getters) => getters.symbol(currency),
            (newValue, oldValue) => {
              this.currencyObjects[currency] = newValue;
              // this.currencyObjects[currency]['class'] = 'red';
              if (oldValue) {
                this.currencyObjects[currency]['highVal'] = newValue.high > oldValue.high ? 'green' : 'red';
                this.currencyObjects[currency]['lowVal'] = newValue.low > oldValue.low ? 'green' : 'red';
                this.currencyObjects[currency]['changeVal'] = newValue.change > oldValue.change ? 'green' : 'red';
                // window.alert('Updating from '+ (oldValue.symbol));
              }
            },
        );
      } else if (type === 'remove') {
        this.watchersList[currency]();
      }
    }

  },
  watch: {
    payload(newValue, oldValue) {
      window.alert(`Updating from ${oldValue} to ${newValue}`);

      if (newValue === 'success') {
        this.complex = {
          deep: 'some deep object',
        };
      }
    }
  },


  data() {
    return {
      numberStore: [],
      title: 'Watch List ($)',
      currencyList: ref([]),
      currencyObjects: ref([]),
      SelectedValues: [],
      watchersList: [],
      countx: 0,
      options: ["BTC", "ETH", "XRP", "LTC"]
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

.priceBox {
  background-color: lightcyan;
  border: 1px solid;
  box-shadow: 5px 10px #888888;
}

.valueBox {
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

.red {
  color: red;
}

.green {
  color: green;
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>