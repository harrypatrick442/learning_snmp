const express = require('express');
const BodyParser = require('./BodyParser'), CORS=require('./CORS')
SNMP=require('./SNMP');
const app = express();
const port = 80;
setupPromises();
const cors = new CORS(app);
const bodyParser = new BodyParser(app, 2);
const snmp = new SNMP({target:'192.168.0.33', community:'thisispublic'});
app.get('/handler', (req, res) =>{
	console.log('request get');
});
app.post('/handler', (req, res) =>{
	const obj = JSON.parse(req.body);
	switch(obj.type){
		case 'test':
			res.send(JSON.stringify({type:'testResponse'}));
			break;
		case 'getData':
			snmp.getBulk({
				oids:["1.3.6.1.2.1.1.0.5", "1.3.6.1.2.1.1.0.6"],
				nonRepeaters:1, 
				maxRepititions:2, 
				nonRepeatersIndexZero:true
			}).then((variableBindingss)=>{
				variableBindingss.forEach((variableBindings)=>{
					variableBindings.forEach((variableBinding)=>{console.log(variableBinding.getDescription());});
				});
			}).catch(console.error);
			res.send(JSON.stringify({data: [Math.random() * 5, 2, 10]}));
			break;
	}
});
app.listen(port, () => console.log(`learning_snmp listening on port ${port}`));

function setupPromises(){
	global.Promise=require('bluebird');
	Promise.config({
		warnings: false,
		longStackTraces: true,
		cancellation: true,
		monitoring: true
	});
}