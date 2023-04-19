<template>
	<layout-nav-bar 
	title="交易中心及办事指南"
	>
		<view class="search-bar">
			<city-picker
				v-model="countyCode"
				@select="citySelectHandler"
			></city-picker>
		</view>
		
		<view class="info">
			<view class="title">
				{{cityName}}
				{{countyName}}
				交易中心及办事指南详情
			</view>
			
			<view class="context">
				{{detail.title || ""}}
			</view>
			
			<view class="context" @click="copyHandler(detail.website)">
				官方网站：{{detail.website || "-"}}
			</view>
			
			<view class="context" @click="copyHandler(detail.address)">
				地址：{{detail.address || "-"}}
			</view>
			
			<view class="context" @click="callHandler">
				联系电话：{{detail.mobile || "-"}}
			</view>
		</view>
		
		<view class="papers" v-if="tabList.length">
			<my-tab
				v-model="current"
				:list="tabList"
			></my-tab>
			
			<view class="rich-text">
				<keep-alive>
					<my-parse 
						v-if="current === 'guide'"
						:content="detail.guideinfo"
					></my-parse>
					
					<my-parse 
						v-if="current === 'news'"
						:content="detail.noticeinfo"
					></my-parse>
				</keep-alive>
			</view>
		</view>
	</layout-nav-bar>
</template>

<script>
	import MIXIN_GLOBAL from '@/mixins/global.js';
	
	import CityPicker from './components/city-picker/index.vue';
	
	export default {
		mixins: [MIXIN_GLOBAL],
		components: {
			CityPicker,
		},
		data() {
			return {
				rQuery: {}, // 页面参数变量
				
				countyCode: '130101',
				cityName: '',
				countyName: '',
				
				detail: {},
				
				current: 'guide',
				tabList: [],
			};
		},
		methods: {
			queryData() {
				this.$get('/tb/home/getcenterdetail.json', {
					code: this.countyCode,
				}, data => {
					var tabList = [],
						current = '';
						
					if (data.guideinfo) {
						data.guideinfo = data.guideinfo.replace(/？/g, '');
						
						tabList.push({
							name: '办事指南',
							id: 'guide',
						});
					}
						
					if (data.noticeinfo) {
						data.noticeinfo = data.noticeinfo.replace(/？/g, '');
						
						tabList.push({
							name: '通知公告',
							id: 'news',
						});
					}
					
					if (tabList.length) {
						current = tabList[0].id;
					}
					
					this.detail = data;
					this.current = current;
					this.tabList = tabList;
				});
			},
			citySelectHandler() {
				this.queryData();
			},
			copyHandler(val) {
				if (!val) {
					return;
				}
				
				uni.setClipboardData({
					data: val,
				});
			},
			callHandler() {
				var mobile = this.detail.mobile;
				
				if (!mobile) {
					return;
				}
				
				uni.makePhoneCall({
					phoneNumber: mobile,
				});
			},
		},
		mounted() {
			this.queryData();
		},
		onLoad(query) {
			// 存储页面参数
			this.rQuery = query;
		},
	}
</script>

<style scoped lang="scss">
	.search-bar{
		background: white;
		padding: 14px 0 20px;
	}
	
	.info{
		padding: 14px;
		background: white;
		
		.title{
			font-size: 15px;
			line-height: 1em;
			margin-bottom: 18px;
		}
		
		.context{
			font-size: 14px;
			line-height: 1.5em;
			
			& + .context{
				margin-top: .5em;
			}
		}
	}
	
	.papers{
		margin-top: 10px;
		background: white;
		
		.rich-text{
			padding: 14px;
		}
	}
</style>