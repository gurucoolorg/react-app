import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import {App} from './home/Home'
import {BrowserRouter as Router, Route } from 'react-router-dom';
import RouterComponent from './router/RouterComponent';

ReactDOM.render(
  <Router>
    < RouterComponent/>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// something
