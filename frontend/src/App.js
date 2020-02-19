import React, {Component} from 'react';
import logo from './logo.svg';
import './app.css';
import Ajax from './Ajax';
import Chart from './Chart';
class App extends Component{
	constructor(props){
		super(props);
		this.chartA = React.createRef();
		let pollForNewData = this.pollForNewData.bind(this);
		pollForNewData();
		setInterval(pollForNewData, 5000);
	}
	pollForNewData(){
		const ajax = new Ajax({url:'http://localhost/handler'});
		ajax.post({data:JSON.stringify({type:'getData'})}).then((res)=>{
			res = JSON.parse(res);
			this.chartA.current.updateData(res.data);
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
		  <Chart ref={this.chartA}></Chart>
		</div>
	  );
	}
}

export default App;
