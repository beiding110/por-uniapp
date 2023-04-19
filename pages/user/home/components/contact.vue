<template>
	<view
	class="contact"
	>
		<u-cell-group>
			<u-cell 
				v-for="(item, index) in data"
				:key="index"
				:icon="item.icon" 
				:title="item.name"
				isLink
				@click="callHandler(item)"
			></u-cell>
		</u-cell-group>
	</view>
</template>

<script>	
	export default {
		options: {
			// 解决微信小程序中::v-deep样式无法穿透的问题
			styleIsolation: 'shared',
		},
		props: {
			data: {
				type: Array,
				default: () => [
					{
						name: '',
						icon: '',
						number: '',
					},
				],
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			callHandler(item) {
				var {number} = item;
				
				if (!number) {
					return;
				}
				
				uni.makePhoneCall({
					phoneNumber: number,
				});
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.contact{
		width: 100%;
		background: white;
		border-radius: 4px;
		
		::v-deep{
			.u-line{
				display: none;
			}
			
			.u-cell__body {
				padding: 12px 15px;
			}
			
			.u-cell__title-text{
				color: #2d2d2d;
			}
			
			.u-icon__icon {
				font-size: 20px !important;
				line-height: 1em !important;
				
				span{
					color: #2d2d2d;
				}
			}
			
			.u-cell__right-icon-wrap {
				.u-icon__icon {
					span {
						color: #d0d0d0;
					}
				}
			}
		}
	}
</style>