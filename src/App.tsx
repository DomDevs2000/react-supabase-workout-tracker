import "./App.css";
import Login from "./components/Login";
import SuccessAuth from "./components/SuccessAuth";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./components/Register";
import CreateWorkout from "./components/CreateWorkout";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ViewWorkout from "./components/ViewWorkout";
import {AuthProvider} from "./context/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (

        <div className="App min-h-full font-Poppins box-border">
            <NavBar/>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Home/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/create"
                            element={
                                <ProtectedRoute>
                                    <CreateWorkout/>
                                </ProtectedRoute>
                            }
                        />
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/register"} element={<Register/>}/>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/auth"} element={<SuccessAuth/>}/>
                        <Route path={"/create"} element={<CreateWorkout/>}/>
                        <Route path={"/workout/:id"} element={<ViewWorkout/>}/>
                    </Routes>
                </AuthProvider>
            </Router>
        </div>

);
}

export default App;
