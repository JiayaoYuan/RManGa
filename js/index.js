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
		$.ajax({
			url: "http://47.114.147.221/?mhlb=new",
			type: "get",
			async: false,
			dataType: "json",
			success: function(res){					
				if(res.code == 0){
					$.each(res.list, function(index, res){
						if(res.url != null){
							datas.push(res);
						}
					})
				}
				console.log("访问： " + res.message);
			},
			error: function(err, xmlerr, htmlerr){
				console.log(xmlerr);
			}
		});

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

		// var banner = getData("https://skb.rongzimishu.com/api/System/getBanner?ifma=0");
		// var imgnames = new Array();
		// $.each(banner.data, function(index, item){
		// 	imgnames.push("https://skb.rongzimishu.com" + item.imgpath + "/" + item.imgname);
		// });
		// imgnames.push(imgnames[0]);
		// imgnames.push(imgnames[1]);

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
		},3000);

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
			},3000);
			startX = 0;
			distanceX = 0;
			ismove = false;
		});
	};
})