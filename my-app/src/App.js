import React, { Component, Image } from 'react';
import logo from './logo.svg';
import PeerioPieChart from './pie';
import './App.css';
import img from './hackahunt_template.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PeerioPieChart />
      </div>
    );
  }
}

export default App;
