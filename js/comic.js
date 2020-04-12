$(document).ready(function(){
	//漫画阅读器点击 打开 控制面板
	$("#open-ctrl").click(function(){
		$(".float-bar").show();
		$(".top").removeClass("downtop");
		$(".bottom").removeClass("downbottom");
		$(".top").addClass("ontop");
		$(".bottom").addClass("onbottom");
		$(".comic-ctrl-box").show();
		$(".prev").css("z-index", 0);
		$(".next").css("z-index", 0);
	})
	//漫画阅读器点击 关闭 控制面板
	$(".comic-ctrl-box").click(function(){		
		$(".top").removeClass("ontop");
		$(".bottom").removeClass("onbottom");
		$(".top").addClass("downtop");
		$(".bottom").addClass("downbottom");
		setTimeout(function(){
			$(".float-bar").hide();
			$(".comic-ctrl-box").hide();
		}, 300);
		$(".prev").css("z-index", 20000);
		$(".next").css("z-index", 20000);
	})

})