import React, {Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
class Chart extends Component {
	constructor(props){
		super(props);
		this.updateData = this.updateData.bind(this);
		this.state = {
		  chartOptions: {
			xAxis: {
			  categories: ['A', 'B', 'C'],
			},
			series: [
				{ data: [1, 2, 3] }
			],
			plotOptions: {
			  series: {
				point: {
				  events: {
					mouseOver: this.setHoverData.bind(this)
				  }
				}
			  }
			}
		  },
		  hoverData: null
		};
	}
	updateData(data){
		console.log(data);
		this.setState({
		  chartOptions: {
			series: [
			  { data: data}
			]
		  }
		});
	}
	setHoverData = (e) => {
		console.log('set hover data');
		// The chart is not updated because `chartOptions` has not changed.
		this.setState({ hoverData: e.target.category })
	}
	render(){
		console.log('render');
		const { chartOptions, hoverData } = this.state;
		return (
			<div>
				<HighchartsReact
				  highcharts={Highcharts}
				  options={chartOptions}
				/>
			</div>
		);
		
		
	}
}

export default Chart;
