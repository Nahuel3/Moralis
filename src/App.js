import React from 'react';
import './App.css';
import { useMoralis } from "react-moralis";
import Transfer from "./Transfer"

function App() {

  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    const login =  () => {
     
      if (!isAuthenticated) {

         authenticate({signingMessage: "Log in " })
          .then(function (user) {
            console.log("logged in user:", user);
            console.log(user?.get("ethAddress"));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }

    const logOut = async () => {
      await logout();
      console.log("logged out");
    }

  return (
    <div>
      <h1>Mundo</h1>
      <button onClick={login}> Metamask Login</button>
      <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
      <Transfer></Transfer>
    </div>
  );
}

export default App;