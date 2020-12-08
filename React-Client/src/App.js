import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './components/pages/Home';
import Chat from './components/Chat/Chat/Chat';
import Leaderboard from './components/pages/Leaderboard';

function App() {
  return (
    <>
    <Router>
      
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/chat' component={Chat} />
        <Route path='/leaderboard' component={Leaderboard} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
