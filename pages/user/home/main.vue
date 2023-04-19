<template>
	<view class="user-main">
		<user-info></user-info>
		
		<nav-user
			class="block-item nav-user"
			:data="navUser"
		></nav-user>
		
		<adv
			class="block-item"
			:data="advList"
		></adv>
		
		<contact 
			class="block-item"
			:data="contactList"
		></contact>
	</view>
</template>

<script>
	import UserInfo from './components/user-info.vue';
	import NavUser from './components/nav-user.vue';
	import Adv from './components/adv.vue';
	import Contact from './components/contact.vue';
	
	export default {
		components: {
			UserInfo,
			NavUser,
			Adv,
			Contact,
		},
		props: {},
		data() {
			return {
				navUser: [
					{
						name: '待办通知',
						icon: '/static/images/user/xiaoxi.png',
						path: '/pages/user/remind/list/list',
					},
				],
				
				advList: [
					{
						src: '/static/images/user/xaingmu.png',
						path: '',
					},
					{
						src: '/static/images/user/renmai.png',
						path: '',
					},
				],
				
				contactList: [
					{
						name: '客服热线(400-por-uniapp)',
						icon: 'server-man',
						number: '400-por-uniapp',
					},
				],
			}
		},
		methods: {
			
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.user-main{
		padding: 0 14px;
		background: url(/static/images/user/bg.jpg) top center no-repeat;
		background-attachment: fixed;
		
		// #ifdef MP-WEIXIN
		background-size: 100% 200px;
		padding-top: 100px;
		// #endif
		
		// #ifndef MP-WEIXIN
		background-size: 100% 140px;
		padding-top: 40px;
		// #endif
		
		.nav-user{
			margin-top: 34px;
		}
		
		.block-item{
			display: flex;
			
			& + .block-item{
				margin-top: 12px;
			}
		}
	}
</style>