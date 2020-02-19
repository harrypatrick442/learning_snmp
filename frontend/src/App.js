import React, {Component} from 'react';
import logo from './logo.svg';
import './app.css';
import Ajax from './Ajax';
import Chart from './Chart';
class App extends Component{
	constructor(props){
		super(props);
		this.temperaturesChart = React.createRef();
		let pollForNewData = this.pollForNewData.bind(this);
		pollForNewData();
		setInterval(pollForNewData, 5000);
	}
	pollForNewData(){
		const ajax = new Ajax({url:'http://localhost/handler'});
		ajax.post({data:JSON.stringify({type:'getTemperatures'})}).then((res)=>{
			const temperatures = JSON.parse(res);
			this.temperaturesChart.current.updateTemperatures(temperatures);
		}).catch(console.error);
	}
	render(){
	  return (
		<div className="App">
		  <header className="header">
			<p>
			  Learning SNMP.
			</p>
		  </header>
		  <Chart ref={this.temperaturesChart}></Chart>
		</div>
	  );
	}
}

export default App;
