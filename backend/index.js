const express = require('express');
const BodyParser = require('./BodyParser'), CORS=require('./CORS')
SNMP=require('./SNMP');
const LmTemperatureSensors= require('./LmTemperatureSensors');
const app = express();
const port = 80;
setupPromises();
const cors = new CORS(app);
const bodyParser = new BodyParser(app, 2);
const snmp = new SNMP({target:'192.168.0.33', community:'thisispublic'});
const lmTemperatureSensors = new LmTemperatureSensors(snmp);
lmTemperatureSensors.initialize().then(()=>{
	
});
			/*snmp.getBulk({
				oids:["1.3.6.1.4.1.211"],
				nonRepeaters:1, 
				maxRepititions:2, 
				nonRepeatersIndexZero:true
			}).then((variableBindingss)=>{
				variableBindingss.forEach((variableBindings)=>{
					variableBindings.forEach((variableBinding)=>{console.log(variableBinding.getDescription());});
				});
			}).catch(console.error);
			//http://www.circitor.fr/Mibs/Html/L/LM-SENSORS-MIB.php#LMTempSensorsEntry
			//http://www.circitor.fr/Mibs/Html/L/LM-SENSORS-MIB.php#LMTempSensorsEntry
			snmp.walk({
				oid:"1.3.6.1.4.1.211",
				feedCallback:function(variableBindings){
					variableBindings.forEach((variableBinding)=>{
							console.log(variableBinding.getDescription());});
				}
			}).then(()=>{
				console.log('done');
			}).catch(console.error);
			*/
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