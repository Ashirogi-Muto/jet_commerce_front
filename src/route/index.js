import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//register all routes here.
export default new VueRouter({
	base: __dirname,
	routes: [
		{
			name: 'Login',
			path: '/login',
			component: require('../component/view/login/login.vue'),
		},
		{
			path: '*',
			redirect: '/home',
			meta: {
				auth: true
			}
		},
		{
			name: 'Home',
			path: '/home',
			component: require('../component/view/home/home.vue'),
			meta: {
				auth: true
			}
		},
	]
});
