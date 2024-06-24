// App.js

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './containers/Dashboard'; // Import components for each page
import Medicines from './containers/Medicines';
import Orders from './containers/Orders';
import Profile from './containers/Profile';
import Settings from './containers/Settings';

function App() {
  return (
    <Router>
      <div className='grid-container'>
        <Header/>
        <Sidebar/>
        <main className='main'>
          <Route path="/" exact component={Dashboard} />
          <Route path="/medicines" component={Medicines} />
          <Route path="/orders" component={Orders} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={Settings} />
        </main>
      </div>
    </Router>
  );
}

export default App;
