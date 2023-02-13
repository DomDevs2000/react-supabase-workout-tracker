import './App.css';
import NavBar from "./components/Navbar";
import AuthUser from './components/AuthUser';
import SuccessAuth from './components/SuccessAuth';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {

    return (
        <div className="App">
            <NavBar/>
            <div className="App-header">

                <Router>
                    <Routes>
                        <Route path={'/login'} element={<AuthUser/>}/>
                        <Route path={'/auth'} element={<SuccessAuth/>}/>
                    </Routes>
                </Router>
            </div>


        </div>
    );
}

export default App;
