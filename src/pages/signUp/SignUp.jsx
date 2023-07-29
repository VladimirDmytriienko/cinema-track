import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../../context/AuthContext";
import "./signUp.css"
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {  user,  signUp } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/cinema-track')
    } catch (error) {
      if (error =="FirebaseError: Firebase: Error (auth/email-already-in-use).") {
        alert ( "email-already-in-use")
      } else {
        alert(error);
      }
      // console.log(error);
    }
  };
  return (
    <div className="form">
      <div className="signup">
        <h2 className='text-3xl font-bold'>Sign Up</h2>
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
          <button className="signup__button">Sign Up</button>
          <div className="signup__options">
            <p>
              <input className="signup__checkbox" type="checkbox" />
              Remember me
            </p>
            {/* <p>Need Help?</p> */}
          </div>
          <p className="signup__login">
            <span className="signup__login-text">
              Already subscribed to Netflix?
            </span>{" "}
            <Link to="/cinema-track/login" className="signup__login-link">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>

  )
}

export default SignUp