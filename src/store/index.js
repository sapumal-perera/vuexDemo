import Vuex from 'vuex';
import priceUSD from './modules/priceUSD';
import priceBTC from './modules/priceBTC';
import feedback from './modules/feedback';
import account from './modules/account';

export default Vuex.createStore({
   state : {
     payload: []
  },

   getters : {

  },

   actions : {

  },

   mutations : {

  },

  modules: {
    priceUSD,
      priceBTC,
    feedback,
    account,
  }
});
