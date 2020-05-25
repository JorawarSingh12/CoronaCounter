import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Details from './components/Details';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/country/:countryname" component={Details}></Route>
      </Switch>
      </BrowserRouter>
     
 
    </div>
  );
}

export default App;
