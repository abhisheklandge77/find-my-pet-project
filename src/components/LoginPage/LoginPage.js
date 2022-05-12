import React, { useEffect, useState } from 'react';
import loginPageImg from '../../assets/cute-puppy2.jpg';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { GoogleLogin } from 'react-google-login';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import service from '../../services';
const clientId = "96874383155-t417cmiso17b47nsq59jqpsoi16pim9t.apps.googleusercontent.com";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [isEmailInvallid, setIsEmailInvallid] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // saving user data to database
  const saveUserData = async () => {
    const allFieldsValid = checkAllFieldsValid(); // checking all fields are valid
    if (!allFieldsValid) {
      return;
    }
    try {
      const formData = {
        email,
        password
      };
      const response = await service.loginUser(formData);
      console.log("Response::=", response);
      if (response?._id) {
        const userData = {
          id: response._id,
          name: response.name
        };
        window.sessionStorage.setItem("userData", JSON.stringify(userData));
        navigate("/");
      } else if (response === "Invalid Credentials") {
        setErrorMsg("Incorrect Email or Password !");
      } else if (response === "User does not exist") {
        setErrorMsg("User does not exist !");
      }
    } catch (err) {
      console.log(err)
    }
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
  // Google sign in on success
  const onSuccess = async (res) => {
    const { name, email } = res.profileObj;
    try {
      const formData = {
        name,
        email,
        fromGoogle: true
      };
      const response = await service.saveUserFromGoogle(formData);
      if (response?._id) {
        const userData = {
          id: response._id,
          name: response.name
        };
        window.sessionStorage.setItem("userData", JSON.stringify(userData));
        navigate("/");
      }
    } catch (err) {
      console.log(err)
    }
  };

  // Google sign in on failure
  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    if (res.error) {
      setErrorMsg("Google Sign In Failed !");
    }
  };

  useEffect(() => {
    window.sessionStorage.removeItem("userData");
  }, []);

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
            isSignedIn={false}
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
