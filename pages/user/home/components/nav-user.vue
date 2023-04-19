<template>
	<view class="nav-quick">
		<view 
		v-for="(item, index) in data"
		:key="index"
		class="nav-item"
		@click="clickHandler(item)"
		>
			<image 
				class="icon"
				:src="item.icon" 
				mode="widthFix"
				:style="{width: iconSize, height: iconSize}"
			></image>
			
			<view class="title">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>	
	export default {
		props: {
			iconSize: {
				type: [String, Number],
				default: '24px',
			},
			data: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				
			};
		},
		methods: {
			clickHandler(item) {
				if (item.handler) {
					item.handler();
					
					return;
				}
				
				if (item.homePageNavTo) {
					this.$store.dispatch('homePageNavTo', {
						tab: item.homePageNavTo,
					});
					
					return;
				}
				
				if (!item.path) {
					this.showMsgBox('敬请期待');
					
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
	.nav-quick{
		display: flex;
		width: 100%;
		background: white;
		border-radius: 4px;
		
		.nav-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			flex: 1;
			text-align: center;
			padding: 20px 0;
			position: relative;
			
			&:hover{
				&:before{
					content: '';
					display: block;
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					background: rgba(255, 255, 255, .4);
					z-index: 1;
				}
			}
			
			.icon{
				
			}
			
			.title{
				font-size: 12px;
				color: #131415;
				line-height: 1em;
				margin-top: 8px;
			}
		}
	}
</style>