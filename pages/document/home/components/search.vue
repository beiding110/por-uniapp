<template>
	<view class="doc-search">
		<view class="status-bar">
			<uni-status-bar></uni-status-bar>
		</view>
		
		<u-search
			v-model="model"
			placeholder="请输入关键字" 
			shape="square"
			:showAction="false"
			@search="searchHandler"
			@clear="searchHandler"
		></u-search>
	</view>
</template>

<script>
	import MODEL_MIXIN from '@/mixins/model.js';
	
	import UniStatusBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue';
	
	export default {
		mixins: [MODEL_MIXIN],
		components: {
			UniStatusBar,
		},
		props: {},
		data() {
			return {
				
			}
		},
		methods: {
			/**
			 * 输入框触发search
			 */
			searchHandler() {				
				this.$emit('search');
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.doc-search{
		background: white;
		padding: 5px 12px;
	}
</style>