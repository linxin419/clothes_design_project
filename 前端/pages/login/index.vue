<template>
	<view class="container">
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
			<image src="../../static/img/logo.png" mode="widthFix" class="logo"></image>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollTop: 0
		};
	},
	methods: {}
};
</script>

<style lang="less" scoped>
.scroll-Y {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: auto;
	background: linear-gradient(180deg, #7deadc 0%, #ffffff 100%);
	/deep/ .uni-scroll-view-content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.logo {
		width: 221upx;
	}
}
</style>
