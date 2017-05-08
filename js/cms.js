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
	
		if (!user) {
			location.href="login.html";
		}
		
		$("#uname").text("您好，"+user.UserName);
		
		//退出
		$("#logout").click(function(e){
			localStorage.clear();
			location.href="login.html";
		});
		
		// 修改密码框 居中
		$("#modPassword").on('show.bs.modal', function(){
			var $this = $(this);
			var $modal_dialog = $this.find('.modal-dialog');
			// 关键代码，如没将modal设置为 block，则$modal_dialog.height() 为零
			$this.css('display', 'block');
			$modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
		});
	
		$("#savePwd").click(function(){			
			var oldpwd=$("#oldpwd").val();
			var newpwd=$("#newpwd").val();
			var renewpwd=$("#renewpwd").val();
			
			if(oldpwd=="" || newpwd=="" || renewpwd==""){
				$.alert({
					title: '警告',
					content: '密码不能为空，请填写完整！'
				});
				return false;
			}
			
			if(newpwd != renewpwd){
				$.alert({
					title: '警告',
					content: '新密码两次输入不一致！'
				});
				return false;
			}
			
			if (newpwd.length<6 || renewpwd.length<6) {
				$.alert({
					title: '警告',
					content: '新密码长度不能少于6位！'
				});
				return false;
			}
			
			var info = {userid:user.UserId,oldpwd:oldpwd,newpwd:newpwd,renewpwd:renewpwd};
			
			toolkit.sendPost(config.serverBaseUrl + "/user/modifyPwd", info, function(err, result) {
				if(err) {
					alert("错误")
					throw err;
				} else {
					var obj = JSON.parse(result);
					if(obj.errCode) {
						alert(obj.errCode + "===" + obj.errMsg);
					} else {
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

$(function(){
	var user = JSON.parse(localStorage.getItem("user"));
	
	if (!user) {
		location.href="login.html";
	}
	
	$("#uname").text("您好，"+user.UserName);
	
	$("#logout").click(function(e){
		localStorage.clear();
		location.href="login.html";
	});
	
	// 修改密码框 居中
	$("#modPassword").on('show.bs.modal', function(){
		var $this = $(this);
		var $modal_dialog = $this.find('.modal-dialog');
		// 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
		$this.css('display', 'block');
		$modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
	});

	$("#savePwd").click(function(){
				
		var oldpwd=$("#oldpwd").val();
		var newpwd=$("#newpwd").val();
		var renewpwd=$("#renewpwd").val();
		
		if(oldpwd=="" || newpwd=="" || renewpwd==""){
			$.alert({
				title: '警告',
				content: '密码不能为空，请填写完整！'
			});
			return false;
		}
		
		if(newpwd != renewpwd){
			$.alert({
				title: '警告',
				content: '新密码两次输入不一致！'
			});
			return false;
		}
		
		if (newpwd.length<6 || renewpwd.length<6) {
			$.alert({
				title: '警告',
				content: '新密码长度不能少于6位！'
			});
			return false;
		}
		
		var info = {userid:user.UserId,oldpwd:oldpwd,newpwd:newpwd,renewpwd:renewpwd};
		
		toolkit.sendPost(config.serverBaseUrl + "/user/modifyPwd", info, function(err, result) {
			if(err) {
				alert("错误")
				throw err;
			} else {
				var obj = JSON.parse(result);
				if(obj.errCode) {
					alert(obj.errCode + "===" + obj.errMsg);
				} else {
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
		
//		$.post("url",data,function(err,result){
//			if (err) {
//				$.alert({
//					title: '警告',
//					content: err.msg
//				});
//			} else{
//				$.alert({
//				    title: '提示',
//				    content: '修改成功',
//				    confirm: function(){
//				        location.href="login.html";
//				    }
//				});
//			}
//		});
	})
});
