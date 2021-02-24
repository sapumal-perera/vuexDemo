let lastId = 0;
const state = {
    count: 0,
    id : 0,
    usd : 0,
    eur : 0,
    eth : 0,
    xrp:  0,
};

const getters = {
    parity: state => (state.usd > state.eur ? "Invest with USD" : "Invest with EUR")
};

const actions = {
    updatePayload: ({ commit }, payload) => commit("updatePayload", payload),
};

const mutations = {
    updatePayload(state, payload) {

                    state.id = ++lastId;
                    state.usd = payload.usd;
                    state.eur = payload.eur;
                    state.eth = payload.eth;
                    state.xrp=  payload.xrp;

    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
