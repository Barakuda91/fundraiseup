import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default new Vuex.Store({
    actions: {
        async fetchParams({commit}) {
            const res = await fetch('http://localhost:3000/startParams');
            const startParams = await res.json();
            commit('updateParams', startParams);
        },
        async sendDonate({state}) {
            if (state.rate === '') alert('Enter amount');
            else {
                const body = JSON.stringify({
                    amount: state.rate,
                    currency: state.params.currencies[state.currencyId].code
                });
                const res = await fetch('http://localhost:3000/donate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body
                });
                (await res.json()).ok
                    ? alert('Thank you for your donation!')
                    : alert('Something wrong!');
            }
        },
        inputRate({commit, state}, e) {
            commit('updateRate', e.target.value.replace(/^0+/, '').replace(/[^-0-9]/gim,''));
        },
        chooseRate({commit}, e) {
            commit('updateRate', e.target.getAttribute('rate'));
        },
        chooseCurrency({commit}, e) {
            commit('updateCurrency', e.target.getAttribute('currencyId'));
        },
    },
    mutations: {
        updateParams(state, params) {
            state.params = params;
            state.currencyId = params.currencyId;
            state.rate = params.suggestion;
        },
        updateRate(state, newRate) {
            state.rate = newRate;
        },
        updateCurrency(state, newId) {
            const curCurrency = state.params.currencies[state.currencyId];
            const newCurrency = state.params.currencies[newId];
            state.params.presets = state.params.presets.map((preset) => {
                const newPreset = (preset / curCurrency.rate) * newCurrency.rate;
                return state.presetFormat(newPreset);
            });
            state.rate = state.params.presets[0];
            state.currencyId = newId;
        }
    },
    state: {
        params: {},
        currencyId: 0,
        rate: 0,
        presetFormat: (newPreset) => {
            newPreset = Math.round(newPreset);
            const exponential = Math.pow(10, (newPreset + '').length - 1);
            return Math.round(newPreset / exponential) * exponential;
        },

    },
    getters: {
        params: (state) => state.params,
        currencyId: (state) => state.currencyId,
        rate: (state) => state.rate
    }
})
