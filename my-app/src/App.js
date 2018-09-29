import React, { Component, Image } from 'react';
import logo from './logo.svg';
import PeerioPieChart from './pie';
import PeerioPieChart2 from './pie.1';
import PeerioPieChart3 from './pie.2';
import './App.css';

class App extends Component {
  x = 'dau';
  onSelect= (event) => {
    console.log(event.target.value);
    this.x = event.target.value;
    this.forceUpdate();
  }

  get chart() {
    if(this.x === 'dau') return <PeerioPieChart />;
    else if(this.x === 'wau') return <PeerioPieChart2 />;
    else if(this.x === 'mau') return <PeerioPieChart3 />;
    else return null;
  }

  render() {
    return (
      <div className="App">
        <div  style={{paddingLeft: 530}}>
            <select onChange={this.onSelect}>
                  <option value="dau">Daily</option>
                  <option value="wau">Weekly</option>
                  <option value="mau">Monthly</option>
              </select>
          </div>
          {this.chart}
      </div>
    );
  }
}

export default App;
