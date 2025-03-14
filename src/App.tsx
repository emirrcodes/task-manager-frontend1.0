import React, { useState, useEffect } from "react";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const checkAuth = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };
    
        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    console.log("Rendering App, isLoggedIn:", isLoggedIn);

    return (
        <Router>
            <div>
                {isLoggedIn && (
                    <button onClick={handleLogout} style={{ margin: "10px", color: "red" }}>
                        Log Out
                    </button>
                )}
            </div>
            <Routes>
            <Route path="/" element={isLoggedIn ? <TaskList /> : <LoginForm />} />
            <Route path="/tasks" element={isLoggedIn ? <TaskList /> : <Navigate to="/" />} />
            <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </Router>
    );
};

export default App;