import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DownshiftOne from './components/DownshiftOne'; // import the component
import DownshiftAxios from './components/DownshiftAxios';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" style={{ width: 100, height: 100}}/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* <DownshiftOne />  */}
        <DownshiftAxios></DownshiftAxios>
      </div>
    );
  }
}
export default App;