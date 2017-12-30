<template>
	<div>
		<div class="navbar-fixed">
			<nav>
				<div class="nav-wrapper">
					<ul id="nav-mobile" class="right hide-on-med-and-down">
						<li><a href="sass.html">Cart</a></li>
						<li><a href="badges.html">Orders</a></li>
					</ul>
				</div>
			</nav>
		</div>
		<div class="container">
			<div class="row">
				<div class="col l8 offset-l3 s12">
					<div class="row">
						<div class="col l10 s12">
							<ul class="collection with-header">
								<div class="row" style="background: #FFFFFF;">
									<div class="col s6">
										<li class="collection-header"><h4>Products</h4></li>
									</div>
									<div class="col s6">
										<form>
									<div class="input-field">
										<input id="search" type="search" required>
										<label class="label-icon" for="search"><i class="material-icons">search</i></label>
										<i class="material-icons">close</i>
									</div>
								</form>
									</div>
									
								</div>
								<li class="collection-item">
									<div @click="getProductInfo(item)" class="row" v-for="(item, index) in Products" :key="index">
										<div class="col l2 s6">
											 <img :src="item.image"  class="responsive-img">
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
			</div>
			<div class="row">
				<div class="col-s12">
						<modal name="hello-world" height="auto">
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
			products: [],
			currentItem: [],
			cart: []
		}
	},
	computed: {
		Products(){
			return this.products;
		},
		CurrentItem(){
			return this.currentItem;
		}
	},
	methods: {
		addToCart(item, size){
			console.log(item, size);
			let payload = {
				item, size
			};
			this.cart.push(payload);
		},
		getProductInfo(item){
			this.currentItem = [];
			this.currentItem.push(item);
			this.show();
		},
		hide () {
			this.$modal.hide('hello-world');
		},
		show () {
			this.$modal.show('hello-world');
		},
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
</style>

