import React, { useState } from 'react';
import LoginForm from './LoginForm';
import UserManager from './UserManager';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div className="App">
      {!loggedInUser ? (
        <LoginForm onLogin={setLoggedInUser} />
      ) : (
        <UserManager />
      )}
    </div>
  );
}

export default App;
