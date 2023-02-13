import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AuthUser from './components/AuthUser';
import SuccessAuth from './components/SuccessAuth';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <Routes>
                        <Route path={'/'} element={<AuthUser/>}/>
                        <Route path={'/auth'} element={<SuccessAuth/>}/>
                    </Routes>
                </Router>
            </header>
        </div>
    );
}

export default App;
