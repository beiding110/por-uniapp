<template>
	<layout-nav-bar title="关于">
		<view class="logo-con">
			<u-image 
				class="logo"
				src="/static/images/about/logo.png"
				mode="widthFix"
				width="140"
				height="auto"
			></u-image>
		</view>
		
		<view class="paper">
			<view class="p">
				por-uniapp
			</view>
		</view>
	</layout-nav-bar>
</template>

<script>
	import MIXIN_GLOBAL from '@/mixins/global.js';
	
	export default {
		mixins: [MIXIN_GLOBAL],
		data() {
			return {
				rQuery: {}, // 页面参数变量
			};
		},
		methods: {
			
		},
		mounted() {
			
		},
		onLoad(query) {
			// 存储页面参数
			this.rQuery = query;
		},
	}
</script>

<style scoped lang="scss">
	.logo-con{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1em 0;
	}
	
	.paper{
		padding: 2em 15px;
		font-size: 15px;
		background: white;
		
		.p{
			text-indent: 2em;
			line-height: 2em;
			
			& + .p {
				margin-top: 1em;
			}
		}
	}
</style>
