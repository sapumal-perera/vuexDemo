//import { ref } from 'vue'
//let lastId = 0;
//import {subject} from "rxjs/Subject";
//import { Subject } from "rxjs/Subject";
//
// var subject = new Subject()
//
// subject.subscribe(
//     data => addItem('Observer 1: '+ data),
//     err => addItem(err),
//     () => addItem('Observer 1 Completed')
// )
//
// subject.next('The first thing has been sent')
//
// var observer2 = subject.subscribe(
//     data => addItem('Observer 2: '+ data)
// )
//
// subject.next('The second thing has been sent')
// subject.next('A third thing has been sent')
//
// observer2.unsubscribe();
//
// subject.next('A final thing has been sent')
//
// function addItem(val) {
//     var node = document.createElement("li");
//     var textnode = document.createTextNode(val);
//     node.appendChild(textnode);
//     document.getElementById("output").appendChild(node);
// }
//
//
//
//


const state = {
    count: 0,
    payload: [],
    connection: {},
    currencyList: new Map(),
};

const getters = {
    count: state => state.count
};

const actions = {

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
                state.count++;
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
            state.currencyList.delete(payload)
        }
        state.currencyList.get(payload).count--;
    },
    terminateConnection(state) {
        state.connection.close()
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};