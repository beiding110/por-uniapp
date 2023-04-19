const KEY = 'LOGINED_PHONES';

export default {
	getAll() {
		var list = uni.getStorageSync(KEY);
		
		return list || [];
	},
	getFirst() {
		var list = this.getAll(),
			first = list[0];
			
		return first || false;
	},
	add(phone) {
		var list = this.getAll(),
			index = list.findIndex(item => item === phone);
			
		list.splice(index, 1);
		
		list.unshift(phone);
		
		uni.setStorageSync(KEY, list);
		
		return list;
	},
	clear() {
		uni.setStorageSync(KEY, false);
	},
}