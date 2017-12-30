<template>
	<div>
			<div class="navbar-fixed">
			<nav>
				<div class="nav-wrapper">
					<ul id="nav-mobile" class="right hide-on-med-and-down">
						<li style="margin-right: 30px"><button @click="goToOrders" class="waves-effect waves-light btn">Your Orders</button></li>
        				<li style="margin-right: 10px"><button @click="logOut" class="waves-effect waves-light btn">Log Out</button></li>
					</ul>
				</div>
			</nav>
		</div>
			<router-view></router-view>
	</div>
</template>


<script>


export default {
	methods: {
		goToOrders(){
			this.$router.push({
				name: 'Orders',
				path: '/orders'
			})
		},
		logOut(){
			this.$auth.logout({
				makeRequest: true,
				success: function (res) {
				},
				error: function (error) {
				},
				redirect: '/login',
			});
		}
	}
}
</script>

<style>
body {
	background: #F1F1F1;
}
.nav-wrapper{
		background: #ffff;
	}
	nav ul li a{
		color: #000 !important;
	}
</style>

