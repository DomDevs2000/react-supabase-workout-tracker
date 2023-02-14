import './App.css';
import NavBar from "./components/Navbar";
import Login from './components/Login.jsx';
import SuccessAuth from './components/SuccessAuth';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./components/Register";

function App() {

    return (
        <div className="App">
            <NavBar/>
                <Router>
                    <Routes>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/register'} element={<Register/>}/>
                        <Route path={'/'} />
                        <Route path={'/auth'} element={<SuccessAuth/>}/>
                    </Routes>
                </Router>


        </div>
    );
}

export default App;
