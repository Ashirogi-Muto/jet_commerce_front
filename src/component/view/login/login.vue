<template>
	<div class="row">
		<div class="col s12 m8 offset-m4">
			 <div class="row">
				<div class="col s12 m6">
					<div class="card blue-grey white">
						<div class="card-content teal-text">
							<span class="card-title">Login</span>
							 <div class="row">
								<form class="col s12">
	  								<div class="row">
										<div class="input-field col s12">
											<input @focus="clearError" @keypress.enter="userLogin" v-model="payload.email" placeholder="Email" id="email" type="email">
										</div>
										<div class="input-field col s12">
											<input @focus="clearError" @keypress.enter="userLogin" v-model="payload.password" placeholder="Password" id="password" type="password">
										</div>
	  								</div>
								</form>
								<div v-if="error" class="col s12">
									<p>{{errorMesage}}</p>
								</div>
  							</div>
						</div>
						<div class="login card-action">
							 <button @click="userLogin" class="btn waves-effect waves-light" type="submit">Submit</button>
						</div>
					</div>
				</div>
	  		</div>
		</div>
	</div>
</template>

<script>
import makeRequest from '../../../helpers/collection';
export default {
	name: 'LoginComponent',
	mounted () {
		this.$store.dispatch('setPageUrl', '/login');
	},
	data: () => {
		return {
				payload: {
					email: '',
					password: '',
				},
				error: false,
				errorMesage: '',
				redirect: '/home'
			}
		},
	methods: {
		clearError(){
			this.error = false;
			this.errorMesage = '';
		},
		userLogin(){
			const { email, password, redirect } = this.payload;
			const _redirect = (redirect != null && redirect != '') ? redirect : '/home';
			if (email && password && password.length > 0) {
				this.$auth.login({
					data: {
						email,
						password
					},
					success(res) {
						if (!res.data.status) {
							this.error = true;
							this.errorMesage = res.data.message;
							return
						}
					},
					error(err) {
						this.error = true;
						this.errorMesage = err.message;
					}
				});
			}
			else {
					this.error = true;
					this.errorMesage = 'Please enter valid login credentials';
			}
		}
	}
}
</script>

<style scoped>
	.login.card-action a{
		color: #009688 !important;
	}
</style>
