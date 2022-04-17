import React, { useState } from 'react';
// import saveUser from '../../services'; // This is save user api for saving user info to database we will do it later
import loginPageImg from '../../assets/cute-puppy2.jpg';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { GoogleLogin } from 'react-google-login';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
const clientId = "770468930253-im9ha5fop8ak6d6m4nsn0lktikj52tr7.apps.googleusercontent.com";
console.log("clientId:::", clientId);

function LoginPage() {
  const [email, setEmail] = useState("");
  const [isEmailInvallid, setIsEmailInvallid] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // saving user data to database
  const saveUserData = () => {
    console.log("Clicked...");
    const allFieldsValid = checkAllFieldsValid(); // checking all fields are valid
    if (!allFieldsValid) {
      return;
    }
    const formData = {
      email,
      password
    }
    // const response = await saveUser(formData);
    console.log("Saved data successfully...", formData);
    navigate("/")
  }

  // set every field value and validate fields
  const onFieldChange = (field, value) => {
    if (field === "email") {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!regex.test(value)) {
        setIsEmailInvallid(true);
      } else {
        setIsEmailInvallid(false);
      }
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
  }

  const checkAllFieldsValid = () => {
    if (!email || !password) {
      setErrorMsg("All fields are rquired");
      return false;
    } else {
      setErrorMsg("");
      return true;
    }
  }
  // Google sign in work is not done yet we will do it later
  // Google sign in on success
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
  };

  // Google sign in on failure
  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <div className="login-page-background">
      <div className="login-page-container">
        <div className="login-form">
          <h1>Log In</h1>
          <div className={isEmailInvallid ? "input-field invalid-field" : "input-field"}>
            <label htmlFor='email' className="label"><FaUserAlt /></label>
            <input id="email" className="input" placeholder="Email" value={email} onChange={(e) => onFieldChange("email", e.target.value)} />
          </div>

          <div className="input-field">
            <label htmlFor='password' className="label"><FaLock /></label>
            <input id="password" className="input" placeholder="Password" type="password" value={password} onChange={(e) => onFieldChange("password", e.target.value)} />
          </div>

          <button className="register-btn" onClick={() => saveUserData()}>Log In</button>

          <GoogleLogin
            clientId={clientId}
            buttonText="Sign In with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            className="google-login-btn"
          />

          <a className="link" href="/register">Don't have an account ?</a>

          {errorMsg && <div className="error-message">{errorMsg}</div>}

        </div>
        <div className="image-container">
          <img src={loginPageImg} alt="login" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
