module.exports = function(app){
	const url = require('url');
	app.use((req, res, next)=>{
		switch(req.method){
			case 'POST':
			case 'GET':
				res.setHeader('Access-Control-Allow-Methods', req.method);
				res.setHeader('Access-Control-Allow-Origin', '*');
				next();
			return;
			case 'OPTIONS': 
			var origin = req.get('origin');//the origin of the request. the href of the page.
			//console.log(req.get('host'));//the one it wants access to which would be me ( localhost as im debugging locally)
			var originUrl = url.parse(origin);//want host or hostname
			console.log(originUrl.hostname);
			var requestHeaders = req.header('Access-Control-Request-Headers');
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
			res.setHeader('Access-Control-Allow-Headers', /*'X-Requested-With,content-type'*/requestHeaders);
			
			// Set to true if you need the website to include cookies in the requests sent
			// to the API (e.g. in case you use sessions)
			//res.setHeader('Access-Control-Allow-Credentials', true);
			return res.status(200).end();
		}
		next();
	});
};