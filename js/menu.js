$(function() {
	$('.nav li').click(function(e) {
		$('.nav li').removeClass('active');
		//$(e.target).addClass('active');
		$(this).addClass('active');
	});
	
	$.ajax({
			type:"post",
			url:"http://192.168.1.66:3002/cms/getMenu",
			async:true,
			data:{userid:localStorage.getItem("user").uid},
			success:function(data) {
				if (data.msg) {
					$.alert({
						title: '警告',
						content: data.msg
					});
				} else{	
					//生成菜单
				}
			}
	});
	
	$("#advMenu").click(function(){
		
	});
	
	$("#infoMenu").click(function(){
		
	});
	
	$("#authMenu").click(function(){
		
	});
	
	$("#logMenu").click(function(){
		
	});
})