<template>
	<layout-tab-bar
	>
		<keep-alive>
			<section-home
				v-if="tabActive === 'home'"
			></section-home>

			<section-document
				v-if="tabActive === 'document'"
			></section-document>
			
			<section-user
				v-if="tabActive === 'user'"
			></section-user>
		</keep-alive>
		
		<daily-events></daily-events>
	</layout-tab-bar>
</template>

<script>
	import {mapState} from 'vuex';
	
	import MIXIN_GLOBAL from '@/mixins/global.js';
	
	import DailyEvents from '@/components/sys/daily-events/index.vue';
	
	import SectionHome from '@/pages/home/main.vue';
	import SectionDocument from '@/pages/document/home/main.vue';
	import SectionUser from '@/pages/user/home/main.vue';
	
	export default {
		mixins: [MIXIN_GLOBAL],
		components: {
			DailyEvents,
			SectionHome,
			SectionDocument,
			SectionUser,
		},
		data() {
			return {
				rQuery: {}, // 页面参数变量
			};
		},
		computed: {
			...mapState({
				tabActive: state => state.homePageNav.tabActive,
			}),
		},
		methods: {
			/**
			 * 从地址栏中获取tab及nav位置，并将值赋给控制变量
			 */
			getActiveFromRouteAndBind() {
				var tabActive = this.getQuery('active'),	// 下导航
					navCurrent = this.getQuery('current');	// 上导航
				
				if (tabActive) {
					this.$store.dispatch('homePageNavTo', {
						tab: tabActive,
					});
				}
				
				if (navCurrent) {
					this.$store.dispatch('homePageNavTo', {
						nav: {
							info: navCurrent,
						},
					});
				}
			},
		},
		created() {
			
		},
		mounted() {
			
		},
		onLoad(option) {
			// 存储页面参数
			this.rQuery = option;
			
			// #ifdef MP-WEIXIN
			uni.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline'],
			});
			// #endif
			
			// 处理页面参数
			this.getActiveFromRouteAndBind();
		},
		// 小程序分享时触发
		onShareAppMessage(res) {
			const SHARE_LIST_NUM = 1;
			
			var fullPath = this.$scope.$page.fullPath,
				random = Math.random(),
				index = Math.floor(Math.random() * SHARE_LIST_NUM),
				imageUrl = `/static/banner/share-${index}.jpg`;
			
			return {
				title: 'por-uniapp',
				desc: 'por-uniapp',
				path: fullPath,
				imageUrl,
			};
		},
	}
</script>

<style scope lang="scss">
	
</style>
