

/**计算rem**/
(function(win){
	var remCalc = {};
	var docEl = win.document.documentElement,
		tid,
		hasRem = true;
	hasZoom = true;
	designWidth = 750;
	function refresh(){
		var width = docEl.getBoundingClientRect().width;
		if(hasRem){
			var rem = width/10;
			docEl.style.fontSize = rem + "px";
			remCalc.rem = rem;
			var actualSize = parseFloat(window.getComputedStyle(document.documentElement)["font-size"]);
			if(actualSize!== rem && actualSize>0 && Math.abs(actualSize-rem)>1){
				var remScaled = rem*rem/actualSize;
				docEl.style.fontSize = remScaled + "px";
			}
		}
		if(hasZoom){
			var style = document.getElementById('y_style');
			if(!style){
				style = document.createElement('style');
				style.id = 'y_style';
			}
			style.innerHTML = '._z{zoom:'+ width/designWidth + '}';
			document.getElementsByTagName('head')[0].appendChild(style);
		}
	}
	function dbcRefresh(){
		clearTimeout(tid);
		tid = setTimeout(refresh,100);
	}
	win.addEventListener("resize",function(){
		dbcRefresh()
	},false);
	win.addEventListener("pageshow",function(e){
		if(e.persisted){
			dbcRefresh()
		}
	},false);
	refresh();
	if(hasRem){
		remCalc.refresh = refresh;
		remCalc.rem2px = function(d){
			var val = parseFloat(d)/this.rem;
			if(typeof d==="string" && d.match(/px$/)){
				val+="rem";
			}
			return val
		};
		win.remCalc = remCalc;
	}
})(window);
		
var musicArray = ['mCctv','mBanma','mBaojing','mKeke','mText','mTime','mWuniang',"mEnd","mDaohang"];
function initMusic(musicIDArray){
    if(musicIDArray.length>0){
        for(var i=0;i<musicIDArray.length;i++){
            var player =document.getElementById(musicIDArray[i]);
             player.load();
        }
    }
}
function ImgLoadingByFile(imgArray,loadPageID,loadTxtID,showpageID,musicID){
	function complete(long){
		
		var timer = setTimeout(function(){
			$('#'+loadPageID).hide();
			$('#'+showpageID).show();
			initMusic(musicArray);
			//新闻联播
			mCctv.pause();
			mCctv.play();
			clearTimeout(timer);
		},long);
	}
	if(sessionStorage.getItem("pageloaded")){
			var now = 60;
			var timer02 = setInterval(function(){
			    if(now>=0){
			        $('#'+ loadTxtID +' span').html(''+now);
			    }else{
			        clearInterval(timer02);
			    }
			    now -=10;
			    console.log(now);
			},10);
		complete(2500);
	}else{
		var imgLoad = 0;
		var btime = new Date();
		if(imgArray.length>0){
			var imgTotal = imgArray.length;
			var percent = 0;
			var img = [];
			for(var i = 0;i<imgArray.length;i++){
				img[i] = new Image();
				img[i].src=imgArray[i];
				img[i].onload = function(){
					imgLoad++;
					percent =60- parseInt(imgLoad/imgTotal*60);
						$('#'+loadTxtID +' span').html(percent);
						//console.log(percent);
						
					if(percent<=0){
					    var etime = new Date();
					    console.log(etime-btime);
					    if(etime-1000>btime){
					        complete(100);
					    }else{
					        complete(200);
					    }
					sessionStorage.setItem("pageloaded", "true");
						
					}
				}
			}
		}
	}
}

