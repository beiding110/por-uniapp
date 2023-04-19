<template>
	<layout-nav-bar title="文档详情">
		<view class="content">
			<page-list 
				:data="tableData"
			></page-list>
		</view>
		
		<template v-slot:foot>
			<view class="tool-bar">
				<view class="left">
					<collect-star
					class="star"
					action="/tb/document/doccollect.json"
					:data="{guid: data.guid, objectname: data.docname,}"
					:defaultVal="data.collectinfo.isoperated"
					:activeData="{bj: 1}"
					:inactiveData="{bj: 0}"
					@change="collectChange"
					>
						<view class="text">
							{{data.collectinfo.collectamount}}
						</view>
					</collect-star>
				</view>
				
				<view class="right">
					<view class="btn-item">						
						<!-- #ifdef MP-WEIXIN -->
						<u-button
							type="primary" 
							:plain="true" 
							text="发送文档"
							open-type="share"
						></u-button>
						<!-- #endif -->
						
						<!-- #ifndef MP-WEIXIN -->
						<u-button
							type="primary" 
							:plain="true" 
							text="发送文档"
							@click="shareHandler"
						></u-button>
						<!-- #endif -->
					</view>
					
					<view class="btn-item">
						<u-button 
							type="primary" 
							text="下载文档"
							@click="downloadHandler"
						></u-button>
					</view>
				</view>
			</view>
		</template>
	</layout-nav-bar>
</template>

<script>
	import MIXIN_GLOBAL from '@/mixins/global.js';
	
	import {emitter,} from '../collect/js/communication.js';
	
	import CollectStar from '@/components/sys/collect.vue';
	import PageList from './components/page-list.vue';
	
	export default {
		mixins: [MIXIN_GLOBAL],
		components: {
			CollectStar,
			PageList,
		},
		data() {
			return {
				rQuery: {}, // 页面参数变量
				
				data: {
					collectinfo: {
						collectamount: '-'
					},
				},
				
				tableData: [],
			};
		},
		methods: {
			queryData() {
				this.$get('/tb/document/detail.json', {
					guid: this.getQuery('guid'),
				}, data => {
					this.tableData = data.previewlist;
					this.data = data;
				});
			},
			// 分享
			shareHandler() {
				uni.setClipboardData({
					data: window.location.href,
					showToast: false,
					success: () => {
						this.showMsgBox('已将文档地址存入剪贴板，快去粘贴分享吧');
					},
					fail: () => {
						this.showMsgBox('地址存入剪贴板失败，请使用浏览器自带分享功能');
					},
				});
			},
			// 下载
			downloadHandler() {
				var guid = this.getQuery('guid'),
					url = `http://www.huitoue.com/document/${guid}`;
				
				uni.setClipboardData({
					data: url,
					showToast: false,
					success: () => {
						this.showMsgBox('已将下载地址存入剪贴板，请在PC端浏览器粘贴地址进行下载');
					},
					fail: () => {
						this.showMsgBox('下载地址存入剪贴板失败，请前往PC端进行下载');
					},
				});
			},
			collectChange(val) {
				if (val) {
					this.data.collectinfo.collectamount ++;
				} else {
					this.data.collectinfo.collectamount --;
				}
				
				emitter(this.data.guid, val);
			},
		},
		mounted() {
			this.queryData();
		},
		onLoad(query) {
			// 存储页面参数
			this.rQuery = query;
			
			// #ifdef MP-WEIXIN
			uni.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline'],
			});
			// #endif
		},
		// 小程序分享时触发
		onShareAppMessage(res) {
			var fullPath = this.$scope.$page.fullPath;
			
			return {
				title: this.data.docname,
				desc: 'por-uniapp·文档',
				path: fullPath,
				imageUrl: '/static/images/document/icon-word.png',
			};
		},
	}
</script>

<style scoped lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
			
		.add{
			padding: 4px 14px 14px;
			background: white;
		}
		
		.push {
			margin-top: 8px;
			background: white;
		}
	}
		
	.tool-bar{
		display: flex;
		padding: 8px 14px;
		align-items: center;
		
		.left{
			flex: 1;
			
			.text{
				font-size: 12px;
				color: #303030;
				margin-left: 6px;
			}
		}
		
		.right{
			display: flex;
			
			.btn-item{
				& + .btn-item{
					margin-left: 8px;
				}
			}
		}
	}
</style>
