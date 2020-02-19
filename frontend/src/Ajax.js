const Ajax = function(params){
	var DEFAULT_CONTENT_TYPE='application/json';
	const classUrl =  params['url'];
	this['post']=function(params){
		return ajax(params, 'POST');
	};
	this['get']=function(parmas){
		return ajax(params, 'GET');
	};
	function ajax(params, method){
		return new Promise((resolve, reject)=>{
			let _done = false;
			const parameters = params['parameters'],
				contentType = params['contentType']?params['contentType']:DEFAULT_CONTENT_TYPE,
				timeout = params['timeout'], data=params['data'];
			console.log(params);
			let url = addUrlParameters(params.url?params.url:classUrl, parameters);
			var xhr = new XMLHttpRequest();
			if(timeout)
				xhr.timeout=timeout;
			xhr.open(method, url, true);
			xhr.setRequestHeader('Content-Type', contentType);			
			xhr.onload = function() {
				if (xhr.readyState === 4)
				{
					if(xhr.status === 200) {
						done(null, xhr.responseText);
						return;
					}
					var errorMessage = 'Request failed.  Returned status of ' + xhr.status;
					done(new Error(errorMessage));
				}
			};
			xhr.send(data);
			xhr.onerror=done;
			function done(err, res){
				if(_done)return;
				_done=true;
				if(err)reject(err);
				else resolve(res);
			}
		});
	}
	function addUrlParameters(url, parameters){
		if(!parameters)return url;
		var first=true;
		for(var key in parameters){
			if(first)first=false;else url+='&';
			url+=key;
			url+='=';
			url+=parameters[key];
		}
		return url;
	}
}
export default Ajax;