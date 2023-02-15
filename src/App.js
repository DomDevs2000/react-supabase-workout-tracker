import './App.css';
import Login from './components/Login.jsx';
import SuccessAuth from './components/SuccessAuth';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./components/Register";
import CreateWorkout from "./components/CreateWorkout";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

function App() {

    return (
        <div className="App min-h-full font-Poppins box-border">
            <NavBar/>
            <Router>
                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/auth'} element={<SuccessAuth/>}/>
                    <Route path={'/create'} element={<CreateWorkout/>}/>
                </Routes>
            </Router>


        </div>
    );
}

export default App;
