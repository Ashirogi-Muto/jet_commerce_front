import Vue from 'vue'
import App from './component/app.vue';
import router from './route';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import Material from 'materialize-css';
import VModal from 'vue-js-modal'
window.$ = window.jQuery = require('jquery')
//specify your base and end point url to started.
import { URL_BASE } from '../src/helpers/constant';
const loginUrl = `${URL_BASE}/login`;
const fetchUserUrl = `${URL_BASE}/user`;

Vue.router = router
Vue.use(VueAxios, axios)
Vue.use(Material);
Vue.use(VModal, { dialog: true })
//define this before using vue-auth and comment this if your dashboard doesn't require any authentication
Vue.use(VueAuth, {
	auth: {
		request: function (req, token) {
			this.options.http._setHeaders.call(this, req, { Authorization: 'Bearer ' + token })
		},
		response: (res) => {
			if (res.data && res.data.token) {
				return res.data.token
			}
		},
	},
	http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
	router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
	tokenStore: ['cookie'],
	loginData: { url: loginUrl, fetchUser: true },
	refreshData: { url: `${URL_BASE}/auth/refresh`, method: 'GET', enabled: false },
	fetchData: { url: fetchUserUrl, method: 'GET', enabled: true },
	logoutData: { url: `${URL_BASE}/admin/logout`, method: 'GET', redirect: '/login', makeRequest: true }
})
Vue.config.devtools = true;

//now create new vue instance and stick it over app(defined in index.html)
new Vue({
	el: '#app',
	router: router,
	render: render => render(App)
})
