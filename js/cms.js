// 所有模块都通过 define 来定义
define(function(require, exports, module) {
	var toolkit = require("./toolkit");
	var config = require("./config");

	function Cms() {
		self = this;
		this.init();
	}
	
	Cms.prototype.init = function() {
		var user = JSON.parse(localStorage.getItem("user"));
	
//		if (!user) {
//			location.href="login.html";
//		}
		
		$("#uname").text("您好，"+user.UserName);
		
		//获取左侧菜单
		//this.getMenu(user);
		
		//获取咨询列表
		//this.getPublishInfoList();
		
		this.bindEvent();
	}
	
	Cms.prototype.getMenu = function(user){
		var info = {userid:user.UserId};
		toolkit.sendPost(config.serverBaseUrl + "/user/getMenu", info, function(err, result) {
			if(err) {
				alert("错误");
				throw err;
			} else {
				var obj = JSON.parse(result);
				if(obj.errCode) {
					alert(obj.errCode + "===" + obj.errMsg);
				} else {
					
				}
			}
		});
	}
	
	Cms.prototype.getPublishInfoList = function(){
		
	}
	
	Cms.prototype.bindEvent = function(){
		//退出
		$("#logout").click(function(e){
			var info = {username:user.UserName};
			toolkit.sendPost(config.serverBaseUrl + "/user/logout", info, function(err, result) {
				if(err) {
					alert("错误")
					throw err;
				} else {
					var obj = JSON.parse(result);
					if(obj.errCode) {
						alert(obj.errCode + "===" + obj.errMsg);
					} else {
						localStorage.clear();
						location.href="login.html";
					}
				}
			});
		});
		
		// 修改密码框 居中
		$("#modPassword").on('show.bs.modal', function(){
			$("#oldpwd").val("");
			$("#newpwd").val("");
			$("#renewpwd").val("");
			var $this = $(this);
			var $modal_dialog = $this.find('.modal-dialog');
			// 关键代码，如没将modal设置为 block，则$modal_dialog.height() 为零
			$this.css('display', 'block');
			$modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
		});
	
		//修改密码
		$("#savePwd").click(function(){
			var oldpwd=$("#oldpwd").val();
			var newpwd=$("#newpwd").val();
			var renewpwd=$("#renewpwd").val();
			
			if(oldpwd=="" || newpwd=="" || renewpwd==""){
//				$.alert({
//					title: '警告',
//					content: '密码不能为空，请填写完整！'
//				});
				$("#warnCode span").text("密码不能为空，请填写完整！");
				$("#warnCode").css("display","block");
				return false;
			}
			
			if(newpwd != renewpwd){
//				$.alert({
//					title: '警告',
//					content: '新密码两次输入不一致！'
//				});
				$("#warnCode span").text("新密码两次输入不一致！");
				$("#warnCode").css("display","block");
				return false;
			}
			
			if (newpwd.length<6 || renewpwd.length<6) {
//				$.alert({
//					title: '警告',
//					content: '新密码长度不能少于6位！'
//				});
				$("#warnCode span").text("新密码长度不能少于6位！");
				$("#warnCode").css("display","block");
				return false;
			}
			
			var info = {userId:user.UserId, oldPassword:oldpwd, newPassword:newpwd};
			
			toolkit.sendPost(config.serverBaseUrl + "/authority/modifyPW", info, function(err, result) {
				if(err) {
					alert("错误");
					throw err;
				} else {
					var obj = JSON.parse(result);
					if(obj.errCode) {
						$("#warnCode span").text(obj.errMsg);
						$("#warnCode").css("display","block");
					} else {
						//$("#saveCode span").html("保存成功，将在3秒后<a id='backLogin' href='login.html'>返回</a>首页");
						//$("#saveCode").css("display","block");
//						var count = 2;
//						var timer = setInterval(function() {
//							if (count==0) {
//								clearInterval(timer);
//								localStorage.clear();
//							    location.href="login.html";
//							} else{
//								$("#saveCode span").html("保存成功，将在"+count+"秒后<a id='backLogin' href='login.html'>返回</a>首页");
//								count--;
//							}
//						},1000);
						$.alert({
						    title: '提示',
						    content: '修改成功',
						    confirm: function(){
						    	localStorage.clear();
						        location.href="login.html";
						    }
						});
					}
				}
			});
		})
		
		$('.nav li').click(function(e) {
			$('.nav li').removeClass('active');
			//$(e.target).addClass('active');
			$(this).addClass('active');
		});
	}
	
	module.exports = new Cms();
})