//横屏
function landscape(){
	var w = window.Utils.windowW();
	var h = window.Utils.windowH();
	$("body").css({"width":w,"height":h,"overflow-y":'hidden',"-webkit-overflow-y":"hidden"});
	$('#page-landscape').css({"width":w,"height":h}).show();
	//$('#page-portrait').css({"width":w,"height":h});
}
var firstInit = true,wrem = 0;
//竖屏
function portrait(){

	var w = window.Utils.windowW();
	var h = window.Utils.windowH();
	$("body").css({"width":w,"height":h,"overflow-y":'scroll',"-webkit-overflow-y":"scroll"});
	$('#page-portrait').css({"width":w}).show();
	$('#page-landscape').hide();
	//初始化加载
	if(firstInit) {
		wrem = window.remCalc.rem;
		
		
		var imgFile = [
			"img/loading02.gif",
			"img/share.jpg",
			"img/phone.png",
			"img/success.png",
			"img/plase.png",
			"img/repace.png",
			"img/error.png",
			"img/bg.jpg",
			"img/red-kuang.png",
			"img/part2/bg-part2.jpg",
			"img/part2/baojing.gif",
			"img/part2/baozha.gif",
			"img/part2/p2-daohang.png",
			"img/part2/dada.png",
			"img/part2/p2-dong.png",
			"img/part2/p2-er.png",
			"img/part2/p2-gaosq02.gif",
			"img/part2/p2-huijia.png",
			"img/part2/p2-ji.png",
			"img/part2/p2-kaisi.png",
			"img/part2/p2-lun.gif",
			"img/part2/p2-nan.png",
			"img/part2/p2-nextM.png",
			"img/part2/p2-nv.png",
			"img/part2/fuwuqi.gif",
			"img/part2/p2-shan.png",
			"img/part2/p2-si.png",
			"img/part2/p2-title.png",
			"img/part1/banma.png",
			"img/part1/bg-part1.jpg",
			"img/part1/fuck02.gif",
			"img/part1/go1.png",
			"img/part1/go2.png",
			"img/part1/go3.png",
			"img/part1/flower.gif",
			"img/part1/haode.png",
			"img/part1/haode02.png",
			"img/part1/kaiehei_03.png",
			"img/part1/kekeke.png",
			"img/part1/listen.png",
			"img/part1/part1.png",
			"img/part1/that.png",
			"img/part1/time.gif",
			"img/part1/kaidan.gif",
			"img/part1/music.gif",
			"img/part1/no-money01.png",
			"img/part1/no-money02.png",
			"img/part3/part1.png",		
			"img/part3/if02.gif",
			"img/part3/p2-phone.gif",
			"img/part3/gohome.gif",
			"img/part3/xiaban.png",
			"img/part3/nice.png",
			"img/part3/slogan.png",
			"img/part3/p3-ku.gif",
			"img/part3/yuyue.png",
			"img/part3/shijia.png"
		];
		ImgLoadingByFile(imgFile, 'loadingPage', 'loadTxt', 'pageContainer',"musicStar");
		//活动详情
		ProvinceData.init('ddlProvince', 'ddlCity');
		SaveInfo.init();
		//内容
		var time01 = true,
		time02 = true,
		time03 = true,
		time04 = true,
		time05 = true,
		time06 = true,
		time07 = true,
		time08 = true,
		time09 = true,
		time10 = true,
		time11 = true,
		time12 = true,
		time13= true,
		time14= true,
		time15 =true;
	//part2
	var show01 = true,
		show02 = true,
		show03 = true,
		show04 = true,
		show05 = true,
		show06 = true,
		show07 = true,
		show08 = true,
		show09 = true,
		show10 = true;
	//part3
	var three01 = true,
		three02 = true,
		three03 = true,
		three04 = true,
		three05 = true,
		three06 = true,
		three07 = true,
		three08 = true,
		three09 = true;

	$(window).scroll( function() {
		/* ...do something... */
		var sh = $(window).scrollTop();
//		console.log(sh*2);
		/********动画**********/
		if(sh > (550 / 75 * wrem) && time01) { 
			$(".p1-part01").show();
			time01 = false;
		}
		if(sh > (3544 / 75 * wrem) && time02) { 
			$(".p1-listen").show();
			time02 = false;
		}
		if(sh > (4649 / 75 * wrem) && time03) { 
			$(".p1-kuang").show();
			time03 = false;
		}
		if(sh > (5080 / 75 * wrem) && time04) { 
			$(".p1-kaihei").show();
			time04 = false;
			
		}
		if(sh > (5479 / 75 * wrem) && time05) { 
			$(".p1-go1").show();
			$(".p1-go2").show();
			$(".p1-go3").show();
			time05 = false;
		}
		if(sh > (7000 / 75 * wrem) && time06) {
			$(".p1-kekeke").show();
			mKeke.play();
			time06 = false;
		}
		
		if(sh > (8950 / 75 * wrem) && time07) { 
			$(".p1-kuang2").show();
			time07 = false;
		}
		if(sh > (11300 / 75 * wrem) && time08) { 
			$(".p1-kuang3").show();
			time08 = false;
		}
		if(sh > (11700 / 75 * wrem) && time09) { 
			$(".p1-that").show();
			time09 = false;
		}
		if(sh > (14200 / 75 * wrem) && time10) { 
			$(".p1-fuck").show();
			time10 = false;
		}
		if(sh > (14362 / 75 * wrem) && time11) {
			$(".p1-banma").show();
			time11 = false;
		}
		if(sh > (14896 / 75 * wrem) && time12) { 
			$(".p1-haode").show();
			$(".p1-haode2").show();
			$('.p1-music').show();
			mBanma.play();
			time12 = false;
		}
		if(sh > (8406/ 75 * wrem) && time13) {
			mTime.play();
			time13 = false;
		}
		if(sh > (1000/ 75 * wrem) && time14) { 
	        mSahua.play();
			time14 = false;
		}
		if(sh > (9150/ 75 * wrem) && time15) { 
	        $(".p1-money01").show();
	         $(".p1-money02").show();
			time15 = false;
		}
		
		//part2
		if (sh > (15714 / 75 * wrem)&&show01) {//part2标题出来
			$('.p2-title').show();
			show01=false;
		}
		if (sh > (18900/ 75 * wrem)&&show02) {//part2开撕了出来
			$('.p2-kaisi').show();
			show02 = false;
		}
		if (sh > (19664 / 75 * wrem)&&show03) {//part2下一秒 闪电
			$('.p2-nextM').show();
			$('.p2-shandian').show();
			$('.p2-nextM').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
				$('.p2-nextM').addClass('p2-nextM-shaking');
			});
			show03 = false;
		}
		if (sh > (27720 / 75 * wrem)&&show04) {//part2 回家 路线
			$('.p2-huijia').show();
			$('.p2-luxian').show();
			mDaohang.play();
			show04 = false;
		}
		if (sh > (26814 / 75 * wrem)&&show05) {//part2 搞事情
			$('.p2-gaosq').show();
			show05 = false;
		}
		if (sh > (17730 / 75 * wrem)&&show06) {//part2 伺机而动
			$('.p2-si').show();
			$('.p2-ji').show();
			$('.p2-er').show();
			$('.p2-dong').show();
			show06 = false;
		}
		if (sh > (17088 / 75 * wrem)&&show07) {//part2 17:55
			$('.p2-red-kuang01').show();
			show07 = false;
		}
		if (sh > (22288 / 75 * wrem)&&show08) {//part2 17:59
			$('.p2-red-kuang02').show();
			mBaojing.play();
			show08 = false;
		}
		if (sh > (26088 / 75 * wrem)&&show09) {//part2 00:53
			$('.p2-red-kuang03').show();
			show09 = false;
		}
		if (sh > (22960/ 75 * wrem)&&show10) {//part2 17:59	
			mText.play();
			show10 = false;
		}
        

		//part3
		if(sh > (29193 / 75 * wrem) && three01) { //冒泡的试管
			$(".p3-part3").show();
			three01 = false;
		}
		if(sh > (29693 / 75 * wrem) && three02) { //冒泡的试管
			$(".p3-kuang").show();
			three02 = false;
		}
		if(sh > (34387 / 75 * wrem) && three03) { //冒泡的试管
			$(".p3-nice").show();
			three03 = false;
		}
		if(sh > (35037 / 75 * wrem) && three04) { //冒泡的试管
			$(".p3-kuang2").show();
			three04 = false;
		}
		if(sh > (38150 / 75 * wrem) && three05) { //冒泡的试管
			$(".p3-if").show();
			three05 = false;
		}
		if(sh > (38700 / 75 * wrem) && three06) { //冒泡的试管
			$(".p3-slogan").show();
			three06 = false;
		}
		if(sh > (31560 / 75 * wrem) && three07) { //冒泡的试管
			mZhendong.play();
			three07 = false;
		}
		if(sh > (35678 / 75 * wrem) && three08) { //冒泡的试管
			$(".p3-jump1").show();
			$(".p3-jump2").show();
			mWuniang.play();
			three08 = false;
		}
		if(sh > (38700 / 75 * wrem) && three09) { //冒泡的试管
			mEnd.play();
			three09 = false;
		}
		
	});
	$(".p3-yuyue").click(function() {
		$(this).hide();
		$(".p3-shijia").fadeIn(300);
		$(".userEnd").fadeIn(300);
	})
		
		
		firstInit = false;
	}

	//part1
	
}




