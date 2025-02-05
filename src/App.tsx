import React, { useEffect, useState } from "react";
import { HashRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

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
                <Route path="/" element={<HomeRedirect isLoggedIn={isLoggedIn} />} />
                <Route path="/tasks" element={isLoggedIn ? <TaskList /> : <Navigate to="/" />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </Router>
    );
};

// Bu bileşen, yönlendirmeyi useEffect ile yapar ve sonsuz döngüyü engeller.
const HomeRedirect: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/tasks");
        }
    }, [isLoggedIn, navigate]);

    return <LoginForm />;
};

export default App;