import { useState, SyntheticEvent } from "react";
import './login.css';
import { useContext } from "../Context";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user, setUser} = useContext();
  const navigate = useNavigate();

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(email)){
      alert("Invalid email address");
      return;
    }
    if(password.length<6){
      alert("empty password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    // Signed up
    setUser({email, password})
    navigate('/')
    // ...
  })
  .catch((error) => {
    console.log(error);
    alert("wrong credentials!")
  })
  console.log(user);
  }


  return (
    <main>
      <div className="container-l">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title">Login Form</span>

            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={handleClick}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    </main>
  )
}

export default Login