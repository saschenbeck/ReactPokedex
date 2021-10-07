import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Dashboard from './Components/Layout/Dashboard';
import NavBar from "./Components/Layout/NavBar";
function App() {
  return (
    <div className="App">
          <NavBar />
          <div className="container">
              <Dashboard />
          </div>
    </div>
  );
}

export default App;
