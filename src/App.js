import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
              <Routes>
                  <Route path={'/'} />
                  <Route path={'/auth'}/>
              </Routes>
          </Router>
      </header>
    </div>
  );
}

export default App;
