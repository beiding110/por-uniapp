const EVENT_NAME = 'collectDocumentChange';	// 事件名称

/**
 * 触发事件
 * @param {String} guid 收藏动作的主键
 * @param {String} val 收藏动作的值
 */
export function emitter(guid, val) {
	uni.$emit(EVENT_NAME, {
		guid: guid,
		value: val,
	});
}

/**
 * 监听事件，更新列表数据
 * @param {Object} listName 需要操作的列表名
 */
export function listener(cb) {		
	uni.$on(EVENT_NAME, cb);
}

/**
 * 关闭监听，释放资源
 */
export function destroyer() {
	uni.$off(EVENT_NAME);
}