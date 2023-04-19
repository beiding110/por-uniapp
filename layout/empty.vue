<template>
	<view class="layout-empty">
		<slot></slot>
		
		<my-msg></my-msg>
	</view>
</template>

<script>
	export default {
		props: {
			
		},
		methods: {
			
		}
	};
</script>

<style scoped lang="scss">
	.layout-empty{
		height: 100%;
	}
</style>