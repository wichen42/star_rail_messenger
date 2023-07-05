import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '../context/ErrorContext';

const LoginForm = ({toggleForm}) => {
    const { handleError } = useContext(ErrorContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        try {
            await signInWithEmailAndPassword(auth, email, password)
            .then(console.log("Logging in..."));
            navigate("/");
        } catch (error) {
            handleError(error);
            console.error(error);
        };
    };

    return (
        <form>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button name='login'onClick={handleSubmit}>Login</button>
            <div>
                <p>Don't have an account? <span id='form-register' onClick={toggleForm}>Register</span></p>
                <span>or</span>
                <span id='demo-login'>Login as a Demo User</span>
            </div>
        </form>
    );
};

export default LoginForm