import React, {useEffect, useState} from "react";
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import TaskList from "./components/TaskList";
import handleDeleteUser from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <Router>
            <div>
                {isLoggedIn && (
                    <button onClick={handleLogout} style = {{margin : "10px", color: "red"}}>
                        Log Out
                    </button>
                )}
            </div>
            <Routes>
                <Route 
                path="/"
                element={isLoggedIn ? <Navigate to="/tasks" /> : <LoginForm />}
                />
                <Route 
                path="/tasks"
                element={isLoggedIn ? <TaskList /> : <Navigate to="/" />}
                />

                <Route 
                    path="/register" 
                    element={<RegisterForm />} // `/register` rotası eklendi.
                />
            </Routes>
        </Router>
    );
};

export default App;
