<template>
	<u-swiper
		class="home-swiper"
		:list="list"
		radius="0"
		@click="clickHandler"
		<!-- #ifdef H5 -->
		:height="180"
		<!-- #endif -->
		<!-- #ifndef H5 -->
		:height="230"
		<!-- #endif -->
	></u-swiper>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				
			};
		},
		methods: {
			clickHandler(index) {
				if (!this.$store.getters.isLogin) {
					this.goto('/pages/login/login');
					
					return;
				}
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.home-swiper{
		::v-deep{
			.u-swiper__wrapper__item__wrapper__image{
				div{
					    background-position: center bottom !important;
				}
			}
		}
	}
</style>