<template>
	<view class="panel-phone-msg">
		<image
			class="logo"
			src="/static/images/logo.png"
			mode="widthFix"
		></image>
		
		<view class="body">
			<view class="form-item phone">
				<u--input
					placeholder="请输入手机号"
					v-model="form.mobile"
				></u--input>
			</view>
			
			<view class="form-item yzm">
				<u-input
				placeholder="请输入验证码"
				v-model="form.yzm"
				>					
					<btn-yzm
						slot="suffix"
						:mobile="form.mobile"
						url="/web/userlogin/sendyzm.json"
					></btn-yzm>
				</u-input>
			</view>
		</view>
		
		<view class="btns">
			<u-button 
				type="primary" 
				text="登录/注册"
				@click="loginHandler"
			></u-button>
		</view>
	</view>
</template>

<script>
	import BtnYzm from '@/components/sys/btn-yzm.vue';
	
	import storePhones from '../js/store-phones.js';
	// #ifdef MP-WEIXIN
	import getWxMpOpenidAndBind from '../js/getWxMpOpenidAndBind.js';
	// #endif
	
	export default {
		components: {
			BtnYzm,
		},
		props: {},
		data() {
			return {
				form: {
					mobile: '',
					yzm: '',
				},
			}
		},
		methods: {
			phoneMsgHandler() {
				this.$emit('phoneMsg');
			},
			loginHandler() {
				if (!this.form.mobile) {
					this.showMsgBox('请填写手机号');
					return;
				}
				
				if (!this.form.yzm) {
					this.showMsgBox('请填写验证码');
					return;
				}
				
				this.$post('/web/userlogin/smslogin.json', {
					...this.form,
				}, data => {
					this.$store.commit('updateUserInfoData', data);
					
					storePhones.add(this.form.mobile);
					
					// #ifdef MP-WEIXIN
					getWxMpOpenidAndBind.call(this);
					// #endif
					
					uni.reLaunch({
						url: `/pages/index/index`,
					});
					
					// uni.navigateBack({
					// 	delta: 1,
					// });
				});
			},
		},
		mounted() {
			var lastLogined = storePhones.getFirst();
			
			if (lastLogined) {
				this.form.mobile = lastLogined;
			}
		},
	}
</script>

<style scoped lang="scss">
	.panel-phone-msg{
		width: 326px;
		margin: 20px auto 0;
		text-align: center;
		
		.logo{
			width: 194px;
			height: 48.3px;
			margin: 0 auto 40px;
		}
		
		.body{
			.form-item{
				background: #eaeaea;
				border-color: #eaeaea !important;
				
				& + .form-item{
					margin-top: 24px;
				}
			}
		}
		
		.btns{
			margin-top: 32px;
		}
	}
</style>