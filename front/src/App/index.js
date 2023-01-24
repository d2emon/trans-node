import React from 'react';
import logo from '../assets/logo.svg';
import './index.css';
import Counter from '../components/Counter/Counter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
          href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          Learn React
          </a>
      </header>
    </div>
  );
}

export default App;
