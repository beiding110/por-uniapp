<template>
	<view class="block-item adv">
		<view 
		class="adv-item"
		v-for="(item, index) in data"
		:key="index"
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
			data: {
				type: Array,
				default: () => [
					{
						src: '',
						path: '',
					},
				],
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			clickHandler(item) {
				if (!item.path) {
					return;
				}
				
				this.goto(item.path);
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.adv{
		display: flex;
		width: 100%;
		
		.adv-item{
			flex: 1;
			
			& + .adv-item{
				margin-left: 14px;
			}
			
			.img{
				display: block;
				width: 100%;
			}
		}
	}
</style>