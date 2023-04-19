<template>
	<view class="document-home-main">
		<view class="search">
			<search
				v-model="pgData.title"
				@search="searchHandler"
			></search>
		</view>
				
		<view class="body">			
			<u-sticky
			<!-- #ifdef H5 -->
			:offsetTop="-44" 
			<!-- #endif -->
			>
				<view class="types">
					<view class="left">
						<my-tab
							v-model="pgData.tagids"
							:props="{label: 'dicname', value: 'diccode'}"
							:list="docTreeType"
							@click="searchHandler"
						></my-tab>
					</view>
					
					<view 
					class="right" 
					@click="sortnameChange"
					>
						<u-icon name="list"></u-icon>
						{{sortText}}
					</view>
				</view>
			</u-sticky>
			
			<my-list
			ref="list"
			v-model="tableData"
			action="/tb/document/list.json"
			:data="pgData"
			>
				<template v-slot="{row}">
					<list-item
						:data="row"
					></list-item>
				</template>
			</my-list>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	
	import ListItem from '../components/list-item.vue';
	import Search from './components/search.vue';
	
	export default {
		options: {
			// 解决微信小程序中::v-deep样式无法穿透的问题
			styleIsolation: 'shared',
		},
		components: {
			ListItem,
			Search,
		},
		props: {},
		data() {
			return {
				dataSort: [
					{
						dicname: '最新上传',
						diccode: 'addtime',
					},
					{
						dicname: '热门下载',
						diccode: 'downloadamount',
					},
				],
				
				tableData: [],
				
				pgData: {
					title: '',
					tagids: '',
					toptype: 'tou_biao_fang_an',
					sortname: 'addtime',
				},
			};
		},
		computed: {
			...mapState({
				docTreeType: state => state.dictionary.docTreeType,
			}),
			sortText() {
				var index = this.getSotrnameIndex();
					
				return this.dataSort[index].dicname;
			},
		},
		methods: {
			/**
			 * 搜索
			 */
			searchHandler() {
				this.$refs.list.reload();
			},
			/**
			 * 获取当前激活的dataSort项
			 */
			getSotrnameIndex() {
				var {sortname} = this.pgData,
					index = this.dataSort.findIndex(item => item.diccode === sortname);
					
				return index;
			},
			/**
			 * dataSort被改变
			 */
			sortnameChange() {
				var index = this.getSotrnameIndex(),
					length = this.dataSort.length;
				
				index ++;
				
				if (index >= length) {
					index = 0;
				}
				
				this.pgData.sortname = this.dataSort[index].diccode;
				
				this.$nextTick(() => {
					this.searchHandler();
				});
			},
		},
		mounted() {
			this.$store.dispatch('getDocTreeType');
		},
	}
</script>

<style scoped lang="scss">
	.document-home-main{
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
		background: white;
		
		.search{
			// #ifdef MP-WEIXIN
			padding-right: 90px;
			// #endif
		}
		
		.body{
			flex: 1;
			overflow: hidden;
			overflow-y: auto;
			
			.add{
				padding: 4px 14px;
			}
			
			.types{
				display: flex;
				height: 45px;
				padding: 0 14px 0 3px;
				border-bottom: 1px solid #efefef;
				box-sizing: border-box;
				
				.left {
					flex: 1;
					
					::v-deep{
						.u-tabs__wrapper__nav__item__text{
							font-size: 12px;
						}
					}
				}
				
				.right{
					display: flex;
					align-items: center;
					font-size: 12px;
				}
			}
		}
	}
</style>