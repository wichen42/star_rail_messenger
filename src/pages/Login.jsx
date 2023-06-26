import React, { useState } from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [err, setErr] = useState();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try{
      await signInWithEmailAndPassword(auth, email, password)
      .then(console.log("Logging in..."));
      navigate("/");
    }catch(error) {
      setErr(true);
      console.log(`Error with login: ${error}`);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    handleLogin(email, password);
  };

  const handleDemoLogin = () => {
    const demoEmail = process.env.REACT_APP_DEMO_EMAIL;
    const demoPassword = process.env.REACT_APP_DEMO_PASSWORD;
    handleLogin(demoEmail, demoPassword);
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
                <button>Login</button>
                <button onClick={handleDemoLogin}>Login as Demo User</button>
                {err && <span>Something went wrong with login...</span>}
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
      </div>
    </div>
    
  )
}

export default Login;