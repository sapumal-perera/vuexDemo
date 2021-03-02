//import { ref } from 'vue'
//let lastId = 0;
const state = {
  count: 0,
  payload: []
};

const getters = {
  parity: state => (state.payload.usd > state.payload.eur ? "Invest with USD" : "Invest with EUR")
};

const actions = {
  updatePayload: ({ commit }, payload) => commit("updatePayload", payload),
};

const mutations = {

    updatePayload(state, payload) {
        state.payload[payload.symbol] = payload;
    }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
