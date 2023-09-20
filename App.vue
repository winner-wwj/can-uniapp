<script>
	export default {
		data() {
			return {

			};
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import './common/iconfont.css';
	@import './wxcomponents/vant-weapp/common/index.wxss';
	@import './common/uni.css';
</style>