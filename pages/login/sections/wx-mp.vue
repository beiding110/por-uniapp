<template>
	<view class="panel-select">
		<image 
			class="logo"
			src="/static/images/logo.png"
			mode="widthFix"
		></image>
		
		<view class="btns">
			<u-button 
				type="primary" 
				text="授权微信手机号登录"
				open-type="getPhoneNumber" 
				@getphonenumber="decryptPhoneNumber"
			></u-button>
			
			<view 
			class="btn-text"
			@click="phoneMsgHandler"
			>
				手机号登录/注册
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef MP-WEIXIN
	import getWxMpOpenidAndBind from '../js/getWxMpOpenidAndBind.js';
	// #endif
	
	export default {
		props: {},
		data() {
			return {
				
			}
		},
		methods: {
			phoneMsgHandler() {
				this.$emit('phoneMsg');
			},
			decryptPhoneNumber(e) {
				console.log(e,'授权手机号');
				
				// #ifdef MP-WEIXIN
				if(e.detail.errMsg == 'getPhoneNumber:ok'){
					if(e.detail.iv){
						this.$post('/web/userlogin/appletLogin.json', {
							code: e.detail.code,
						}, data => {
							this.$store.commit('updateUserInfoData', data);
							
							// #ifdef MP-WEIXIN
							getWxMpOpenidAndBind.call(this);
							// #endif
							
							uni.reLaunch({
								url: `/pages/index/index`,
							});
						});
					}else{
						// 授权失败请使用验证码登录
						this.isPhoneLogin = true;
						uni.showToast({
							title: '请使用手机号登录',
							icon: 'none'
						});
					}
				}else{
					// this.closeLogin()
				}
				// #endif
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.panel-select{
		width: 234px;
		text-align: center;
		margin: 60px auto 0;
		
		.logo{
			width: 194px;
			height: 48.3px;
		}
		
		.btns{
			margin-top: 244px;
			
			.btn-text{
				color: $u-primary;
				margin-top: 30px;
			}
		}
	}
</style>