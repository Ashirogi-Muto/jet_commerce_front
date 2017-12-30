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
			redirect: '/dashboard',
			meta: {
				auth: true
			}
		},
		{
			name: 'Dashboard',
			path: '/dashboard',
			component: require('../component/view/dashboard/dashboard.vue'),
			meta: {
				auth: true
			}
		},
	]
});
