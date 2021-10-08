import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './Components/Layout/Dashboard';
import NavBar from "./Components/Layout/NavBar";

import Pokemon from './components/Pokemon/Pokemon';

function App() {
    return (
    <Router>
        <div className="App">
          <NavBar />
            <div className="container">
                <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/pokemon/:pokemonIndex" component={Pokemon}/>
                </Switch>
          </div>
        </div>
     </Router>
  );
}

export default App;
