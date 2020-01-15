<template>
	<!-- 就近借还书 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c b_b">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">就近借还书</view>
			</view>
		</view>
		<view class="mainCom">
			<view class="mapPage">
				<map
					id="map"
					:longitude="longitude"
					:latitude="latitude"
					scale="16"
					:markers="markers"
					@markertap="markertap"
					@regionchange="regionchange"
				>
					<view class="mapBox" v-if="markers.length > 0">
						<view class="resultBox" @click.stop="showResult"><view>点击查看更多结果</view></view>
						<view v-if="resultShow">
							<view class="flex_b_c resulInfo" v-for="(item, index) in markers" :key="index" @click="mapMark(item.id)">
								<view>
									<view>{{ item.address }}</view>
									<view class="flex_l_c">
										<view class="distance">{{ item.distance }}</view>
										<view class="distance">{{ item.duration }}</view>
									</view>
								</view>
								<view class="navigatBox">
									<image src="../../static/imgs/icon_navigat.png" class="icon_navigat"></image>
									<view>去这里</view>
								</view>
							</view>
						</view>
					</view>
				</map>
			</view>
		</view>
	</view>
</template>

<script>
import app from '../../public/app.js';
import com from '../../public/com.js';
export default {
	data() {
		return {
			latitude: '',
			longitude: '',
			markers: [],
			resultShow: false,
		};
	},
	onLoad(option) {
		let location = uni.getStorageSync('nearbyAera');
		this.latitude = location.latitude;
		this.longitude = location.longitude;
		this.getlistNearbyBookAddress();
	},
	onReady() {
		this.getlocal();
	},
	methods: {
		// 点击地点
		  markertap(e) {
			console.log("点击:" + e.markerId)
		    for (var i = 0; i < this.markers.length; i++) {
		      if (e.markerId == this.markers[i].id) {
		        this.openLocation(this.markers[i]);
		      }
		    }
		  },
		mapMark(id) {
			for (var i = 0; i < this.markers.length; i++) {
				if (id == this.markers[i].id) {
					this.openLocation(this.markers[i]);
				}
			}
		},
		openLocation(data) {
			uni.openLocation({
				latitude: data.latitude * 1,
				longitude: data.longitude * 1,
				scale: 18,
				address: data.address
			});
		},
		getlocal() {
			let that = this;
			//显示当前位置
			var map = uni.createMapContext('map', this).$getAppMap();
			map.showUserLocation(true);
		},
		formatSeconds(value) {
			var secondTime = parseInt(value); // 秒
			var minuteTime = 0; // 分
			var hourTime = 0; // 小时
			if (secondTime > 60) {
				//如果秒数大于60，将秒数转换成整数
				//获取分钟，除以60取整数，得到整数分钟
				minuteTime = parseInt(secondTime / 60);
				//如果分钟大于60，将分钟转换成小时
				if (minuteTime > 60) {
					//获取小时，获取分钟除以60，得到整数小时
					hourTime = parseInt(minuteTime / 60);
					//获取小时后取佘的分，获取分钟除以60取佘的分
					minuteTime = parseInt(minuteTime % 60);
				}
			}
			var result = '';

			if (minuteTime > 0) {
				result = '' + parseInt(minuteTime) + '分钟' + result;
			}
			if (hourTime > 0) {
				result = '' + parseInt(hourTime) + '小时' + result;
			}
			return result;
		},

		getlistNearbyBookAddress() {
			let that = this;
			var param = {
				lng: that.longitude,
				lat: that.latitude
			};

			app.basic.getAjaxData(com.enquiries('listNearbyBookAddress'), param, 'GET').then(res => {
				console.log(res.data.data);
				var markers = [];
				for (var i = 0; i < res.data.data.length; i++) {
					var item = res.data.data[i];
					console.log(item);
					item.iconPath = '../../static/imgs/icon_mark.png';
					item.width = 20;
					item.height = 20;
					item.latitude = item.lat;
					item.longitude = item.lng;
					if (item.distance < 1000) {
						item.distance = item.distance + '米';
					} else if (item.distance > 1000) {
						item.distance = (Math.round(item.distance / 100) / 10).toFixed(1) + '公里';
					}
					item.duration = that.formatSeconds(item.duration);
					markers.push(item);
					that.polyline = markers;
					that.markers = markers;
				}
				console.log(that.markers);
			});
		},
		regionchange() {},
		// 查看结果
		showResult() {
			if (this.resultShow) {
				this.resultShow = false;
			} else {
				this.resultShow = true;
			}
		},
		// 返回上一页
		backBtn() {
			uni.navigateBack();
		}
	}
};
</script>

<style>
.mainCom {
	width: 100%;
}

.mapPage #map {
	width: 100%;
	/* height: calc(100vh - 85px); */
	height: 60vh;
}

.topSearchBox {
	position: fixed;
	top: 30%;
	left: 0;
	z-index: 999;
}

.topSearch {
	background: #fff;
}

.mapBox {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background: #fff;
	z-index: 100;
}

view {
	z-index: 99;
}

.resultBox {
	text-align: center;
	padding: 30upx 0;
	font-size: 32upx;
	z-index: 101;
}

.resulInfo {
	padding: 14upx 20upx;
	font-size: 32upx;
}

.distance {
	font-size: 28upx;
	color: #818181;
	padding-top: 10upx;
	padding-right: 20upx;
}

.navigatBox {
	font-size: 28upx;
	color: #818181;
	text-align: center;
	width: 16%;
}

.icon_navigat {
	display: block;
	width: 46upx;
	height: 60upx;
	margin: 0 auto;
}
</style>
