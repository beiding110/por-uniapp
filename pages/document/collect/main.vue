<template>
	<my-list
	ref="list"
	v-model="tableData"
	action="/tb/center/usercollects.json"
	:data="pgData"
	:autoList="false"
	emptyText="还没有收藏任何文档哦"
	>
		<view 
		class="doc-item"
		v-for="(row, index) in tableData"
		:key="row.guid"
		@click="detailHandler(row)"
		>
			<view class="left">
				{{row.docname}}
			</view>
			<view class="right">
				<view class="time">
					{{row.collecttime | dateTime}}
				</view>
				
				<view class="collect">
					<collect-star
						:key="row.guid"
						class="star"
						action="/tb/document/doccollect.json"
						:data="{guid: row.guid, objectname: row.docname,}"
						:defaultVal="true"
						:activeData="{bj: 1}"
						:inactiveData="{bj: 0}"
						:size="20"
						beforeInactiveText="取消收藏，该文档将不在此列表展示！"
						@change="collectChange($event, index)"
					></collect-star>
				</view>
			</view>
		</view>
	</my-list>
</template>

<script>
	import {listener, destroyer,} from './js/communication.js';
	
	import CollectStar from '@/components/sys/collect.vue';
	
	export default {
		options: {
			// 解决微信小程序中::v-deep样式无法穿透的问题
			styleIsolation: 'shared',
		},
		components: {
			CollectStar,
		},
		props: {},
		data() {
			return {
				tableData: [],
				pgData: {
					sortname: 'addtime',
					type: 'document',
				},
			};
		},
		methods: {
			collectChange(val, index) {
				if (!val) {
					// 收藏取消
					
					this.tableData.splice(index, 1);
				}
			},
			detailHandler(item) {
				var {guid} = item;
				
				this.goto({
					path: '/pages/document/detail/detail',
					query: {
						guid,
					},
				});
			},
			reloadhandler() {
				this.$refs.list.reload();
			},
		},
		mounted() {
			listener.call(this, this.reloadhandler);
		},
		beforeDestroy() {
			destroyer();
		},
	}
</script>

<style scoped lang="scss">
	.doc-item{
		display: flex;
		padding: 14px;
		align-items: center;
		
		.left{
			flex: 1;
			font-size: 15px;
			color: #303030;
			font-weight: bold;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		
		.right{
			display: flex;
			
			.time{
				font-size: 12px;
				color: #aaa;
				margin-right: 10px;
			}
		}
	}
</style>