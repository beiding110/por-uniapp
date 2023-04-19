<template>
	<view
	class="document-item"
	@click="detailHandler"
	>
		<view class="left">
			<u-image 
				src="/static/images/document/icon-word.png" 
				mode="aspectFill"
				width="25"
				height="30"
			></u-image>
		</view>
		
		<view class="right">
			<view class="head">
				{{data.docname}}
			</view>
			
			<view class="foot">
				<view 
				v-if="data.viewamount"
				class="item"
				>
					<u-icon name="eye"></u-icon>
					{{data.viewamount}}
				</view>
				
				<view 
				v-if="data.downloadamount"
				class="item"
				>
					<u-icon name="download"></u-icon>
					{{data.downloadamount}}
				</view>
				
				<view 
				v-if="time"
				class="item"
				>
					{{data.addtime | dateTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>		
	export default {
		components: {
			
		},
		props: {
			data: {
				type: Object,
				default: () => ({}),
			},
			time: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			/**
			 * 前往详情
			 */
			detailHandler() {				
				var guid = this.data.guid;
				
				this.goto({
					path: '/pages/document/detail/detail',
					query: {
						guid,
					},
				});
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.document-item{
		display: flex;
		padding: 8px 14px;
		
		&>.left{
			display: flex;
			margin-right: 10px;
			align-items: center;
		}
		
		&>.right{
			flex: 1;
			
			.head{
				font-size: 14px;
				color: #303030;
				font-weight: bold;
			}
			
			.foot{
				display: flex;
				margin-top: 4px;
				font-size: 12px;
				color: #a4a4a4;
				
				.item{
					display: flex;
					
					& + .item{
						margin-left: 14px;
					}
				}
			}
		}
	}
</style>