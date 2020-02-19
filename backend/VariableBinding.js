module.exports = function(params){
	const oid = params.oid, value = params.value;
	if(!oid)throw new Error('No oid provided');
	if(value===undefined)throw new Error('No value provided');
	this.getOid = getOid;
	this.getValue = getValue;
	this.getDescription = getDescription;
	function getDescription(){
		return getOid() + " = " + getValue();
	}
	function getOid(){
		return oid;
	}
	function getValue(){
		return value;
	}
};