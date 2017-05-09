// 所有模块都通过 define 来定义
define(function(require, exports, module) {
	var toolkit = require("./toolkit");
	var config = require("./config");

	function Login() {
		self = this;
		this.init();
	}

	Login.prototype.init = function() {
		$('#btnLogin').click(function(e) {

			var username = $('#username').val();
			var userpwd = $('#userpwd').val()
			if(username == "" || userpwd == "") {
				$("#warnCode span").text("账号或密码不能为空");
				$("#warnCode").css("display","block");
				return false;
			}

			var info = {
				username: username,
				password: userpwd
			};

			toolkit.sendPost(config.serverBaseUrl + "/user/login", info, function(err, result) {
				if(err) {
					alert("错误")
					throw err;
				} else {
					var obj = JSON.parse(result);
					if(obj.errCode) {
						$("#warnCode span").text(obj.errMsg);
						$("#warnCode").css("display","block");
					} else {
						var obj = JSON.parse(result);
						//返回用户信息
						localStorage.setItem("user", result);
						location.href = "cms.html";
					}
				}
			});
		});
	}

	module.exports = new Login();
});