import React from 'react';
// import { Button } from 'antd';
import './App.css';
import MainLayout from './page/layout/main'
import Login from './page/login/index';
import {Route, Switch  } from 'react-router-dom';

// const App = () => (
//   <div className="App">
//     <MainLayout></MainLayout>
//   </div>
// );
const App = () => (
  <div className="App">
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/" component={MainLayout}/>
    </Switch>
  </div>
);

export default App;