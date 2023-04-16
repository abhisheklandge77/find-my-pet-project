import React, { useEffect, useState } from 'react';
import signupPageImg from '../../assets/cute-puppy.jpg';
import { FaUserAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { GoogleLogin } from 'react-google-login';
import './SignUpPage.css';
import { useNavigate } from 'react-router-dom';
import service from '../../services';
const clientId = "96874383155-t417cmiso17b47nsq59jqpsoi16pim9t.apps.googleusercontent.com";

function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailInvallid, setIsEmailInvallid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        name: userName,
        email,
        password
      };
      const response = await service.saveUser(formData);
      console.log("Response::=", response);
      if (response?._id) {
        const userData = {
          id: response._id,
          name: response.name
        };
        window.sessionStorage.setItem("userData", JSON.stringify(userData));
        navigate("/");
      }else if(response === "User Already Exist"){
        setErrorMsg("User Already Exist");
      }
    } catch (err) {
      console.log(err)
    }
  }

  // set every field value and validate fields
  const onFieldChange = (field, value) => {
    if (field === "userName") {
      setUserName(value);
    } else if (field === "email") {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!regex.test(value)) {
        setIsEmailInvallid(true);
      } else {
        setIsEmailInvallid(false);
      }
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    } else if (field === "confirmPassword") {
      setConfirmPassword(value);
    }
  }

  const checkAllFieldsValid = () => {
    if (!userName || !email || !password || !confirmPassword) {
      setErrorMsg("All fields are rquired");
      return false;
    } else if (password !== confirmPassword) {
      setErrorMsg("Password and Confirm Password are not matching");
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
      if(res.error){
        setErrorMsg("Google Sign In Failed !");
      }  
  };

  useEffect(() => {
    window.sessionStorage.removeItem("userData");
  }, []);

  return (
    <div className="signup-page-background">
      <div className="signup-page-container">
        <div className="signup-form">
          <h1>Sign Up</h1>
          <div className="input-field">
            <label htmlFor='userName' className="label"><FaUserAlt /></label>
            <input className="input" id="userName" placeholder="Name" value={userName} onChange={(e) => onFieldChange("userName", e.target.value)} />
          </div>
          <div className={isEmailInvallid ? "input-field invalid-field" : "input-field"}>
            <label htmlFor='email' className="label"><FaEnvelope /></label>
            <input id="email" className="input" placeholder="Email" value={email} onChange={(e) => onFieldChange("email", e.target.value)} />
          </div>

          <div className="input-field">
            <label htmlFor='password' className="label"><FaLock /></label>
            <input id="password" className="input" placeholder="Password" type="password" value={password} onChange={(e) => onFieldChange("password", e.target.value)} />
          </div>

          <div className="input-field">
            <label htmlFor='confirm-password' className="label"><FaLock /></label>
            <input id="confirm-password" className="input" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => onFieldChange("confirmPassword", e.target.value)} />
          </div>

          <button className="register-btn" onClick={() => saveUserData()}>Register</button>

          <GoogleLogin
            clientId={process.env.FIND_MY_PET_GOOGLE_CLIENT_ID || clientId}
            buttonText="Sign In with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
            className="google-signup-btn"
          />

          <a className="link" href="/login">Already have an account ?</a>

          {errorMsg && <div className="error-message">{errorMsg}</div>}

        </div>
        <div className="image-container">
          <img src={signupPageImg} alt="sign-up" />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
