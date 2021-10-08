import React from 'react';
// import { Button } from 'antd';
import './App.css';
import MainLayout from './page/layout/fileMain'
import Login from './page/login/index';
import { Route, Switch } from 'react-router-dom';

// const App = () => (
//   <div className="App">
//     <MainLayout></MainLayout>
//   </div>
// );
const App = () => (
  <div className="App">
    <Switch>
      <Route key={1} path="/login" component={Login} />
      <Route key={2} path="/" component={MainLayout} />
    </Switch>
  </div>
);

export default App;