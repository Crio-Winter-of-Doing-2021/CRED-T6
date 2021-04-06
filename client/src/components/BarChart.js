import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: this.props.labels
        }
      },
      series: [
        {
          name: "Amount",
          data: this.props.data
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          
          <div className="mixed-chart" style={{width:'100%'}}>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="100%"
              height='auto'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BarChart;