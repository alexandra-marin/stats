import React, { Component } from 'react';
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer, Sector,
  Label, LabelList } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import _ from 'lodash';
import numbers from './number'

const colors = [
    '#040B40',
    '#02CEDB',
    '#5461CC',
    '#040B40',
    '#040B40',
    '#040B40',
    '#040B40',
    '#040B40',
    '#040B40',
    '#040B40',
];

let dau = 300;
let wau = 300;
let mau = 300;
let total = 1000;

let data02 = [
    // { name: 'Daily', value: mau },
    // { name: 'Weekly', value: wau },
    { name: 'Monthly', value: mau },
    { name: 'Total', value: total - mau }
];

const initialState = { data02 };

const renderLabelContent = (props) => {
  const { value, percent, x, y, midAngle } = props;

  return (
    <g transform={`translate(${x}, ${y})`} textAnchor={ (midAngle < -90 || midAngle >= 90) ? 'end' : 'start'}>
      <text x={0} y={0}>{`Count: ${value}`}</text>
      <text x={0} y={20}>{`(Percent: ${(percent * 100).toFixed(2)}%)`}</text>
    </g>
  );
};

  
const changeNumberOfData = (data) => {
    if (Array.isArray(data)) {
      return data.map(changeNumberOfData);
    }
  
    if (typeof data === 'object') {
      return _.mapValues(data, val => {
        if(data.name === 'Daily') return parseInt(dau);
        if(data.name === 'Weekly') return parseInt(wau);
        if(data.name === 'Monthly') return parseInt(mau);
        if (typeof val === 'number') {
          return parseInt(total - mau);
        }

        return changeNumberOfData(val);
      });
    }
  
    return data;
  }

export default class PeerioPieChart2 extends Component {
  static displayName = 'PieChartDemo';

  onPieEnter = (data, index, e) => {
    this.setState({
      activeIndex: index,
    });
  };

  state = {
    ...initialState,
    activeIndex: 0,
    animation: false,
  };

  handleChangeData = () => {
    this.setState(() => _.mapValues(initialState, changeNumberOfData));
    this.handleChangeAnimation();
   numbers.push( {'Daily': dau, 'Weekly': wau, 'Monthly': mau,  'At': new Date()} );
  };

  handleChangeAnimation = () => {
    this.setState({
      animation: !this.state.animation,
    });
  };

  handlePieChartEnter = (a, b, c) => {
    console.log(a, b, c);
  };

  handleEnter = (e, activeIndex) => this.setState({ activeIndex });
  handleLeave = () => this.setState({ activeIndex: -1 });

  handleDau = (event) => {
    dau = event.target.value;
  }
  handleWau= (event) => {
    wau = event.target.value;
  }
  handleMau= (event) => {
    mau = event.target.value;
  }
  handleTotal= (event) => {
    total = event.target.value;
  }

  render () {
    const { data02 } = this.state;

    return (
        <div class="App">
        <div style={{ 
            alignContent: 'center',
            width: 150,
            alignSelf: 'center',
            paddingLeft: 500
        }}>
        <form onSubmit={(event) => event.preventDefault()}>
        {/* <label>
            DAU:
            <input type="text"  onChange={this.handleDau} />
        </label>*/}
        {/* <label> 
            WAU:
            <input type="text" onChange={this.handleWau} />
        </label> */}
        <label>
            MAU:
            <input type="text"  onChange={this.handleMau} />
        </label>
        <label>
            Total:
            <input type="text"  onChange={this.handleTotal} />
        </label>
        </form>
        <br/>
        </div>
      <div className="pie-charts">
        <div className="pie-chart-wrapper">
          <PieChart width={800} height={400}>
            <Pie
              data={data02}
              dataKey="value"
              cx={600}
              cy={200}
              startAngle={180}
              endAngle={-180}
              innerRadius={60}
              outerRadius={80}
              label={renderLabelContent}
              paddingAngle={5}
              isAnimationActive={this.state.animation}
            >
              {
                data02.map((entry, index) => (
                  <Cell key={`slice-${index}`} fill={colors[index % 10]}/>
                ))
              }
              <Label width={50} position="center">
                Users
              </Label>
            </Pie>
            <Legend wrapperStyle={{width: 200, alignSelf:'center', padding:0, alignContent:'center',  paddingLeft: 500}}/>

          </PieChart>
        </div>
        </div>
      </div>
    );
  }
}

