import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

import "./signUp/SignUp"
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await logIn(email, password)
      navigate('/cinema-track/account')
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
  };
  return (
    <div className="form">
    <div className="signup">
      <h2 className='text-3xl font-bold'>Sign In</h2>
      {error ? <p >{error}</p> : null}
      <form onSubmit={handleSubmit} className="signup__form">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="signup__input"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="signup__input"
        />
        <button className="signup__button">Sign</button>
        <div className="signup__options">
          <p>
            <input className="signup__checkbox" type="checkbox" />
            Remember me
          </p>
          <p>Need Help?</p>
        </div>
        <p className="signup__login">
          <span className="signup__login-text">
              New to Netflix?
          </span>{" "}
          <Link to="signup" className="signup__login-link">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  </div>
  )
}

export default Login