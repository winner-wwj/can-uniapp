// 封装request,方便后续开发接口变换时的修改
export default {
	common: {
		baseUrl: "http://192.168.100.125:3000/uniapi",
		data: {},
		header: {
			"Content-Type": "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		method: "GET"
	},
	request(options = {}) {

		options.url = this.common.baseUrl + options.url;
		// 下面的要是有就用传过来的值,没有就按照默认的值
		options.data = options.data || this.common.data;
		options.header = options.header || this.common.header;
		options.method = options.method || this.common.method;
		options.dataType = options.dataType || this.common.dataType;

		// //判断是否传入了header头的token进行用户是否登录的验证
		// if (options.header.token) {
		// 	options.header.token = store.state.user.token;
		// 	if (!options.header.token) {//如果store中的token为空（null)
		// 		uni.showToast({
		// 			title: "请先登录",
		// 			icon: "none"
		// 		})
		// 		return uni.navigateTo({
		// 			url: "/pages/login/login"
		// 		})
				
		// 	}
		// }
		return new Promise((res, rej) => {
			uni.request({
				...options,
				success: (result) => {
					if (result.statusCode != 200) { //失败
						return rej();
					}
					// setTimeout(function() {
					// 	uni.hideLoading();
					// }, 1000);

					let data = result.data.data;
					res(data); //成功后传递请求过来的数据
				}
			})
		})
	}
}