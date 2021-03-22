import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';
import MyCred from './components/MyCred';

const App = () => 
<Router>
<Fragment>
  <Route exact path = '/' component = {Landing}/>
  <section className = "container">
  <Switch>
  <Route exact path = '/login' component = {Login}/>
  <Route exact path = '/register' component = {Register}/>
  <Route exact path = '/mycred' component = {MyCred}/>
  </Switch>
  </section>
</Fragment>
</Router>
export default App;
