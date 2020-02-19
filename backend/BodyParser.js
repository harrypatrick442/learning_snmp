module.exports = function(app, sizeLimitMB){
	var maxLength = sizeLimitMB*1000000;
	app.use((req, res, next)=>{
		const body = [];
		var length=0;
		var failed = false;
		req.on("data", (chunk) => {
			if(chunk)
				length+=chunk.length;
			if(length>maxLength)
			{
				failed=true;
				req.end();
				return;
			}
			body.push(chunk);
		});
		req.on("end", () => {
			if(failed)return;
			req.body= Buffer.concat(body).toString();
			next();
		});
	});
};