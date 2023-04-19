<template>
	<view class="home-main">
		<section-swiper
			:list="listSwiper"
		></section-swiper>
		
		<section-grid></section-grid>
		
		<section-adv></section-adv>
		
		<section-remander
			v-show="showController.remander"
			@show="updateShowController('remander')"
		></section-remander>
	</view>
</template>

<script>
	import SectionSwiper from './components/swiper.vue';
	import SectionGrid from './components/grid.vue';
	import SectionAdv from './components/adv.vue';
	import SectionRemander from './components/remander';
	
	export default {
		components: {
			SectionSwiper,
			SectionGrid,
			SectionAdv,
			SectionRemander,
		},
		props: {},
		data() {
			var that = this;
			
			return {
				listSwiper: [
					'/static/banner/home-1.jpg',
					'/static/banner/home-2.jpg',
					'/static/banner/home-3.jpg',
				],
				
				showController: {
					remander: false,
				},
			};
		},
		methods: {
			updateShowController(key) {
				this.$set(this.showController, key, true);
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	
</style>