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
        <UserManager onLogout={() => setLoggedInUser(null)} />
      )}
    </div>
  );
}

export default App;
