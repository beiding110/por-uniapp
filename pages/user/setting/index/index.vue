<template>
	<layout-nav-bar title="设置">
		<view class="group">
			<u-cell-group>
				<u-cell
					title="信息设置"
					isLink
					url="/pages/user/setting/info/info"
				></u-cell>
			</u-cell-group>
		</view>
		
		<!-- <view class="group">
			<u-cell-group>
				<u-cell 
					title="关于"
					isLink
					url="/pages/user/about/about"
				></u-cell>
			</u-cell-group>
		</view> -->
		
		<view class="group">
			<u-button text="退出登录" @click="logoutHandler"></u-button>
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
			logoutHandler() {
				var isLogin = this.$store.getters.isLogin;
				
				if (!isLogin) {
					return false;
				}
				
				this.showConfirm('退出当前账号？', () => {
					this.$store.dispatch('logoutHandler', () => {
						this.$store.dispatch('homePageNavTo', {
							tab: 'home',
						});
						
						uni.reLaunch({
							url: `/pages/index/index`,
						});
					});
				});
			},
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
	.group{
		background: white;
		
		& + .group{
			margin-top: 10px;
		}
	}
</style>
