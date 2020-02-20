import React, {Component} from 'react';
import logo from './logo.svg';
import './app.css';
import Ajax from './Ajax';
import TemperaturesChart from './TemperaturesChart';
import TemperaturesTimeSeriesChart from './TemperaturesTimeSeriesChart';
class App extends Component{
	constructor(props){
		super(props);
		this.temperaturesChart = React.createRef();
		this.temperaturesTimeSeriesChart = React.createRef();
		let pollForNewTemperatures = this.pollForNewTemperatures.bind(this);
		this.ajax = new Ajax({url:window.location.protocol + "//" + window.location.host+':1433/handler'});
		pollForNewTemperatures();
		setInterval(pollForNewTemperatures, 5000);
		let pollForNewTemperaturesTimeSeries = this.pollForNewTemperaturesTimeSeries.bind(this);
		pollForNewTemperaturesTimeSeries();
		setInterval(pollForNewTemperaturesTimeSeries, 120000);
	}
	pollForNewTemperatures(){
		this.ajax.post({data:JSON.stringify({type:'getTemperatures'})}).then((res)=>{
			const temperatures = JSON.parse(res);
			this.temperaturesChart.current.updateTemperatures(temperatures);
		}).catch(console.error);
	}
	pollForNewTemperaturesTimeSeries(){
		this.ajax.post({data:JSON.stringify({type:'getTemperaturesTimeSeries'})}).then((res)=>{
			const temperaturesTimeSeries = JSON.parse(res);
			this.temperaturesTimeSeriesChart.current.updateTemperaturesTimeSeries(temperaturesTimeSeries);
		}).catch(console.error);
	}
	render(){
	  return (
		<div className="App">
		  <header className="header">
			<p>
			  Learning SNMP
			</p>
		  </header>
		  <TemperaturesChart ref={this.temperaturesChart}></TemperaturesChart>
		  <TemperaturesTimeSeriesChart ref={this.temperaturesTimeSeriesChart}></TemperaturesTimeSeriesChart>
		</div>
	  );
	}
}

export default App;
