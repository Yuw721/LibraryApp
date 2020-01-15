<template>
	<!-- 馆员信息录入 -->
	<view>
		<view class="topBar">
			<view class="statusBar"></view>
			<view class="titBar flex_b_c">
				<text class="iconfont icon-fanhui backBtn" @click="backBtn"></text>
				<view class="tit">馆员信息录入</view>
			</view>
		</view>
		<view class='mainCom'>
			<view class='topBgBox'>
				<image src='../../static/imgs/record_top_bg.png'></image>
				<view class='topTit'>请填写详细的基本信息</view>
			</view>
			<view class='infoTopBox'>
				<view class='flex_b_c b_b'>
					<view class='infoTit'>姓名
						<text class='redCol'> *</text>
					</view>
					<input type='text' placeholder='请填写' v-model="name" maxlength='10'></input>
				</view>
				<view class='selDate' v-if='identityType == 1'>
					<picker mode="date" @change="bindDateChange">
						<view class='flex_b_c'>
							<view class='infoTit'>退休时间</view>
							<view class='flex_l_c'>
								<view>{{retirement}}</view>
								<view class='iconfont icon-you- intoIcon'></view>
							</view>
						</view>
					</picker>
				</view>
				<view class='selDate'>
					<picker @change="bindEducationChange" :value="educationIdx" :range="educationArr">
						<view class='flex_b_c'>
							<view class='infoTit'>学历</view>
							<view class='flex_l_c'>
								<view>{{educationArr[educationIdx]}}</view>
								<view class='iconfont icon-you- intoIcon'></view>
							</view>
						</view>
					</picker>
				</view>
				<view class='selDate'>
					<picker @change="bindOfficeChange" :value="officeIdx" :range="officeArr">
						<view class='flex_b_c'>
							<view class='infoTit'>职称</view>
							<view class='flex_l_c'>
								<view>{{officeArr[officeIdx]}}</view>
								<view class='iconfont icon-you- intoIcon'></view>
							</view>
						</view>
					</picker>
				</view>
			</view>
			<view class='infoItemBox'>
				<view class='infoTit b_b'>工作过的部门
					<text class='redCol'> *</text>
				</view>
				<view class='flex_b_c' v-for="(item,index) in departmentArr" :key='index+"-department"'>
					<view class='infoTit'>部门{{index+1}}</view>
					<view>{{item}}</view>
					<view @click='edit(0,index)' class='mainCol'>修改</view>
				</view>
				<view class='addBtn' @click='add(0)'>
					<text>+ </text>
					<text>添加部门</text>
				</view>
			</view>
			<view class='infoItemBox'>
				<view class='infoTit b_b'>担任过的职务
					<text class='redCol'> *</text>
				</view>
				<view class='flex_b_c' v-for="(item,index) in dutyArr" :key='index+"-duty"'>
					<view class='infoTit'>职务{{index+1}}</view>
					<view>{{item}}</view>
					<view @click='edit(1,index)' class='mainCol'>修改</view>
				</view>
				<view class='addBtn' @click='add(1)'>
					<text>+ </text>
					<text>添加职务</text>
				</view>
			</view>
			<view class='infoItemBox'>
				<view class='infoTit b_b'>获得的荣誉</view>
				<view class='flex_b_c' v-for="(item,index) in honorArr" :key='index+"-honor"'>
					<view class='infoTit'>荣誉{{index+1}}</view>
					<view>{{item}}</view>
					<view @click='edit(2,index)' class='mainCol'>修改</view>
				</view>
				<view class='addBtn' @click='add(2)'>
					<text>+ </text>
					<text>添加荣誉</text>
				</view>
			</view>
			<view class='infoItemBox'>
				<view class='infoTit b_b'>口号
					<text class='redCol'> *</text>
				</view>
				<view class='flex_b_c' v-for="(item,index) in sloganArr" :key='index+"-slogan"'>
					<view class='infoTit'>口号{{index+1}}</view>
					<view>{{item}}</view>
					<view @click='edit(3,index)' class='mainCol'>修改</view>
				</view>
				<view class='addBtn' @click='add(3)'>
					<text>+ </text>
					<text>添加口号</text>
				</view>
			</view>
			<view class='botBox flex_c_c'>
				<view class="maxBtn" @click="save">选择模板</view>
			</view>
			<!-- 弹窗 -->
			<view class='shadeBox' v-if='addInfoBox'>
				<view class='shade'></view>
				<view class='shadeCont'>
					<view class='addInfoBox'>
						<view class='addTit'>{{editInfo?"修改":"添加"}}</view>
						<view class='sloganBox' v-if="sloganShow">
							<view v-for="(item,index) in defaultSlogan" :key='index' :class='otherSloganIndex == index ? "sloganItem":""'
							 @click='addDefSlogan(item,index)'>{{item}}</view>
							<view :class='textareaShow ? "sloganItem":""' @click.stop='otherSlogan'>其他（输入）</view>
						</view>
						<view v-if="textareaShow">
							<textarea placeholder='请输入' maxlength='15' class='addInfo' v-model="editText"></textarea>
							<view class='infoNum'>{{editText.length}}/15</view>
						</view>
						<view class='flex_b_c botBox'>
							<view class='closeBtn' @click.stop='cancel'>取消</view>
							<view class='agreeBtn' @click.stop='editInfoClick'>{{editInfo?"修改":"添加"}}</view>
						</view>
					</view>
				</view>
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
				name: '', //姓名
				retirement: '', // 退休时间
				// 学历
				educationIdx: 0,
				educationArr: [],
				// 职称
				officeIdx: 0,
				officeArr: [],
				addIndex: null, // 添加索引
				editIndex: null,
				textNum: 0, // 输入长度
				addInfoBox: false, // 弹窗显示
				textareaShow: true, // 输入框显示
				sloganShow: false, // 默认口号显示
				department: '', // 当前输入的部门
				departmentArr: [], // 部门
				duty: '', // 当前输入的职务
				dutyArr: [], // 职务
				honor: '', // 当前输入的荣誉
				honorArr: [], // 荣誉
				slogan: '', // 当前输入的口号
				sloganArr: [], // 口号
				defaultSlogan: [
					'平凡中坚守，奉献中推进。',
					'书香传雅韵，服务融真情。',
					'宝剑锋从磨砺出，梅花香自苦寒来。'
				], // 默认口号
				otherSloganIndex: null,
				entryTime: '',
				identityType: null, // 馆员身份  0：在馆；1：退休
				sexType: null, // 馆员性别  0：男性；1：女性
				date: '',
				editInfo: false,
				editText: '',
				editBoxIndex: null,
				educationName: null,
				officeName: null
			}
		},
		onLoad(option) {
			this.sexType = option.sexType;
			this.identityType = option.identityType;
			this.date = option.date;
			this.getEducation();
			this.getProfessional();
		},
		methods: {
			// 选择模板
			save() {
				if (this.name === '') {
					uni.showToast({
						title: '请填写姓名',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.identityType == 1 && this.retirement == '') {
					uni.showToast({
						title: '请选择退休时间',
						icon: 'none',
						duration: 2000
					})
					return
				} else if (this.identityType == 1 && new Date(this.retirement) > new Date()) {
					uni.showToast({
						title: '请选择正确日期',
						icon: 'none',
						duration: 2000
					})
					return
				} else if (this.identityType == 1 && new Date(this.retirement) < new Date(this.date)) {
					uni.showToast({
						title: '退休时间不能在入馆之前',
						icon: 'none',
						duration: 2000
					})
					return
				}

				if (this.departmentArr.length < 1) {
					uni.showToast({
						title: '请填写工作过的部门',
						icon: 'none',
						duration: 2000
					})
					return
				}

				if (this.dutyArr.length < 1) {
					uni.showToast({
						title: '请填写担任过的职位',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.sloganArr.length < 1) {
					uni.showToast({
						title: '请填写口号',
						icon: 'none',
						duration: 2000
					})
					return
				}
				var days;
				if (this.identityType == 1) {
					var entryTime = new Date(this.date).getTime()
					var retireTime = new Date(this.retirement).getTime()
					days = parseInt((retireTime - entryTime) / (1000 * 60 * 60 * 24))
				} else {
					var endTime = new Date().getTime()
					var entryTime = new Date(this.date).getTime()
					days = parseInt((endTime - entryTime) / (1000 * 60 * 60 * 24))
				}
				var param = {
					name: this.name,
					sex: this.sexType,
					states: this.identityType,
					entryTime: this.date,
					retireTime: this.retirement,
					department: this.departmentArr.join('#'),
					job: this.dutyArr.join('#'),
					watchword: this.sloganArr.join('#'),
					days: days
				}
				if (this.educationIdx == 0) {
					param.education = null;
				} else {
					param.education = this.educationArr[this.educationIdx];
				}

				if (this.officeIdx == 0) {
					param.professionalTitle = null;
				} else {
					param.professionalTitle = this.officeArr[this.officeIdx];
				}

				if (this.honorArr.length > 0) {
					param.honour = this.honorArr.join('#')
				} else {
					param.honour = null
				}
				uni.navigateTo({
					url: 'optionalModule?param=' + encodeURIComponent(JSON.stringify(param)),
				})
			},
			// 添加默认口号
			addDefSlogan(val, index) {
				this.editText = val;
				this.otherSloganIndex = index;
				this.textareaShow = false;
			},
			// 其他
			otherSlogan() {
				this.textareaShow = true;
				this.otherSloganIndex = null;
			},
			//取消
			cancel() {
				this.addInfoBox = false
			},
			// 添加
			add(index) {
				this.addIndex = index;
				this.addInfoBox = true;
				this.editInfo = false;
				this.editText = '';
				if (this.addIndex == 3) {
					this.textareaShow = false;
					this.sloganShow = true;
				} else {
					this.textareaShow = true;
					this.sloganShow = false;
				}
			},
			//编辑信息
			edit(type, index) {
				this.addIndex = type;
				this.editIndex = index;
				this.addInfoBox = true;
				this.editInfo = true;
				this.textareaShow = true;
				this.sloganShow = false;
				if (type == 0) {
					this.editText = this.departmentArr[index];
				} else if (type == 1) {
					this.editText = this.dutyArr[index];
				} else if (type == 2) {
					this.editText = this.honorArr[index];
				} else if (type == 3) {
					this.textareaShow = false;
					this.sloganShow = true;
					this.editText = this.sloganArr[index];
				}
			},
			// 选择退休时间
			bindDateChange: function (e) {
				this.retirement = e.detail.value
			},
			// 返回上一页
			backBtn() {
				uni.navigateBack();
			},
			// 获取学历列表
			getEducation() {
				this.educationArr = []
				var param = {
					typeCode: 'education'
				}
				app.basic.getAjaxData(com.user("getSysPubSource"), param, "GET").then(res => {
					if (res.data.status == true) {
						for (var i = 0; i < res.data.data.length; i++) {
							this.educationArr.push(res.data.data[i].sourceName)
						}
					}
				})
			},
			// 获取职称列表
			getProfessional() {
				this.officeArr = []
				var param = {
					typeCode: 'professional'
				}
				app.basic.getAjaxData(com.user("getSysPubSource"), param, "GET").then(res => {
					if (res.data.status == true) {
						for (var i = 0; i < res.data.data.length; i++) {
							this.officeArr.push(res.data.data[i].sourceName)
						}
					}
				})
			},
			// 选择学历
			bindEducationChange(e) {
				this.educationIdx = e.detail.value
			},
			// 选择职称
			bindOfficeChange(e) {
				this.officeIdx = e.detail.value
			},
			editInfoClick() {
				if (this.editInfo) {
					this.editShadeBox();
				} else {
					this.addShadeBox();
				}
				this.addInfoBox = false;
			},
			//修改信息
			editShadeBox() {
				if (this.editText != '') {
					if (this.addIndex == 0) {
						this.departmentArr[this.editIndex] = this.editText;
					} else if (this.addIndex == 1) {
						this.dutyArr[this.editIndex] = this.editText;
					} else if (this.addIndex == 2) {
						this.honorArr[this.editIndex] = this.editText;
					} else if (this.addIndex == 3) {
						this.sloganArr[this.editIndex] = this.editText;
					}
				}
			},
			//添加信息
			addShadeBox() {
				if (this.editText != '') {
					if (this.addIndex == 0) {
						this.departmentArr.push(this.editText);
					} else if (this.addIndex == 1) {
						this.dutyArr.push(this.editText);
					} else if (this.addIndex == 2) {
						this.honorArr.push(this.editText);
					} else if (this.addIndex == 3) {
						this.sloganArr.push(this.editText);
					}
				}
			},

		}
	}
</script>


<style>
	page {
		background: #f2f2f2;
	}

	.mainCom {
		width: 96%;
		padding-top: 200upx;
	}

	.topBgBox {
		width: 100%;
		height: 128upx;
		position: relative;
	}

	.topBgBox image {
		width: 100%;
		height: 100%;
	}

	.topTit {
		color: #fff;
		font-size: 34upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-weight: 500;
		width: 100%;
		text-align: center;
	}

	.infoTopBox {
		background: #fff;
		border-radius: 0 0 20upx 20upx;
		padding: 22upx;
	}

	.infoTopBox>view {
		padding: 30upx 0;
	}

	.infoTopBox input {
		width: 70%;
		text-align: right;
		color: #333;
	}

	.info {
		color: #333;
	}

	.infoTit {
		color: #46475e;
	}

	.infoItemBox {
		background: #fff;
		border-radius: 20upx;
		padding: 22upx;
		margin-top: 30upx;
	}

	.infoItemBox>view {
		padding: 30upx 0;
	}

	.infoItemBox .addBtn {
		width: 300upx;
		margin: 0 auto;
		height: 64upx;
		text-align: center;
		line-height: 64upx;
		color: #9fb0c5;
		font-size: 28upx;
		border: 1upx solid #dadfe6;
		border-radius: 200upx;
		padding: 0;
		margin-top: 22upx;
	}

	.addInfoBox {
		background: #fff;
		width: 80%;
		text-align: left;
		border-radius: 20upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.addTit {
		width: 100%;
		text-align: center;
		color: #fff;
		background: #197cb7;
		padding: 30upx 0;
		font-size: 32upx;
		border-radius: 20upx 20upx 0 0;
	}

	.addInfo {
		width: 92%;
		height: 150upx;
		padding: 36upx 4%;
		color: #999;
		font-size: 28upx;
	}

	.infoNum {
		text-align: right;
		padding: 0 20upx;
		color: #999;
	}

	.botBtnBox {
		padding: 0 0 30upx;
		border-radius: 20upx;
	}

	.shadeBox {
		position: fixed;
	}

	.sloganBox {
		padding: 20upx;
	}

	.sloganBox>view {
		text-align: left;
		line-height: 64upx;
		color: #333;
		font-size: 28upx;
		border: 1upx solid #dadfe6;
		border-radius: 200upx;
		padding: 2upx 20upx;
		margin: 10upx 0;
		display: inline-block;
	}

	.sloganBox .sloganItem {
		border: 1upx solid #197cb7;
		color: #197cb7;
	}

	.botBox {
		position: relative;
		box-shadow: 0 0 0 0 #FFFFFF;
	}
</style>
