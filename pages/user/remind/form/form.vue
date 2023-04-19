<template>
	<layout-nav-bar title="添加待办">
		<my-form
		ref="form"
		:model="form"
		:rules="rules"
		labelWidth="80"
		@submit="submitHandler"
		btnIcon="plus-circle"
		btnText="添加"
		>
		
			<view class="form">
				<u-form-item
				label="提醒内容"
				prop="content"
				borderBottom
				required
				>
					<u--input
						v-model="form.content"
						placeholder="请输入内容"
						border="none"
					></u--input>
				</u-form-item>
				
				<u-form-item
				label="开始时间"
				prop="opentime"
				borderBottom
				required
				>
					<my-date-time-picker
						v-model="form.opentime"
						border="none"
					></my-date-time-picker>
				</u-form-item>
				
				<u-form-item
				v-if="form.sign === '1'"
				label="提醒时间"
				prop="remindtime"
				borderBottom
				required
				>
					<my-date-time-picker
						v-model="form.remindtime"
						border="none"
					></my-date-time-picker>
				</u-form-item>
				
				<u-form-item
				label="备注"
				prop="remark"
				>
					<u--textarea 
						v-model="form.remark" 
						placeholder="请输入内容"
						border="none"
					></u--textarea>
				</u-form-item>
			</view>
			
			<view class="append">					
				<my-checkbox 
					v-model="form.sign" 
					label="增加微信公众号提醒" 
					true-label="1"
					false-label="0"
					@change="pushChangeHandler"
				></my-checkbox>
			</view>
			
			<!-- #ifdef MP-WEIXIN -->
			<official-account
				@error="oaErrorHandler"
			></official-account>
			<!-- #endif -->
		</my-form>
	</layout-nav-bar>
</template>

<script>
	import MIXIN_GLOBAL from '@/mixins/global.js';
	
	import {emitter} from '../js/communication.js';
	
	export default {
		mixins: [MIXIN_GLOBAL],
		data() {
			return {
				rQuery: {}, // 页面参数变量
				
				form: {
					content: '',
					opentime: '',
					remindtime: '',
				},
				
				rules: {
					'content': {
						type: 'string',
						required: true,
						message: '请填写内容',
						trigger: ['blur', 'change']
					},
					'opentime': {
						type: 'string',
						required: true,
						message: '请选择时间',
						trigger: ['blur', 'change']
					},
					'remindtime': {
						type: 'string',
						required: true,
						message: '请选择时间',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		methods: {
			submitHandler() {
				this.$post('/tb/home/bidreminderadd.json', this.form, res => {
					emitter();
					
					uni.navigateBack();
				});
			},
			oaErrorHandler(e) {
				console.log(e.detail.errMsg)
			},
			pushChangeHandler(val) {
				if (!val) {
					return;
				}
				
				this.$post(`/web/userlogin/getWeChatInfo.json`, data => {
					var {official_openid} = data;
	
					if (!official_openid) {
						this.showMsgBox('您尚未关注微信公众号“xxxx”，无法正常接收推送消息。请前往关注');
					}
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
	.form{
		background: white;
	}
	
	.append{
		display: flex;
		margin: 25px 0;
		justify-content: center;
	}
</style>
