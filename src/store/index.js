import Vuex from 'vuex';
import watchListX from './modules/wachlist-x';
import watchListY from './modules/watchlist-y';
import feedback from './modules/feedback';
import account from './modules/account';

export default Vuex.createStore({
    state: {
        count: 0,
        payload: [],
        connection: {},
        currencyList: new Map(),
    },

    getters: {
        payloadS: state => state.payload,
        symbol: (state) => (symbol) => {
            return state.payload[symbol]
        }
    },

    actions: {
        handleSubscription: ({commit}, params) => {
            if (params.type === 'init') {
                commit("initConnection")
            } else if (params.type === "add") {
                commit("addData", params.symbol)
            } else if (params.type === "remove") {
                commit("removeData", params.symbol)
            } else if (params.type === "terminate") {
                commit("terminateConnection")
            }
        },
    },

    mutations: {
        initConnection(state) {
            state.connection = new WebSocket("ws://localhost:8083");
            state.connection.addEventListener("open", () => {
                //state.connection.send(JSON.stringify({type: "add", symbols: state.currencyList.join()}));
            })
            state.connection.onmessage = function (event) {
                if (event.data) {
                    let payload = JSON.parse(event.data);
                    state.payload[payload.symbol] = payload;
                    state.count++;
                }
            }
        },
        addData(state, payload) {
            let index = state.currencyList.has(payload);
            if (!index) {
                state.currencyList.set(payload, {count: 1});
                state.connection.send(JSON.stringify({type: "add", symbols: payload}));
            } else {
                state.currencyList.get(payload).count++;
            }
        },
        removeData(state, payload) {
            if (state.currencyList.get(payload).count === 1) {
                state.connection.send(JSON.stringify({type: "remove", symbols: payload}));
                state.currencyList.delete(payload)
            } else {
                state.currencyList.get(payload).count--;
            }

        },
        terminateConnection(state) {
            state.connection.close()
        }
    },

    modules: {
        watchListX,
        watchListY,
        feedback,
        account,
    }
});
