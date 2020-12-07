import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import Home from './components/pages/Home';
import Chat from './components/Chat/Chat/Chat';

function App() {
  return (
    <>
    <Router>
      
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/chat' component={Chat} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
