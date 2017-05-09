$(function(){
	$("#delInfo").click(function(){
		$.confirm({
		    title: 'Confirm!',
		    content: 'Simple confirm!',
		    confirm: function(){
		        alert(111);
		    },
		    cancel: function(){
		        alert(111);
		    }
		});
	})
})
