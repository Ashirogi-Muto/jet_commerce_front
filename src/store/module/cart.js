const state = {
	items: [],
}
const mutations = {
	SET_CART_ITEMS: (state, payload) => {
		state.items.push(payload);
	},
	SET_CART_ITEM: (state, payload) =>{
		state.items.map(x => {
			if(x.id == payload.id){
				x.count++;
			}
		})
	},
	UNSET_CART_ITEM : (state, payload) => {
		state.items.map(x => {
			if(x.id == payload.id){
				if(x.count != 0){
					x.count--;
				}
			}
		})
	}
}

const actions = {
	setCartItems({ commit }, payload) {
		commit('SET_CART_ITEMS', payload)
	},
	setCartItem({ commit }, payload){
		commit('SET_CART_ITEM', payload);
	},
	unSetCartItem({ commit }, payload){
		commit('UNSET_CART_ITEM', payload);
	}
}

const getters = {
	cartItems: state => state.items,
}

export default {
	state,
	mutations,
	actions,
	getters
}