var getData = function(url, pd){
	var _data = getReq(url, pd);
	return _data;
}

//请求数据
function getReq(url, pd){
	var obj;
	$.ajax({
		url: url,
		type: "get",
		async: false,
		data: pd,
		dataType: 'json',
		success: function(res){					
			obj = res;
		},
		error: function(err){
			console.log(err);
		}
	});
	return obj;
}

//推送数据
function postReq(url, data){
	$.ajax({
		url: url, 
        type: "post",                        
        data: data,
        contentType: false,
        processData: false,
        success: function(data){
			var json = JSON.parse(data);
			if(json.code == 202){
				console.log("loadup is ok");
			}
        }
     });
}