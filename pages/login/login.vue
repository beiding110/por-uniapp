<template>
	<layout-nav-bar 
	title="登录"
	nav-bg-color="rgba(0,0,0,0)"
	>
		<!-- #ifdef H5 -->
		<section-phone-msg
			class="panel"
		></section-phone-msg>
		<!-- #endif -->
		
		<!-- #ifdef MP-WEIXIN -->
		<section-wx-mp
			v-if="stage === 'select'"
			class="panel"
			@phoneMsg="stage = 'phone-msg'"
		></section-wx-mp>
		
		<section-phone-msg
			v-if="stage === 'phone-msg'"
			class="panel"
		></section-phone-msg>
		<!-- #endif -->
		
	</layout-nav-bar>
</template>

<script>
	import MIXIN_GLOBAL from '@/mixins/global.js';
	
	import SectionWxMp from './sections/wx-mp.vue';
	import SectionPhoneMsg from './sections/phone-msg.vue';
	
	export default {
		mixins: [MIXIN_GLOBAL],
		components: {
			SectionWxMp,
			SectionPhoneMsg,
		},
		data() {
			return {
				stage: 'select',
			};
		},
		methods: {
			
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.panel{
		
	}
</style>
