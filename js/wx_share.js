/**
 * 极客之家 高端Javascript - 微信自定义分享
 * @copyright  Copyright (c) 2016 QIN TEAM (http://www.qlh.com)
 * @license    GUN  General Public License 2.0
 * @version    Id:  Type_model.php 2017-5-19 16:36:52
 *
 * @ url     获取用户签名地址
 * @ msg     用户签名数据
 * @ title   分享标题
 * @ link    分享跳转地址  默认一般是首页面地址
 * @ desc    分享描述  显示在标题下面显示  只有发送给朋友才能看到
 * @ imgUrl  分享图片
 * @ wx_appId    必填，公众号的唯一标识
 * @ wx_timestamp    必填，生成签名的时间戳
 * @ wx_nonceStr     必填，生成签名的随机串
 * @ wx_signature    必填，签名
 */
function wxShare(obj){
	var url = "https://h5php.xingyuanauto.com/weixin_serve/jssdk/wx_token.php";//微信公众号验证接口
	$.post(url,function(msg){
		if(msg.start == 0){
          return alert(msg.message);
        }
        var title = typeof(obj.title) == "undefined" ? obj.title : '分享标题';//项目宽
        var desc = typeof(obj.desc) == "undefined" ? obj.desc : '分享描述';//项目宽
        var imgPath = typeof(obj.imgPath) == "undefined" ? obj.imgPath : 'img/share.jpg';//项目宽
			function getUrl(){
					var url = window.location.href;
					
					var an = url.split('?')[0];
					var locationurl = an.split('index.html')[0];
					var imgurl = locationurl+imgPath;
					return imgurl;
			} 
			            			
			var title =title; // 分享标题
            var link = window.location.href;
            var desc = desc; // 分享描述
            var imgUrl = getUrl();
		    var wx_appId = msg.appId;
			var wx_timestamp = msg.timestamp;
			var wx_nonceStr = msg.nonceStr;
			var wx_signature = msg.signature;

		     /*
             * 注意：
             * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
             * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
             * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
             *
             * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
             * 邮箱地址：weixin-open@qq.com
             * 邮件主题：【微信JS-SDK反馈】具体问题
             * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
             */
            wx.config({
                debug: false,
                appId: wx_appId,
                timestamp: wx_timestamp,
                nonceStr: wx_nonceStr,
                signature: wx_signature,
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'onMenuShareTimeline',//分享到朋友圈
                    'onMenuShareAppMessage',//分享给朋友
                    'onMenuShareQQ',//分享到QQ
					'onMenuShareQZone',//分享到QQ空间
                    'onMenuShareWeibo'//分享到腾讯微博
                ]
            });

		   wx.ready(function () {
                // 在这里调用 API

				//分享到朋友圈
                wx.onMenuShareTimeline({
                    title:title, // 分享标题
                    link: link, // 分享链接
                    desc: desc, // 分享描述
                    imgUrl:imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

				//分享到朋友
				wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                //分享到QQ
				wx.onMenuShareQQ({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

				//分享到QQ空间
				wx.onMenuShareQZone({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: link, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function () {
					   // 用户确认分享后执行的回调函数
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});

				//分享到腾讯微博
                wx.onMenuShareWeibo({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: link, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

            });

	},'json')

}