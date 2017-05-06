$(function() {
	$('#btnLogin').click(function(e) {
		//e.preventDefault();

		var username = $('#username').val();
		var userpwd = $('#userpwd').val()
		if(username == "" || userpwd == "") {
			$.alert({
				title: '提示',
				content: '账号或密码不能为空！'
			});
			return false;
		}
		
		$.ajax({
			type: "post",
			url: "http://192.168.1.66:3001/signin",
			async: true,
			data: { username: username, userpwd: userpwd },
			success: function(data) {
				if(data.msg) {
					$.alert({
						title: '警告',
						content: data.msg
					});
				} else {
					//返回用户信息
					localStorage.setItem("user", JSON.stringify(result.user));
					location.href = "cms.html";
				}
			}
		});
	});
});