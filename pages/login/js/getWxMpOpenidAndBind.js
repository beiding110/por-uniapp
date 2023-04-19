import Chain from '@/assets/js/Chain.js';

export default function(cb) {
	var code;
	
	new Chain().link(next => {
		// 获取openid参数
		
		uni.login({
			success: (res) => {
				code = res.code;
				
				var errMsg = res.errMsg;
				
				if (!code) {
					console.log(`获取openid失败：${errMsg}`);
					
					return;
				}
				
				next();
			},
		});
	}).link(() => {
		// 传入后台获取并绑定
		
		this.$post('/web/userlogin/appLogin.json', {
			jscode: code,
		}, data => {
			console.log(data);
			
			cb && cb();
		});
	}).run();
	
}