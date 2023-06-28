import React, { useContext } from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { ErrorContext } from '../context/ErrorContext';

const Login = () => {

  const navigate = useNavigate();
  const { handleError } = useContext(ErrorContext);

  const handleLogin = async (email, password) => {
    try{
      await signInWithEmailAndPassword(auth, email, password)
      .then(console.log("Logging in..."));
      navigate("/");
    }catch(error) {
      handleError(error);
      console.error(`Error with login: ${error}`);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (e.target.name === 'login') {
      const email = e.target[0].value;
      const password = e.target[1].value;
      handleLogin(email, password);
    } else if (e.target.name === 'demo-login') {
      const demoEmail = process.env.REACT_APP_DEMO_EMAIL;
      const demoPassword = process.env.REACT_APP_DEMO_PASSWORD;
      handleLogin(demoEmail, demoPassword);
    };
  };

  return (
    <div className="app-container glass">
      <div className="form-container">
        <div className="form-wrapper">
            <div className="form-header">
                <span className="logo">Star Rail Messenger</span>
                <span className="title">Login</span>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password" />
                <button name='login'>Login</button>
                <button name='demo-login' onClick={handleSubmit}>Login as Demo User</button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
      </div>
    </div>
    
  )
}

export default Login;