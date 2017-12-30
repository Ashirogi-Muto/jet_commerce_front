<template>
	<div>
		<div class="navbar-fixed">
			<nav>
				<div class="nav-wrapper">
					<ul id="nav-mobile" class="right hide-on-med-and-down">
						<!-- <li><a href="sass.html">Cart</a></li> -->
						<!-- <li><a href="badges.html">Orders</a></li> -->
					</ul>
				</div>
			</nav>
		</div>
		<div class="container">
			<div class="row">
				<div class="col l8 s12">
					<div class="row">
						<div class="col l10 s12">
							<ul class="collection with-header">
								<div class="row" style="background: #FFFFFF;">
									<div class="col s3">
										<li class="collection-header">
											<h4>Products</h4>
										</li>
									</div>
									<div class="col s6 offset-s2">
										<form>
											<div class="input-field">
												<input @keyup="searchItems" placeholder="Search" v-model="search" id="search" type="search" required>
												<i @click="clearSearch" class="material-icons">close</i>
											</div>
										</form>
									</div>

								</div>
								<li class="collection-item">
									<div @click="getProductInfo(item)" class="row" v-for="(item, index) in Products" :key="index">
										<div class="col l2 s6">
											<img :src="item.image" class="responsive-img">
										</div>
										<div class="col l5 s6">
											<p style="font-weight: bold">{{item.name}}</p>

											<p>&#8377; {{item.price}}</p>
											<p style="color: grey;">
												<span v-if="item.attributes.stock > 0">{{item.attributes.stock}} in stock</span>
												<span v-else>Out of stock</span>
											</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col l4 s12">
						<div class="card white">
							<div class="card-content">
								<span class="card-title">Your Orders</span>
								<p v-if="CartItems.length == 0">No items in your cart</p>
								<div class="cart-items" v-if="CartItems.length != 0">
									<table class="table table_summary">
										<tbody v-for="(item, index) in CartItems" :key="index">
											{{item.name}}
											<tr>
												<td>
													<!-- <a href="#!" v-on:click="removeItem(item.id)"> -->
														<i v-on:click="removeItem(item.id)" class="material-icons">arrow_downward</i>
													<!-- </a> -->
													<strong>{{item.count}}x</strong> {{item.name}}
													<!-- <a href="#!" v-on:click="incrementItem(item.id)"> -->
														<i  v-on:click="incrementItem(item.id)" class="material-icons">arrow_upward</i>
													<!-- </a> -->
												</td>
												<hr>
												<td>
													<strong class="pull-right">&#8377; {{item.price * (item.count)}}</strong>
												</td>
											</tr>
										</tbody>
									</table>
									<table class="table table_summary">
										<tbody>
											<tr>
												<td class="total">
													TOTAL <span class="pull-right">&#8377; {{Total}}</span>
												</td>
											</tr>
										</tbody>
									</table>
									<button class="waves-effect waves-light btn">Charge</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-s12">
					<modal name="hello-world" height="auto" @before-close="clearCartBool">
						<div class="row">
							<div class="col l12 s8">
								<ul class="collection" style="border:none;" v-for="(item, index) in CurrentItem" :key="index">
									<li class="collection-item" v-for="sizes in item.attributes.size" :key="sizes.stock">
										<div>
											{{sizes.type}}
											<span @click="addToCart(item, sizes.type)"><i title="Add to Cart" class="material-icons right add-to-cart" style="color: #00AA9C;">send</i></span>
											<span class="new badge">{{sizes.stock}}</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<p class="col offset-s4" v-if="addedToCart">Item Added To Cart</p>
					</modal>
				</div>
			</div>
		</div>
	</div>
</template>


<script>

export default {
	mounted() {
		this.$auth.fetch({
			params: {},
			success: (res)=> {
				this.products = res.data.products;
			},
			error: (err)=>{
				console.log(err);
			},
		});
	},
	data(){
		return {
			addedToCart: false,
			cart: [],
			currentItem: [],
			products: [],
			search: ''
		}
	},
	computed: {
		CartItems(){
			console.log(this.$store.getters.cartItems);
			return this.$store.getters.cartItems
		},
		CurrentItem(){
			return this.currentItem;
		},
		Products(){
			return this.products;
		},
		Total(){
			let total = 0;
			let carts = this.$store.getters.cartItems;
			carts.map(x => {
				total = total + x.count * x.price
			});
			return total
		}
	},
	methods: {
		addToCart(item, size){
			let payload = {
				id: item.id,
				name: item.name,
				size,
				price: item.price,
				count: item.count + 1
			};
			this.cart.push(payload);
			this.addedToCart = true;
			this.$store.dispatch('setCartItems', payload);
		},
		clearCartBool(){
			this.addedToCart = false;
		},
		clearSearch(){
			this.search = '';
		},
		getProductInfo(item){
			this.currentItem = [];
			this.currentItem.push(item);
			this.show();
		},
		handleAction(){
			console.log('close');
		},
		hide () {
			this.$modal.hide('hello-world');
		},
		incrementItem(id){
			let payload = {
				id
			};
			this.$store.dispatch('setCartItem', payload);
		},
		show () {
			this.$modal.show('hello-world');
		},
		removeItem(id){
				let payload = {
				id
			};
			this.$store.dispatch('unSetCartItem', payload);
		},
		searchItems(){
			console.log(this.search);
		}
	}
}
</script>
<style>
	.nav-wrapper{
		background: #ffff;
	}
	nav ul li a{
		color: #000 !important;
	}
	.add-to-cart{
		cursor: pointer;
	}
	a.remove_item {
		color: #ddd;
		font-size: 14px;
	}
	.material-icons{
		cursor: pointer;
	}
</style>

