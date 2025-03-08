import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Password } from 'primereact/password';
        

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://task-manager-backend1-0.onrender.com/auth/login', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.access_token);
            alert('Giriş başarili!');
            window.location.href = "/tasks";
        }catch(err){
            setError('Giriş başarisiz, lütfen girdiğiniz değerleri tekrar kontrol ediniz !!!!!!');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div style={{margin: "auto",
            width: "50%",
            border: "3px solid green",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "30vh",}}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            >
                <h4 style={{color : "red"}}>IMPORTANT WARNING: My free trial in online Database service has expired. So
                the features are not reachable now :/ Maybe I will use another free database service before someone see this :) 

                </h4>
            <h2>Log In</h2>
            <input type="text" 
                   placeholder="Username"
                   value={username} 
                   onChange = {(e) => setUsername(e.target.value)}
            />
            <Password
                   type="text" 
                   placeholder="Password"
                   value={password}
                   onChange = {(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                   feedback={false} 
                   tabIndex={1} />
            <button onClick={handleLogin}>Log In</button>
            {error && <p style={{color: 'red'}}> {error} </p> }
            <p>Don't have an account, no problem</p>
            <button onClick={() => navigate('/register')} style={{marginLeft: '10px'}} >
                Sign Up
            </button>
        </div>
    );
 };

export default LoginForm;