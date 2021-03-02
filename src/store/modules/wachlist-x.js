//import { ref } from 'vue'
//let lastId = 0;
const state = {
    count: 0,
    payload: [],
    connection: {},
    currencyList: new Map(),
};

const getters = {
    parity: state => (state.payload.usd > state.payload.eur ? "Invest with USD" : "Invest with EUR")
};

const actions = {

    handleSubscription: ({commit}, params) => {
        if (params.type === 'init') {
            commit("initConnection")
        } else if (params.type === "add") {
            commit("addData", params.symbol)

        } else if (params.type === "remove") {
            commit("removeData", params.symbol)
        }
    },
    closeConnection() {
        this.connection.close()
    },
};

const mutations = {

    initConnection(state) {
        state.connection = new WebSocket("ws://localhost:8083");
        state.connection.addEventListener("open", () => {
            //state.connection.send(JSON.stringify({type: "add", symbols: state.currencyList.join()}));
        })
        state.connection.onmessage = function (event) {
            if (event.data) {
                let payload = JSON.parse(event.data);
                state.payload[payload.symbol] = payload;
               // state.count++;
            }
        }
    },
    addData(state, payload) {
        let index = state.currencyList.has(payload);
        if (!index) {
            state.currencyList.set(payload,{count:1});
            state.connection.send(JSON.stringify({type: "add", symbols: payload}));
        } else {
            state.currencyList.get(payload).count++;
        }
    },
    removeData(state, payload) {
        if ( state.currencyList.get(payload).count === 1) {
            state.connection.send(JSON.stringify({type: "remove", symbols: payload}));
        }
        state.currencyList.get(payload).count--;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
