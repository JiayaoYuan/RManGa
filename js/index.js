$(document).ready(function(){	
	/*_banner 轮播图*/
	_banner();
	function _banner(){	
		var banner = document.querySelector(".slider_wrapper");
		var imgbox = document.querySelector(".list");	
		var pointbox = document.querySelector(".slide_nav");
		var points = pointbox.querySelectorAll("li");
		var s_height = banner.offsetWidth;
		var _index = 1;
		var startX = 0;
		var distanceX = 0;
		var ismove = false;
		var imgs = new Array();
		var lis = imgbox.querySelectorAll("li");
		var imgs = new Array();

		var datas = new Array();
		var randomNum = new Array();
		var newdatas = new Array();
		var imgnames = new Array();

		//最新
		var defer = $.Deferred();	
		$.ajax({
			url: "http://47.114.147.221/?mhlb=shaonianrexue",
			type: "get",
			async: false,
			dataType: "json",
			success: function(res){					
				if(res.code == 0){
					defer.resolve(res);
					$.when(defer.promise()).done(function(res){
						if(res.list != ""){
							if(Number(res.list[0].number ) > 1){
								$.each(res.list, function(index, res){
									if(res.url != null){
										datas.push(res);
									}
								})
							}
						}
					})					
				}
				console.log("访问： " + res.message);
			},
			error: function(err, xmlerr, htmlerr){
				console.log(xmlerr);
			}
		});

		if(datas.length == 5){
			randomNum = numRandom(datas.length, 5);
			for(var i = 0; i < randomNum.length; i++){
				newdatas.push(datas[randomNum[i]]);
			}
			for(var i = 0; i < newdatas.length; i++){
				imgnames.push(newdatas[i].cover);
			}
			imgnames.push(imgnames[0]);
			imgnames.push(imgnames[1]);
			newdatas.push(newdatas[0]);
			newdatas.push(newdatas[1]);

			for(var i=0;i<lis.length;i++){
				var img = lis[i].getElementsByTagName("img")[0];		
				img.src = imgnames[i];
				img2 = img.cloneNode();
				img3 = img.cloneNode();
				img.parentNode.appendChild(img2);
				img.parentNode.appendChild(img3);
				img.parentNode.setAttribute("href", "./comic.html?url="+newdatas[i].url);
				imgs.push(img);	
			}
			
		}else if(datas.length != 5){
			randomNum = numRandom(namelist.length, 5);
			var url = "";
			for(var i = 0; i < randomNum.length; i++){
				var defer = $.Deferred();	
				url = "http://47.114.147.221/?mhname="+namelist[randomNum[i]].name;
				$.ajax({
					url: url,
					type: "get",
					async: false,
					dataType: "json",
					success: function(res){
						defer.resolve(res);
						$.when(defer.promise()).done(function(res){
							if(res.list != ""){
								datas.push(res.list[0]);
							}
						})					
					},
					error: function(err, xmlerr, htmlerr){
						console.log(xmlerr);
					}
				});
			}
			
			if(datas.length == 5){
				for(var i = 0; i < datas.length; i++){
					imgnames.push(datas[i].cover);
				}
				imgnames.push(imgnames[0]);
				imgnames.push(imgnames[1]);
				datas.push(datas[0]);
				datas.push(datas[1]);

				for(var i=0;i<lis.length;i++){
					var img = lis[i].getElementsByTagName("img")[0];		
					img.src = imgnames[i];
					img2 = img.cloneNode();
					img3 = img.cloneNode();
					img.parentNode.appendChild(img2);
					img.parentNode.appendChild(img3);
					img.parentNode.setAttribute("href", "./comic.html?url="+datas[i].url);
					imgs.push(img);	
				}
			}			
		}else{
			$(".slcf_banner").hide();
		}

		// var banner = getData("https://skb.rongzimishu.com/api/System/getBanner?ifma=0");
		// var imgnames = new Array();
		// $.each(banner.data, function(index, item){
		// 	imgnames.push("https://skb.rongzimishu.com" + item.imgpath + "/" + item.imgname);
		// });
		// imgnames.push(imgnames[0]);
		// imgnames.push(imgnames[1]);

		var addtransition = function(){
			imgbox.style.transition = "all .2s";
			imgbox.style.webkitTransition = "all .2s";
		}
		var removetransition = function(){
			imgbox.style.transition = "none";
			imgbox.style.webkitTransition = "none";
		}
		var addtransform = function(translateX){
			imgbox.style.transform = "translateX(" + translateX + "px)";
			imgbox.style.webkitTransform = "translateX(" + translateX + "px)";
		}
		var imgsValue = function(z_index, W, oC, mT, H, radiu){
			imgs[z_index].parentNode.style.width = W;
			imgs[z_index].parentNode.style.opacity = oC;
			imgs[z_index].parentNode.style.marginTop = mT;
			imgs[z_index].parentNode.style.height = H;
			// imgs[z_index].style.borderRadius = radiu;
			// imgs[z_index].style.borderRadius = bR;			
		}
		var changeStyle = function(_index){
			if(_index >= 0 && _index <= imgs.length-1){
				for(var i=0;i<imgs.length;i++){				
					imgsValue(i, "80%", .8, ".352rem", "2.816rem", "10px");
				}

				imgsValue(_index, "100%", 1, "0", "3.52rem", "0px");
			}
		}	
		var _time = setInterval(function(){
			_index++;
			addtransition();
			addtransform(-_index * s_height);
			changeStyle(_index);
		},300000);

		imgbox.addEventListener("transitionend",function(){
			if(_index >= 6){
				_index = 1;
				changeStyle(_index);
				removetransition();
				addtransform(-_index * s_height);
			}else if(_index <= 0){
				_index = 5;
				changeStyle(_index);
				removetransition();
				addtransform(-_index * s_height);
			}
			setpoint();
		});
		var setpoint = function(){
			for(var i=0;i<points.length;i++){
				points[i].classList.remove("active");
			};
			points[_index - 1].classList.add("active");
		};
		imgbox.addEventListener("touchstart",function(e){
			clearInterval(_time);
			startX = e.touches[0].clientX;
			changeStyle(_index);
		});
		imgbox.addEventListener("touchmove",function(e){
			var moveX = e.touches[0].clientX;
			distanceX = moveX - startX;
			var _translateX = -_index * s_height + distanceX;
			removetransition();
			addtransform(_translateX);
			ismove = true;
		});
		imgbox.addEventListener("touchend",function(e){
			if(ismove){
				if(Math.abs(distanceX) < s_height/20){
					addtransition();
					addtransform(-_index*s_height);
				}else{
					if(distanceX > 0){
						_index--;
					}else{
						_index++;
					}
					addtransition();
					addtransform(-_index*s_height)
				}
				changeStyle(_index);
			}
			clearInterval(_time);		
			_time = setInterval(function(){
				_index++;
				addtransition();
				addtransform(-_index * s_height);
				changeStyle(_index);
			},300000);
			startX = 0;
			distanceX = 0;
			ismove = false;
		});
	};


	/*搜索*/
	var searchText = null;
	var searchdatas = new Array();

	function getDatas(url, arrdatas){
		var defer = $.Deferred();				
		$.ajax({
			url: "http://47.114.147.221/?mhname="+url,
			type: "get",
			async: false,
			dataType: "json",
			success: function(res){						
				if(res.code == 0){
					defer.resolve(res);
					$.when(defer.promise()).done(function(res){
						if(res.list != ""){
							$.each(res.list, function(index, res){
								if(res.url != null){
									arrdatas.push(res);
								}
							})
						}				
					})
				}
				console.log("访问： " + res.message);
			},
			error: function(err, xmlerr, htmlerr){
				console.log(xmlerr);
			}
		});		
	}

	$(".search-link").click(function(){
		//搜索页show
		$("#searchMG").show();
	})

	/*关闭搜索*/
	$(".search-content").click(function(){
		//搜索页show
		$("#searchMG").hide();
	})

	function itemEle(name, url, cover, latest){
		var html = "<li class='search-init-li'><a href='./comic.html?url="+url+"' class='item-link'><div class='item-cover-div'><img src='"+cover+"' alt=' class='item-cover'></div><div class='item-info'>";
		if(name != null){
			html = html + "<strong class='item-title'>"+name+"</strong>";
		}
		if(latest != null){
			html = html + "<small class='item-class'>"+latest+"</small>";
		}				
		html = html + "</div></a></li>";
		return html;
	}

	/*回车搜索*/
	$(".search-box-text").on("keypress", function(e){
		if(e.which == 13){
			searchText = $(".search-box-text").val();
			if(searchText != null){
				getDatas( searchText, searchdatas);

				if(searchdatas.length > 1){
					//返回给ui
					for(var i = 0; i < searchdatas.length; i++){
						if(searchdatas[i].name != null && searchdatas[i].url != null && searchdatas[i].cover != null){
							$("#searchMG .search-init-ul").append(itemEle(searchdatas[i].name, searchdatas[i].url, searchdatas[i].cover, searchdatas[i].latest));
						}
					}								
				}
			}
		}		
	})	
})