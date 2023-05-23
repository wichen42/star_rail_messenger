import React from 'react'

const Login = () => {
  return (
    <div className="form-container">
        <div className="form-wrapper">
            <div className="form-header">
                <span className="logo">Star Rail Messenger</span>
                <span className="title">Login</span>
            </div>
            <form>
                <input type="text" placeholder="Display Name"/>
                <input type="email" placeholder="Email"/>
                <button>Login</button>
                <p>Don't have an account? Register</p>
            </form>
        </div>
    </div>
  )
}

export default Login;