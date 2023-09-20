<template>
	<view>
		<!-- 微信端分享发布的弹出层 -->
		<!-- #ifdef MP-WEIXIN -->
				<van-popup :show="flag" round closeable  @close="closepop" position="bottom"
					custom-style="height:55%;">
					<wxPopup></wxPopup>
				</van-popup>
		<!-- #endif -->
		<Tabbar :current-page="1"  @userData="getdata"></Tabbar>
	</view>
	
</template>

<script>
	import Tabbar from '@/components/tabbar/tabbar.vue'
	import wxPopup from '@/components/other/wxPopup.vue'
	export default {
		data() {
			return {
				flag: false
			}
		},
		components:{
			Tabbar,
			wxPopup 
		},
		methods: {
			getdata(e) {
				this.flag = e
			},
			closepop() {
				this.flag = false;
			},
		}
	}
</script>

<style>

</style>