var SaveInfo = {
	username:null,//name
	sex:"未知",//sex
	phone:null,//mobile
	cartype:'未选择',//car_type
	buytime:'未选择',//buy_time
	province:0,//province,dealer_name省份，城市，经销商（1,2,3）
	city:0,//city,无
	agency:0,//
	source:'wz',//source,source,123
	cartime:0,
	more_name:null,
	more_start:null,
	chart:'user_rongwei',//必传状态码
	draw_id:13,//默认为0
	init:function(){
		function GetQueryString(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r!=null&&r!=undefined)return  unescape(r[2]); return null;
		}
		SaveInfo.source = GetQueryString('source')==null?'wz':GetQueryString('source');
		SaveInfo.updateView();
	},
	updateView:function(){
		SaveInfo.inputReg();
		SaveInfo.submit();
		$('select').on('touchstart',function(){
			$(this).find('option[value="0"]').attr('disabled','disabled');
		});
		$('select').change(function(){
			$(this).addClass('changed');
		})
	},
	inputReg:function(){
		$('input[name="username"]').blur(function(){
			var val = $(this).val();
			var reg =/^[a-zA-Z\u4E00-\u9FA5]*$/;
			console.log(reg.test(val));
			if(val!=""&&val!="test"&&val!="空白"&&val!="Unknown"&&val!="未知"&&val!="未告知"&&this.validity.valid&&reg.test(val)){
				$(this).attr('placeholder','姓名');
			}else{
				$(this).val('');
				$(this).attr('placeholder','请您正确输入姓名');
			}
		});


		$('input[name="phone"]').blur(function(){
			var reg = /^1[34578]\d{9}$/;
			var val = $(this).val();
			if(isNaN(parseFloat(val))){
				$(this).val('');
				$(this).attr('placeholder','请您输入手机号');
			}else{
				if(reg.test(val)){
					$(this).attr('placeholder','手机号');

				}else{
					$(this).val('');
					$(this).attr('placeholder','请您正确输入手机号');
				}
			}

		});

	},
	clickReg:function(){
		var usernameReg = false,phoneReg = false,provinceReg = false,cityReg = false;
		var inputUsername = document.getElementById('username');
		if(inputUsername.validity.valid){
			usernameReg = true;
		}else{
			usernameReg = false;
		}
		var reg = /^1[34578]\d{9}$/;
		if(reg.test($('input[name="phone"]').val())){
			phoneReg = true;
		}else{
			phoneReg = false;
		}
		function selectReg(selectName){
			var val = $('select[name='+selectName+'] option:selected').val();
			var reg;
			if(val&&val!=0){
				reg = true;
			}else{
				reg = false;
			}
			return reg;

		}
		provinceReg = selectReg('ddlProvince');
		cityReg = selectReg('ddlCity');

		var total = usernameReg&&phoneReg&&provinceReg&&cityReg;
		console.log(usernameReg,phoneReg,provinceReg,cityReg);
		console.log(total);
		return total;
		//return true;
	},
	submit:function(){
		$('#btn-userInfo').on('click',function(e){
			e.preventDefault();
			$(".alert").click(function(){
				$(".alertBox").fadeOut(300);
				$('.btn-userInfo').addClass('btn-move');
			});
			if(SaveInfo.clickReg()){

				SaveInfo.username = $('input[name="username"]').val();
				SaveInfo.phone = $('input[name="phone"]').val();
				SaveInfo.province = $('select[name="ddlProvince"] option:selected').val();
				SaveInfo.city = $('select[name="ddlCity"] option:selected').val();
				//SaveInfo.agency = $('select[name="agency"] option:selected').val();
				// 发起Ajax调用
				var xyData = {
					name:SaveInfo.username,
					mobile:SaveInfo.phone,
					sex:SaveInfo.sex,
					dealer_name:SaveInfo.province+','+SaveInfo.city+','+SaveInfo.agency,
					car_type:SaveInfo.cartype,
					buy_time:SaveInfo.buytime,
					chart:SaveInfo.chart,
					source:SaveInfo.source
				};
				//console.log(xyData);
				$.ajax({
					type:'post',
					url:'https://h5api.xingyuanauto.com/userinfo',
					data:xyData,
					dataType:'json',
					success:function(msg){

						//console.log(msg);
						if(msg.code==1001){
							$('.success').show();
							$('.btn-userInfo').removeClass('btn-move');
							$('select option[value="0"]').attr('disabled',false);
							$('#userForm')[0].reset();
							$('select').removeClass('changed');
						}else if(msg.code==1003){//已注册
							$(".repace").show();
							$('.btn-userInfo').removeClass('btn-move');
						}else if(msg.code==1005){//重复提交
							$(".repaceagain").show();
							$('select option[value="0"]').attr('disabled',false);
							$('.btn-userInfo').removeClass('btn-move');
							$('#userForm')[0].reset();
						}else{
							$(".error").show();
						}
					},
					error:function(msg){
						$(".error").show();
					}
				});
			}else{
				$(".error").show();
				//alert('请完善信息');
			}

		});
	}
};

