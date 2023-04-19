<template>
	<view class="home-remander">
		<u-notice-bar 
			:text="text"
			direction="column"
			color="#007aff"
			bgColor="#ebfbff"
			fontSize="12"
			url="/pages/user/remind/list/list"
		></u-notice-bar>
	</view>
</template>

<script>
	export default {
		props: {},
		data() {
			return {
				text: [],
			}
		},
		methods: {
			queryData() {
				this.$get('/tb/home/bidlist.json',  data => {
					var length;
					
					if (!data || !data.length) {
						length = 0;
						return;
					}
					
					length = data.length;
					
					this.text = this.textBuilder(length);
					
					this.$emit('show');
				});
			},
			textBuilder(num) {
				return [
					`您本周有${num}个开标计划`
				]
			},
		},
		mounted() {
			if (!this.$store.getters.isLogin) {
				return;
			}
			
			this.queryData();
		},
	}
</script>

<style scoped lang="scss">
	.home-remander{
		padding: 0 14px 10px;
		background: white;
	}
</style>