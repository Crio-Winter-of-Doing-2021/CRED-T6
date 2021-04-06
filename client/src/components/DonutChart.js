import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class DonutChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: this.props.labels,
      },
      series: this.props.data,
      
    }
  }

  render() {

    return (
        <div className="app">
          <div className="row">
            
            <div className="donut" style={{width:'100%',marginLeft:'15%'}}>
            <Chart options={this.state.options} series={this.state.series} type="donut" width="90%" />
            </div>
          </div>
        </div>
    );
  }
}

export default DonutChart;