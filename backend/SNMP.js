const netSnmp = require('net-snmp');
const VariableBinding = require('./VariableBinding');
module.exports = function(params){
	const target = params.target;
	if(!target)throw new Error('No target provided');
	const community = params.community;
	if(!community)throw new Error('No community provided');
	const  options = {
		port: 161,
		retries: 1,
		timeout: 5000,
		transport: "udp4",
		trapPort: 162,
		version: netSnmp.Version1,
		idBitsSize: 32
	};
	this.get = function(params){
		return new Promise((resolve, reject)=>{
			const oids = params.oids;
			if(!oids)throw new Error('No oids provided');
			const session = getSession();
			session.get(oids, function (err, varbinds) {
				if (err) {
					reject(err);
					return;
				}
				const [error, variableBindings] = parseVariableBindings(varbinds);
				if(error){
					reject(error);
					return;
				}
				resolve(variableBindings);
				session.close();
			});
		});
	};
	this.getBulk = function(params){
		return new Promise((resolve, reject)=>{
			const oids = params.oids, nonRepeaters = params.nonRepeaters,
			maxRepititions = params.maxRepititions, nonRepeatersIndexZero=params.nonRepeatersIndexZero;
			if(!oids)throw new Error('No oids provided');
			const session = getSession();
			const callback = (err, varbindss)=>{
				console.log(err);
				console.log(varbindss);
				if (err) {
					reject(err);
					return;
				}
				let variableBindingss=[];
				let nestedStart=0;
				if(nonRepeaters){
					 const [err, variableBindings] = parseVariableBindings(varbindss, nonRepeaters);
					 if(err){
						reject(err);
						return;
					 }
					 if(nonRepeatersIndexZero){
						variableBindingss.push(variableBindings);
					 }
					 else{
						 variableBindingss=variableBindingss.concat(variableBindings);
					 }
					 nestedStart=nonRepeaters;
				}
				for(var i=nestedStart; i<varbindss.length; i++){
					const varbinds = varbindss[i];
					const [error, variableBindings] = parseVariableBindings(varbinds);
					if(error){
						reject(error);
						return;
					}
					variableBindingss.push(variableBindings);
				}
				resolve(variableBindingss);
				session.close();
			};
			if(nonRepeaters!==undefined)
			{
				if(maxRepititions!==undefined)
				{
					session.getBulk(oids, nonRepeaters, maxRepititions, callback);
				}
				else
				{
					session.getBulk(oids, nonRepeaters, callback);
				}
			}
			else
			{
				if(maxRepititions!==undefined)
				{
					session.getBulk(oids, undefined, maxRepititions, callback);
				}
				else
				{
					session.getBulk(oids, callback);
				}
			}
		});
	};
	function parseVariableBindings(varbinds, nonRepeaters){
		const variableBindings = [], len=nonRepeaters?nonRepeaters:varbinds.length;
			console.log(varbinds);
		for (var i = 0; i < len; i++){
			const variableBinding = varbinds[i];
			if (netSnmp.isVarbindError(variableBinding)){
				return [netSnmp.varbindError(variableBinding), null];
			}
			variableBindings.push(new VariableBinding(variableBinding));
		}
		return [null, variableBindings];
	}
	function getSession(){
		return netSnmp.createSession (target, community, options);
	}
};