import React, { useContext, useState } from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {

  const [err, setErr] = useState();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (currentUser) navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    }catch(error) {
      setErr(true);
      console.log(`Error with login: ${error}`);
    }


  }

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
                {err && <span>Something went wrong with login...</span>}
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
      </div>
    </div>
    
  )
}

export default Login;