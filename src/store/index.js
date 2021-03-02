import Vuex from 'vuex';
import watchListX from './modules/wachlist-x';
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
      watchListX,
      priceBTC,
    feedback,
    account,
  }
});
