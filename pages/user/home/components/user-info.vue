<template>
	<view class="user-info">
		<view class="left">
			<view 
			class="name"
			@click="toLogin"
			>
				{{userNickname | nickNameEnc}}
			</view>
		</view>
		<view class="right">
			<u-icon 
				class="btn-setting"
				name="setting"
				:size="24"
				color="white"
				@click="settingHandler"
			></u-icon>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex';
	
	export default {
		props: {},
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters({
				userNickname: 'getNickname',
			}),
		},
		methods: {
			settingHandler() {
				this.goto('/pages/user/setting/index/index');
			},
			toLogin() {
				var isLogin = this.$store.getters.isLogin;
				
				if (!isLogin) {
					this.goto('/pages/login/login');
					
					return false;
				}
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.user-info{
		display: flex;
		width: 100%;
		color: white;
		
		.left{
			flex: 1;
			font-size: 20px;
			color: white;
		}
		
		.right{
			// #ifndef MP-WEIXIN
			.btn-setting{
				margin-top: -25px;
			}
			// #endif
		}
	}
</style>