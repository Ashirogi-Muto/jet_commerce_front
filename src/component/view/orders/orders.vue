<template>
	 <div class="row">
		<div class="col l6 offset-l3 s12">
		  <div class="card blue-grey darken-1">
			<div class="card-content white-text">
			  <span class="card-title">Your Orders</span>
			  <ul class="collection" v-for="(item, index) in Orders" :key="index">
				<li class="collection-item" style="color: #00C0AF;" v-for="order in item.orderItems" :key="order.itemType">
					<div>
						{{order.itemName}} {{order.itemType}} x {{order.count}}
						<a href="#!" class="secondary-content">&#8377;{{order.itemPrice}}</a>
					</div>
				</li>
					<li>Total &#8377; {{item.orderAmount}}</li>
	  		</ul>
			</div>
			<div class="card-action">
			  <a href="#!">Go To Home</a>
			</div>
		  </div>
		</div>
	  </div>
</template>

<script>
export default {
	mounted(){
		this.$auth.fetch({
			params: {},
			success: (res)=> {
				this.orders = res.data.orders;
			},
			error: (err)=>{
				this.orderError = true;
				this.orderErrorMessage = res.data.message;
			},
		});
	},
	data(){
		return {
			orderError: false,
			orders: [],
			orderErrorMessage: '',
		}
	},
	computed: {
		Orders(){
			return this.orders;
		}
	}
}
</script>

