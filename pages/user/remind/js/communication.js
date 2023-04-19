const EVENT_NAME = 'remindChange';	// 事件名称

/**
 * 事件处理函数构造器
 * @param {Function} handler 要执行的函数
 */
function eventHandlerBuilder(handler) {
	return function(e) {
		handler && handler();
	};
};

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
	let handler = eventHandlerBuilder(cb);
	
	uni.$on(EVENT_NAME, handler.bind(this));
}

/**
 * 关闭监听，释放资源
 */
export function destroyer() {
	uni.$off(EVENT_NAME);
}