import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { Spooktober } from './components/Spooktober';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './fonts/nosifer/NosiferCaps-Regular.ttf';
import './fonts/tango/TangoMacabre.ttf'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Spooktober />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
