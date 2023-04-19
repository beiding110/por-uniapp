const EVENT_NAME = 'userSettingChange';	// 事件名称

/**
 * 触发事件
 */
export function emitter() {
	uni.$emit(EVENT_NAME, {});
}

/**
 * 监听事件，更新列表数据
 * @param {Function} cb 回调函数
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