(function() {
	"use strict";

	function Utils() {
	}

	Utils.isWeiXin = function(){
		return navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/);
	};
	Utils.isQQ = function(){
		return navigator.userAgent.ua.match(/QQ\/([\d\.]+)/);
	};
	Utils.isQZone = function(){
		return navigator.userAgent.ua.indexOf("Qzone/") !== -1;
	};

	Utils.isIos = function() {
		return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	};
	Utils.isIPhone = function() {
		return navigator.userAgent.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1;
	};
	Utils.isIpad = function() {
		return navigator.userAgent.indexOf('iPad') > -1;
	};
	Utils.isAndroid = function() {
		var u = navigator.userAgent;
		return navigator.userAgent.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	};
	Utils.isMobile = function() {
		// var u = navigator.userAgent;
		return navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i) != null;
	};

	// ## 屏幕方向
	Utils.isPortrait = function() {
		if (!Utils.isMobile()) {
			//alert(111);
			return true;

		}
		// 安卓版 微信里面 只用判断 width 和 height
		if (Utils.isAndroid() && Utils.isWeiXin()) {
			if (Utils.windowW() < Utils.windowH()) {
				//alert(22);
				return true;

			} else {
				//alert(331);
				return false;

			}
		}
		var orientation = window['orientation'];
		if (orientation||orientation==0) {
			if (orientation == 90 || orientation == -90) {
				//alert(4442);
				return false;

			}else{
				//alert(555111);
				return true;

			}
		} else {
			if (Utils.windowW() < Utils.windowH()) {
				//alert(666111);
				return true;

			} else {
				//alert(777111);
				return false;

			}
		}
	};
	// ## jquery 获取 window 的宽度
	Utils.windowW = function() {
		// var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		return $(window).width();
	};
	// ## jquery 获取 window 的高度
	Utils.windowH = function() {
		return $(window).height();
	};
	window.Utils = Utils;
}());
$(function(){
	onResize();
	if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", onResize, false);
	}else{
		window.addEventListener( "resize", onResize, false);
	}
});

function  onResize() {

	if(Utils.isPortrait()){
		if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){

			var timer = setTimeout(function(){
				portrait();

				clearTimeout(timer);
			},100);
		}else{
			portrait();
		}
	} else {
		if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
			var timer = setTimeout(function(){
				landscape();
				clearTimeout(timer);
			},100);
		}else{
			landscape();
		}
	}
}



