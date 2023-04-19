<template>
	<view class="home-adv">
		<view 
		class="adv-item"
		v-for="(item, index) in list"
		:key="index"
		@click="clickHandler(item)"
		>
			<image
				class="img" 
				:src="item.src"
				mode="widthFix"
			></image>
		</view>
	</view>
</template>

<script>	
	export default {
		props: {
			
		},
		data() {
			var that = this;
			
			return {
				list: [
					{
						src: '/static/images/home/sahngjirenmai.png',
						handler() {
							var isLogin = that.$store.getters.isLogin;
							
							if (!isLogin) {
								that.goto('/pages/login/login');
								
								return false;
							}
							
							that.$store.dispatch('homePageNavTo', {
								tab: 'business-contact',
							});
						},
					},
					{
						src: '/static/images/home/zhinan.png',
						path: '/pages-sub-function/trading-center/trading-center',
					},
				],
			}
		},
		methods: {
			clickHandler(item) {
				if (item.path) {
					this.goto(item.path);
					return;
				}
				
				if (item.handler) {
					item.handler();
				}
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.home-adv{
		display: flex;
		padding: 0 14px 10px;
		background: white;
		
		.adv-item{
			flex: 1;
			
			& + .adv-item{
				margin-left: 10px;
			}
			
			.img{
				display: block;
				width: 100%;
			}
		}
	}
</style>