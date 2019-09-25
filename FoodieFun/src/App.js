import React from 'react';
import UserCreate from './Components/UserCreate';
import Login from './Components/Login';


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <UserCreate />
          <Login />
      </header>
    </div>
  );
}

export default App;
