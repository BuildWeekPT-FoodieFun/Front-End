import React from 'react';
import UserCreate from './Components/UserCreate';
import Login from './Components/Login';
import Review from './Components/Review';

import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      	<Route path='/Review' component={Review} />

        <Route path='/UserCreate' component={UserCreate} />

        <Route path='/Login' component={Login} />
      </header>
    </div>
  );
}

export default App;
