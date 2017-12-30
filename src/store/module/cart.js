const state = {
	items: [],
	page: ''
}
const mutations = {
	SET_CART_ITEMS: (state, payload) => {
		if(state.items.length == 0){
			state.items.push(payload);
		}
		else{
			state.items.map(x => {
				if(x.id == payload.id){
					x.count++;
				}
				else{
					state.items.push(payload);
				}
			})
		}
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
	},
	SET_PAGE_URL : (state, payload) =>{
		state.page = payload
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
	},
	setPageUrl({ commit }, payload){
		commit('SET_PAGE_URL', payload);
	}
}

const getters = {
	cartItems: state => state.items,
	pageUrl: state => state.page
}

export default {
	state,
	mutations,
	actions,
	getters
}