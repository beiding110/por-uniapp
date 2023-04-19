<template>
	<layout-nav-bar title="待办通知">
		<view class="content">			
			<view class="body">
				<view
				v-if="loading"
				class="skeleton"
				>
					<u-skeleton
						rows="20"
					></u-skeleton>
				</view>
				
				<template
				v-if="!loading"
				>
					<view 
					v-if="!tableData.length"
					class="empty"
					>
						<empty-holder
							text="无任何待办,快添加试试吧"
						></empty-holder>
					</view>
				
					<view
					v-for="(item, index) in tableData"
					:key="index"
					class="item"
					>
						<view class="left">
							<view class="text">
								{{item.content}}
							</view>
							<view class="time" :class="{near: item.reducetime < 86400000}">
								<view class="pre-text">
									还剩
								</view>
								<u-count-down :time="item.reducetime"></u-count-down>
							</view>
						</view>
						
						<view class="btn">
							<u-icon 
								name="trash" 
								size="20"
								@click="delHandler(item)"
							></u-icon>
						</view>
					</view>
				</template>
				
				<view class="u-safe-bottom u-safe-area-inset-bottom"></view>
			</view>
			
			<view class="foot">
				<u-button 
					text="添加待办" 
					icon="plus-circle" 
					type="primary"
					@click="addHandler"
				></u-button>
				
				<view class="u-safe-bottom u-safe-area-inset-bottom"></view>
			</view>
		</view>
	</layout-nav-bar>
</template>

<script>
	import MIXIN_GLOBAL from '@/mixins/global.js';
	
	import {listener, destroyer} from '../js/communication.js';
	
	import EmptyHolder from '@/components/sys/empty-holder.vue';
	
	export default {
		mixins: [MIXIN_GLOBAL],
		components: {
			EmptyHolder,
		},
		data() {
			return {
				rQuery: {}, // 页面参数变量
				
				tableData: [],
				
				loading: true,
			};
		},
		methods: {
			queryData() {
				var nowTime = new Date().getTime();
				
				this.$get('/tb/home/bidlist.json',  data => {
					this.loading = false;
					
					if (!data || !data.length) {
						this.tableData = [];
						
						return;
					}
					
					data = data.map(item => {
						return {
							...item,
							reducetime: new Date(item.opentime) - nowTime
						};
					});
					
					this.tableData = data;
				});
			},
			delHandler(row) {
				var {guid} = row;
				
				this.showConfirm('确认删除吗？', () => {
					this.$post('/tb/home/bidreminderdel.json', {
						id: guid,
					}, data => {
						this.queryData();
					});
				});
			},
			addHandler() {
				this.goto('/pages/user/remind/form/form');
			},
		},
		mounted() {
			this.queryData();
			
			listener.call(this, this.queryData);
		},
		beforeDestroy() {
			destroyer();
		},
		onLoad(query) {
			// 存储页面参数
			this.rQuery = query;
		},
	}
</script>

<style scoped lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
		
		.body{
			height: 100%;
			overflow: auto;
			padding: 0 14px 74px;
			
			.skeleton{
				margin-top: 16px;
			}
			
			.empty{
				margin-top: 40%;
			}
			
			.item{
				display: flex;
				padding: 16px 12px;
				line-height: 1em;
				align-items: center;
				background-color: #ffffff;
				border-radius: 4px;
				margin: 16px 0;
				
				.left{
					display: flex;
					flex: 1;
					align-items: center;
					overflow: hidden;
				}
				
				.text{
					font-size: 14px;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					max-width: 60%;
				}
				
				.time{
					display: flex;
					align-items: center;
					
					.pre-text{
						margin-right: 10px;
					}
					
					::v-deep{
						.u-count-down__text{
							color: $u-primary;
						}
					}
					
					&.near{
						::v-deep{
							.u-count-down__text{
								color: $u-error;
							}
						}
					}
				}
				
				.btn{
					
				}
			}
		}
		
		.foot{
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 0;
			box-sizing: border-box;
			z-index: 2;
			
			// #ifdef H5
			padding: 0 14px 26px;
			// #endif
			
			// #ifndef H5
			padding: 0 14px 14px;
			// #endif
		}
	}
</style>
