<template>
	<view class="city-picker">
		<view 
		class="input" 
		:class="{center}"
		>
			<view 
			v-if="/province/.test(layout)"
			class="item"
			@click="openHandler('province')"
			>
				<view class="text">
					{{provinceName || '省'}}
				</view>
				<u-icon name="arrow-down" size="8"></u-icon>
			</view>
			
			<view
			v-if="/city/.test(layout)"
			class="item"
			@click="openHandler('city')"
			>
				<view class="text">
					{{cityName || '市'}}
				</view>
				<u-icon name="arrow-down" size="8"></u-icon>
			</view>
			
			<view
			v-if="/county/.test(layout)"
			class="item"
			@click="openHandler('county')"
			>
				<view class="text">
					{{countyName || '县区'}}
				</view>
				<u-icon name="arrow-down" size="8"></u-icon>
			</view>
		</view>
		
		<u-popup 
		:show="popUpShowController" 
		closeOnClickOverlay
		@close="closeHandler('popUpShowController')" 
		>
			<city-list
			v-if="stepController === 'province'"
			title="省份"
			:data="provinceList"
			v-model="provinceCode"
			@select="stepController = 'city'"
			>
				<view class="suggest">
					<view class="title">
						热门城市
					</view>
					
					<view class="list">
						<view 
						v-for="(item, index) in suggestList"
						:key="index"
						class="item"
						@click="quickSelCounty(item)"
						>
							{{item.name}}
						</view>
					</view>
				</view>
			</city-list>
			
			<city-list
				v-if="stepController === 'city'"
				title="城市"
				:data="cityList"
				v-model="cityCode"
				@select="stepController = 'county'"
			></city-list>
			
			<city-list
				v-if="stepController === 'county'"
				title="县区"
				:data="countyList"
				v-model="countyCode"
				@select="selectHandler"
			></city-list>
		</u-popup>
	</view>
</template>

<script>
	import MODEL_MIXIN from '@/mixins/model.js';
	import CityList from './city-list.vue';
	
	export default {
		mixins: [MODEL_MIXIN],
		components: {
			CityList,
		},
		props: {
			layout: {
				type: String,
				default: 'province,city,county',
			},
			center: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {
				popUpShowController: false,
				stepController: '',
				
				provinceList: [],
				
				provinceCode: '',
				cityCode: '',
				countyCode: '',
				
				suggestList: [
					{
						name: '石家庄',
						code: '130101',
					},
					{
						name: '邯郸',
						code: '130401',
					},
					{
						name: '邢台',
						code: '130501',
					},
					{
						name: '保定',
						code: '130601',
					},
				]
			};
		},
		watch: {
			value: {
				handler(val) {
					if (!val) {
						return;
					}
					
					if (!this.provinceCode) {
						this.provinceCode = `${val.slice(0, 2)}0000`;
					}
					
					if (!this.cityCode) {
						this.cityCode = `${val.slice(0, 4)}00`;
					}
					
					if (!this.countyCode) {
						this.countyCode = val;
					}
				},
				immediate: true,
			},
		},
		computed: {
			provinceName() {
				if (!this.provinceCode) {
					return '';
				}
				
				var index = this.provinceList.findIndex(item => item.code === this.provinceCode),
					item = this.provinceList[index];
				
				if (!item) {
					return '';
				}
				
				return item.city;
			},
			cityName() {
				if (!this.cityCode) {
					return '';
				}
				
				var index = this.cityList.findIndex(item => item.code === this.cityCode),
					item = this.cityList[index];
				
				if (!item) {
					return '';
				}
				
				return item.city;
			},
			countyName() {
				if (!this.countyCode) {
					return '';
				}
				
				var index = this.countyList.findIndex(item => item.code === this.countyCode),
					item = this.countyList[index];
				
				if (!item) {
					return '';
				}
				
				return item.city;
			},
			cityList() {
				if (!this.provinceCode) {
					return [];
				}
				
				var index = this.provinceList.findIndex(item => item.code === this.provinceCode),
					item = this.provinceList[index];
					
				if (!item) {
					return [];
				}
				
				return item.children || [];
			},
			countyList() {
				if (!this.cityCode) {
					return [];
				}
				
				var index = this.cityList.findIndex(item => item.code === this.cityCode),
					item = this.cityList[index];
						
				if (!item) {
					return [];
				}
				
				return this.cityList[index].children || [];
			},
		},
		methods: {
			openHandler(key) {
				this.popUpShowController = true;
				
				var switchObj = {
						province: () => {
							this.stepController = key;
						},
						city: () => {
							if (!this.provinceCode) {
								this.stepController = 'province';
								return;
							}
							
							this.stepController = key;
						},
						county: () => {
							if (!this.provinceCode) {
								this.stepController = 'province';
								return;
							}
							
							if (!this.cityCode) {
								this.stepController = 'city';
								return;
							}
							
							this.stepController = key;
						},
					},
					handler = switchObj[key];
					
				handler && handler();
			},
			closeHandler(key) {
				this.popUpShowController = false;
			},
			queryData() {
				this.$get('/tb/home/getmiddlenavigate.json', data => {
					var {jyzxlist} = data;
					
					this.provinceList = jyzxlist;
				});
			},
			selectHandler() {				
				this.model = this.countyCode;
				this.closeHandler();
				
				this.$nextTick(() => {
					this.$emit('select', [
						this.provinceCode,
						this.cityCode,
						this.countyCode,
					]);
				});
			},
			quickSelCounty(item) {
				var {code} = item;
				
				this.provinceCode = this.cityCode = '';
				
				this.countyCode = code;
				
				this.selectHandler();
			},
		},
		mounted() {
			this.queryData();
		},
	}
</script>

<style scoped lang="scss">
	.city-picker {
		display: block;
		
		.input{
			display: flex;
			
			&.center{
				justify-content: center;
			}
						
			.item{
				display: flex;
				line-height: 1em;
				
				& + .item{
					margin-left: 20px;
				}
			}
		}
	}
	
	.suggest{
		padding: 6px 14px;
		
		.title{
			font-size: 14px;
			color: #303030;
			line-height: 1em;
			margin-bottom: 12px;
		}
		
		.list{
			display: flex;
			
			.item{
				font-size: 12px;
				color: #303030;
				background-color: #ececec;
				line-height: 1em;
				padding: 8px 2em;
				border-radius: 14px;
				
				& + .item{
					margin-left: 16px;
				}
			}
		}
	}
</style>