<template>
	<div>
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
								<span class="card-title col s6">Your Cart</span>
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
									<button @click="sendCartData" class="waves-effect waves-light btn">Charge</button>
								</div>
							</div>
						</div>
					</div>
				</div>	
			</div>
			<!--add to cart modal starts-->
			<div class="row">
				<div class="col-s12">
					<modal name="cart-prompt" height="auto" @before-close="clearCartBool">
						<div class="row">
							
							<div class="col l12 s8">
								<ul v-if="item.attributes.stock != 0" class="collection" style="border:none;" v-for="(item, index) in CurrentItem" :key="index">
									
									<li class="collection-item" v-for="sizes in item.attributes.size" :key="sizes.stock">
										<div>
											{{sizes.type}}
											<span @click="addToCart(item, sizes.type)"><i title="Add to Cart" class="material-icons right add-to-cart" style="color: #00AA9C;">send</i></span>
											<span class="new badge">{{sizes.stock}}</span>
										</div>
									</li>
								</ul>
								<p v-else class="col s8 offset-s4" style="margin-top:30px;">Item Out Of Stock</p>
							</div>
						</div>
						<p class="col offset-s4" v-if="addedToCart">Item Added To Cart</p>
					</modal>
				</div>
			</div>
			<!--add to cart modal ends-->

			<!--order creation modal starts-->
			<div class="row">
				<div class="col-s12">
					<modal name="order-res" height="auto">
						<div class="row">
							
							<div class="col l12 s8">
								<p class="col s8 offset-s4" style="margin-top:30px;">{{this.orderResponse}}</p>
							</div>
						</div>
					</modal>
				</div>
			</div>
			<!--order creation modal ends-->
			
		</div>
	</div>
</template>


<script>
import { makeRequest } from '../../../helpers/collection';

export default {
	mounted() {
		this.$store.dispatch('setPageUrl', '/orders');
		this.$auth.fetch({
			params: {},
			success: (response)=> {
				this.products = response.data.products;
			},
			error: (err)=>{
			},
		});
	},
	data(){
		return {
			addedToCart: false,
			cart: [],
			orderResponse: '',
			charge: false,
			currentItem: [],
			products: [],
		}
	},
	computed: {
		CartItems(){
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
			this.hide('cart-prompt');
			
		},
		clearCartBool(){
			this.addedToCart = false;
		},
		getProductInfo(item){
			this.currentItem = [];
			this.currentItem.push(item);
			this.show('cart-prompt');
		},
		hide(modal) {
			this.$modal.hide(modal);
		},
		incrementItem(id){
			let payload = {
				id
			};
			this.$store.dispatch('setCartItem', payload);
		},
		show(modal) {
			this.$modal.show(modal);
		},
		removeItem(id){
			let payload = {
				id
			};
			this.$store.dispatch('unSetCartItem', payload);
		},
		sendCartData(){
			let finalAmount = 0;
			let orderItems = [];
			let cart = this.$store.getters.cartItems;
			cart.map(x => {
				finalAmount = finalAmount + x.count * x.price;
				let temp = {
					itemName: x.name,
					itemPrice: x.price,
					itemType: x.size,
					count: x.count
				}
				orderItems.push(temp);
			});
			
			let payload = {
				finalAmount,
				orderItems
			};
			makeRequest('/cart', 'POST', payload)
				.then((response) => {
					let { res } = response;
						this.orderResponse = res.data.message;
						this.show('order-res');
				})
				.catch((err) => {
					this.orderResponse = 'Could not create Order';
					this.show('order-res');
				})
		}
	}
}
</script>
<style>
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

