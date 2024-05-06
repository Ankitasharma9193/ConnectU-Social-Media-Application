import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const username = useRef();
   const email = useRef();
   const password = useRef();
   const passwordAgain = useRef();
   const navigate = useNavigate();
   
   const handleOnSubmit = async (e) => {
     e.preventDefault();
     if (passwordAgain.current.value !== password.current.value) {
        passwordAgain.current.setCustomValidity("Passwords don't match!");
      } else {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        try {
          await axios.post("/auth/register", user);
          navigate("/login");
        } catch (err) {
          console.log(err);
        }
      }
    }

    return (
        <div className="register">
            <div className="registerContainer">
                <form className="registerForm" onSubmit={handleOnSubmit}>
                    <input placeholder="Username" 
                        className="loginInput"
                        required
                        ref={username}
                    />
                    <input placeholder="Email"
                        className="loginInput"
                        type="Email"
                        required
                        ref={email}
                    />
                    <input placeholder="Password"
                        className="loginInput"
                        ref={password}
                        required
                        type="password"
                        minLength="6"
                    />
                    <input placeholder="Password Again"
                        className="loginInput"
                        ref={passwordAgain}
                        required
                        type="password"
                        minLength="6" 
                    />
                    <button className="signUpButton">Sign Up</button>
                    <button className="loginRegisterButton">
                        Log into Account
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register;