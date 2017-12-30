import Vue from 'vue';
import VueX from 'vuex';
Vue.use(VueX)

import cart from './module/cart';

export default new VueX.Store({
	modules: {
		cart
	},
})