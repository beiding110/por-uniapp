<template>
	<view class="page-list">
		<view 
		v-if="loading"
		class="bone"
		>
			<u-skeleton
				rows="30"
				title
				loading
			></u-skeleton>
		</view>
			
		<template v-else>
			<view
			v-for="(item, index) in sortedData"
			:key="index"
			class="item"
			>
				<u-image 
					:src="item.filesavepath"
					mode="widthFix"
					width="100%"
					height="auto"
				></u-image>
			</view>
			
			<view 
			v-if="!explain && remain"
			class="explain"
			@click="explainHandler"
			>
				<view class="remain">
					剩余{{remain}}页未读，
				</view>
				<view class="btn">
					继续阅读
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				loading: true,
				
				explain: false,
				
				remain: 0,
			};
		},
		computed: {
			sortedData() {
				if (!this.data.length) {
					return [];
				}
				
				var sorted = this.data.sort((a, b) => {
						return Number(a.newtypecode) - Number(b.newtypecode);
					}),
					sliced = [];
					
				if (!this.explain) {
					return sorted.slice(0, 10);
				}
				
				return sorted;
			},
		},
		watch: {
			data: {
				handler(val) {
					if (!this.data.length) {
						this.remain = 0;
					}
					
					var remain = val.length - 10;
					
					this.remain = remain >= 0 ? remain : 0;
					this.loading = false;
				},
				immidate: true,
			}
		},
		methods: {
			explainHandler() {
				this.explain = true;
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.page-list{
		background: white;
		
		.bone{
			padding: 14px;
		}
		
		.explain{
			display: flex;
			font-size: 12px;
			line-height: 1em;
			justify-content: center;
			padding: 10px 0;
			
			.remain{
				color: #303030;
			}
			
			.btn{
				color: $u-primary;
			}
		}
	}
</style>