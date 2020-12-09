import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserContext from './context/UserContext'
import Login from './components/Auth/Login';
import Register from "./components/Auth/Register";
import Navbar from './components/NavBar/NavBar';
import Home from './components/pages/Home';
import Chat from './components/Chat/Chat/Chat';
import Leaderboard from './components/pages/Leaderboard';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null) { // If the user is logging in for the first time, there wont be a token present in the local storage yet
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post("http://localhost:5000/users/tokenIsValid", null, 
                                        {headers : {"x-auth-token" : token}});
      if(tokenRes.data){
        const userRes = await Axios.get("http://localhost:5000/users/", {headers : {"x-auth-token" : token}});
        setUserData({token, user : userRes.data});
      }
    }
  }, []);

  return (
    <>
    <Router>
      <UserContext.Provider value={{userData, setUserData}}>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/chat' component={Chat} />
          <Route path='/leaderboard' component={Leaderboard} />
        </Switch>
      </UserContext.Provider>  
    </Router>
    </>
  );
}

export default App;
