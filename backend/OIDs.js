module.exports = new(function(){
	this.getTemperature=function(n){
		return `1.3.6.1.4.1.30503.1.5.{n}`;
	};
	this.getFanSpeeds = function(n){
		return `1.3.6.1.4.1.30503.1.6.{n}`;
	};
	this.getVoltage = function(n){
		return `1.3.6.1.4.1.30503.1.7.{n}`;
	};
})();