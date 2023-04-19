<template>
	<view class="home-notice">
		<view class="search">
			<view class="tabs">
				<tab-type></tab-type>
				
				<search 
					titleOnly
					toSearch
				></search>
			</view>
			
			<view class="types">
				<view 
				v-for="(item, index) in types"
				:key="index"
				class="item"
				@click="subTypeClickHandler(item)"
				>
					<image 
						class="img" 
						imgMode="widthFix" 
						:src="item.img"
					></image>
				</view>
			</view>
		</view>
		
		<view class="title">
			最新项目信息
		</view>
		
		<view class="list">
			<view 
			v-if="loading"
			class="empty"
			>
				<u-skeleton
					rows="20"
				></u-skeleton>
			</view>
			
			<notice-item
				v-for="(item, index) in tableData"
				:data="item"
				space
				injectStyle="margin: 12px;"
			></notice-item>
		</view>
		
		<view class="more">
			<u-button 
				:customStyle="{width: '14em'}"
				type="primary" 
				icon="thumb-up"
				text="点击查看更多讯息"
				@click="navHandler"
			></u-button>
		</view>
	</view>
</template>

<script>
	import {listener, destroyer} from '@/pages/info/notice/collect/assets/communication.js';
	
	import NoticeItem from '@/pages/info/notice/components/list-item.vue';
	import Search from '@/pages/info/components/search-bar/index.vue';
	import TabType from '@/pages/info/components/tab-type.vue';
	
	export default {
		components: {
			NoticeItem,
			Search,
			TabType,
		},
		props: {},
		data() {
			return {				
				tableData: [],
				
				loading: true,
				
				types: [
					{
						img: '/static/images/home/zhaobiaogonggao.png',
					},
					{
						img: '/static/images/home/zhongbiaogonggao.png',
					},
					{
						img: '/static/images/home/nijianxiangmu.png',
					},
				]
			};
		},
		methods: {
			queryData() {
				this.$get('/tb/searchrelated/noticelist.json', {
					sortname: 'publishtime',
					sortorder: 'desc',
					area: '130100',
					pageindex: 1,
					pagesize: 20,
				}, res => {
					var {rows} = res;
					
					this.tableData = rows;
					
					this.loading = false;
				});
			},
			/**
			 * 查看更多
			 */
			navHandler() {
				this.$store.dispatch('homePageNavTo', {
					tab: 'info',
					nav: {
						info: 'notice',
					},
				});
			},
			/**
			 * 子类跳转搜索
			 */
			subTypeClickHandler() {
				this.goto({
					path: '/pages/info/search/search',
				});
			},
			tabShiftHandler(item) {
				var {id} = item;
				
				this.$store.dispatch('homePageNavTo', {
					tab: 'info',
					nav: {
						info: id,
					},
				});
				
				return false;
			},
		},
		mounted() {
			listener.call(this, 'tableData');
			
			this.queryData();
		},
		beforeDestroy() {
			destroyer();
		},
	};
</script>

<style scoped lang="scss">
	.home-notice{
		margin-top: 10px;
		
		& > .search{
			.types{
				display: flex;
				padding: 14px 14px 0;
				box-sizing: border-box;
				
				.item{
					flex: 1;
					
					.img{
						display: block;
						width: 100%;
						height: 50px;
					}
					
					& + .item{
						margin-left: 8px;
					}
				}
			}
		}
		
		& > .title{
			padding: 12px 12px 0;
			font-size: 15px;
			font-weight: bold;
			color: #303030;
			line-height: 1em;
		}
		
		& > .list{
			.empty{
				padding: 12px;
			}
		}
		
		& > .more{
			text-align: center;
			padding: 1em 0 2em;
		}
	}
</style>