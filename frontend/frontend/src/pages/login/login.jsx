import "./login.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";

const Login = () => {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleOnSubmit = (e) => {
      e.preventDefault();
      loginCall({
        email: email.current.value, 
        password: password.current.value}, 
        dispatch
      );
    }
    console.log('~~~~~~~~~~~~~~`USER:',user)
    return (
     <div className="login">
      <div className="loginContainer">
        <div className="loginRight">
          <form className="loginForm" onSubmit={handleOnSubmit}>
            <input 
              placeholder="Email" 
              type="email" 
              className="loginInput" 
              required
              ref = {email}
            />
            <input 
              placeholder="Password" 
              type="password" 
              required
              className="loginInput" 
              minLength="6"
              ref = {password}
            />
            <button className="loginButton"
              type="submit"
              disabled={isFetching}>
              
                  "Log In"
                
              </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              
                  "Create a New Account"
                
            </button>
          </form>
       </div>
      </div>
     </div>
    )
}

export default Login;