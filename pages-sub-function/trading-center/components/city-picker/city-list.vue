<template>
	<view class="popup-content">
		<view class="head">
			请选择所在{{title}}
		</view>
		
		<view class="sub-head">
			<slot></slot>
		</view>
		
		<view class="body-title">
			选择{{title}}
		</view>
		
		<view class="body">
			<view 
			v-for="(item, index) in data"
			:key="index"
			class="item"
			@click="selectHandler(item)"
			>
				{{item.city}}
			</view>
		</view>
	</view>
</template>

<script>
	import MODEL_MIXIN from '@/mixins/model.js';
	
	export default {
		mixins: [MODEL_MIXIN],
		props: {
			data: {
				type: Array,
				default: () => [],
			},
			title: {
				type: String,
				default: '',
			},
			name: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				
			};
		},
		methods: {
			selectHandler(item) {
				var {city, code, children,} = item;
				
				this.model = code;
				this.$emit('update:name', city);
				
				this.$nextTick(() => {
					this.$emit('select', item);
				});
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.popup-content{
		.head{
			color: #303030;
			font-size: 14px;
			line-height: 1em;
			padding: 18px;
			text-align: center;
		}
		
		.body-title{
			font-size: 12px;
			color: #8d8d8d;
			padding: 8px 14px;
		}
		
		.body{
			max-height: 460px;
			overflow: hidden;
			overflow-y: auto;
			
			.item{
				font-size: 14px;
				color: #303030;
				line-height: 1em;
				padding: 14px;
				border-bottom: 1px solid #efefef;
				box-sizing: border-box;
			}
		}
	}
</style>