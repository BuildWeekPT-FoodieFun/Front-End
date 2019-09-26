import React from 'react';
import UserCreate from './Components/UserCreate';
import Login from './Components/Login';
import Review from './Components/Review';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      	<Review />
        {/*<UserCreate />*/}
        {<Login />}
      </header>
    </div>
  );
}

export default App;
