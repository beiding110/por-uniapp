<template>
	<layout-nav-bar title="设置信息">
		<my-form
		ref="form"
		:model="form"
		labelPosition="top"
		:rules="rules"
		@submit="submitHandler"
		>
			<my-form-item-group 
			title="获取信息设置" 
			subtitle="信息勾选越精确服务内容越精细"
			>
				<u-form-item
				label="更关注的信息"
				prop="prefer"
				required
				>
					<my-radio
						v-model="form.prefer" 
						:data="[{label: '信息类型1', value: 'bid'}, {label: '信息类型2', value: 'zb'}]"
						placement="column"
						@change="preferChangeHandler"
					></my-radio>
				</u-form-item>
				
				<template v-if="form.prefer === 'bid'">
					<u-form-item
					label="勾选信息类型"
					prop="systemwordsParent"
					>
						<my-radio
							v-model="form.systemwordsParent" 
							:data="messageTypeOptions"
							:props="{label:'valuename',value:'valueid',}"
							placement="column"
							@change="typeChangeHandler"
						></my-radio>
					</u-form-item>
					
					<u-form-item
					label="勾选信息分类"
					prop="systemwords"
					>
						<my-checkbox
							v-model="form.systemwords" 
							:data="messageFenleiOptions"
							:props="{label:'valuename',value:'valueid',}"
							placement="column"
						></my-checkbox>
					</u-form-item>
				</template>
				
				<template v-if="form.prefer === 'zb'">
					<u-form-item
					label="勾选信息类型"
					prop="systemwords"
					>
						<my-radio
							v-model="form.systemwords" 
							:data="messageTypeOptions"
							:props="{label:'valuename',value:'valueid',}"
							placement="column"
						></my-radio>
					</u-form-item>
				</template>
				
				<u-form-item
				prop="customwords"
				>
					<view class="custom-form-item-content">
						<view class="custom-label">
							<view class="label">
								关键词
							</view>
							
							<view class="sub-label">
								最多可设置五个词,每个词最多输入2- -20字,用空格隔开
							</view>
						</view>
						
						<view class="custom-body">
							<u--input
								v-model="form.customwords" 
								placeholder="最多可设置五个词"
								border="bottom"
							></u--input>
						</view>
					</view>
				</u-form-item>
			</my-form-item-group>
			
			<my-form-item-group
			title="个人信息补充"
			subtitle="单位名称越详细平台服务越精准"
			>
				<u-form-item
				label="公司名称"
				prop="dwname"
				labelPosition="left"
				required
				>
					<u--input
						v-model="form.dwname" 
						placeholder="请输入公司名称"
						border="bottom"
					></u--input>
				</u-form-item>
				
				<u-form-item
				label="职位"
				prop="position"
				labelPosition="left"
				required
				>
					<u--input
						v-model="form.position" 
						placeholder="请输入所任职职位"
						border="bottom"
					></u--input>
				</u-form-item>
				
				<u-form-item
				label="手机号"
				prop="mobile"
				labelPosition="left"
				>
					{{form.mobile}}
				</u-form-item>
			</my-form-item-group>
		</my-form>
	</layout-nav-bar>
</template>

<script>
	import MIXIN_GLOBAL from '@/mixins/global.js';
	
	import {emitter} from '../js/communication.js';
	
	export default {
		mixins: [MIXIN_GLOBAL],
		data() {
			var that = this;
			
			return {
				rQuery: {}, // 页面参数变量
				
				form: {
					prefer: '',
					systemwords: '', 
					customwords: '', 
					dwname: '', 
					position: '',
					mobile: '',
					systemwordsParent: '',
				},
				
				messageTypeOptions: [], // 消息类型
				messageFenleiOptions: [], // 消息分类
				
				rules: {
					prefer: {
						type: 'string',
						required: true,
						message: '请选择内容',
						trigger: ['blur', 'change']
					},
					systemwords: [
						{
							asyncValidator(rule, val, callback) {
								if (!that.form.customwords) {
									if (val) {
										return callback();
									} else {
										return callback(new Error('请选择'));
									}
								}
							},
						},
					],
					customwords: [
						{
							asyncValidator(rule, val, callback) {
								if (!that.form.systemwords) {
									if (val) {
										return callback();
									} else {
										return callback(new Error('请填写关键词'));
									}
								}
							},
						},
					],
					dwname: {
						type: 'string',
						required: true,
						message: '请填写内容',
						trigger: ['blur', 'change']
					},
					position: {
						type: 'string',
						required: true,
						message: '请填写内容',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		
		methods: {
			getsystemtype(val) {
				var type = val === 'bid' ? 'zhao' : 'zhong';
				
				this.$get('/tb/center/getsystemtype.json', {
					type,
				}, data => {
					this.messageTypeOptions = data.list;
					
					var systemwordsArr = data.list.reduce((arr, item) => {
						// select为1的设为表单默认值
						
						if (item.select === '1') {
							arr.push(item.valueid);
						}
						
						return arr;
					}, []);
					
					if (val === 'bid') {
						let selectedItem;
						
						if (this.messageTypeOptions.some(item => {
							if (item.select === '1') {
								// 有被选中的项
								selectedItem = item;
								return true;
							}
							
							return false;
						})) {
							// 设为对应项的子项
							this.messageFenleiOptions = selectedItem.children;
						} else {
							// 设为首项的子项
							this.messageFenleiOptions = this.messageTypeOptions[0].children;
						}
							
						this.form.systemwordsParent = systemwordsArr.join(',');
						
						let childArr = this.messageFenleiOptions.reduce((arr, item) => {
							// select为1的设为表单默认值
							
							if (item.select === '1') {
								arr.push(item.valueid);
							}
							
							return arr;
						}, []);
						
						this.form.systemwords = childArr.join(',');
					}
					
					if (val === 'zb') {
						this.form.systemwords = systemwordsArr.join(',');
					}
				});
			},
			// 关注信息调整
			preferChangeHandler() {
				// 重置选项
				this.form.systemwordsParent = this.form.systemwords = '';
			},
			// 类型调整
			typeChangeHandler(e) {
				var index = this.messageTypeOptions.findIndex(item => {
					return item.valueid === e;
				});
				
				if (index < 0) {
					return;
				}
				
				// 更新子选选项
				this.messageFenleiOptions = this.messageTypeOptions[index].children;
				
				// 重置子选项
				this.form.systemwords = '';
			},
			submitHandler() {
				this.$get('/web/userlogin/adjustuserinfo.json', this.form, () => {
					this.$store.dispatch('queryUserInfo');
					
					emitter();
					
					uni.navigateBack();
				});
			},
		},
		mounted() {
			this.$store.dispatch('queryUserInfo', data => {
				var {prefer} = data;
				
				if (!prefer) {
					data.prefer = 'bid';
				}
				
				var {prefer, systemwords, customwords, dwname, position, mobile,} = data,
					form = {
						prefer, 
						systemwords, 
						customwords, 
						dwname, 
						position,
						mobile,
						systemwordsParent: '',
					};
				
				this.form = form;
				
				this.getsystemtype(data.prefer);
			});
		},
		onLoad(query) {
			// 存储页面参数
			this.rQuery = query;
		},
	}
</script>

<style scoped lang="scss">	
	.custom-form-item-content{
		width: 100%;
		
		.custom-label{
			
			.label{
				font-size: 14px;
				font-weight: bold;
			}
			
			.sub-label{
				font-size: 12px;
				color: #b8b8b8;
			}
		}
		
		.custom-body{
			display: flex;
		}
	}
</style>
