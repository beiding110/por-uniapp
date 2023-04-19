<template>
	<view class="home-grid">		
		<view
		v-for="(item, index) in list"
		:key="index"
		class="grid-item"
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
				default: '28px',
			},
		},
		data() {
			var that = this;
			
			return {
				list: [
					{
						name: '个人中心',
						icon: '/static/images/home/jingli.png',
						handler() {
							var isLogin = that.$store.getters.isLogin;
							
							if (!isLogin) {
								that.goto('/pages/login/login');
								
								return false;
							}
							
							that.$store.dispatch('homePageNavTo', {
								tab: 'user',
							});
						},
					},
					{
						name: '交易中心',
						icon: '/static/images/home/jiaoyi.png',
						path: '/pages-sub-function/trading-center/trading-center',
					},
					{
						name: '待办通知',
						icon: '/static/images/home/daiban.png',
						path: '/pages/user/remind/list/list',
					},
				]
			}
		},
		methods: {
			/**
			 * 点击导航项
			 * @param {Object} item 导航数据项
			 */
			clickHandler(item) {
				var {path, handler} = item;
				
				if (handler) {
					handler();
					
					return;
				}
				
				if (path) {
					this.goto(path);
					
					return;
				}
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.home-grid{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: white;
		padding: 10px;
		box-sizing: border-box;
		
		.grid-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			flex: 0 0 20%;
			width: 20%;
			text-align: center;
			padding: 12px 0;
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