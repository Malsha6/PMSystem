import React from "react";
import loginImage from "../../assets/images/login-image.png";
import "./Login.scss";

const Login = (props) => {
  return (
    <div className="user-login-form">
      <div className="d-flex">
        <div className="col-7">
          <img src={loginImage} alt="doctor-patient" />
        </div>
        <div className="col-5 mt-5 user-login-form-border">
          <form className="col user-login-form-content">
            <p className="mt-5 mb-2 user-login-form-welcome-message">
              Hello! welcome back
            </p>
            <p className="mb-5  user-login-form-instruction-message">
              Login with your data that you entered during your registration
            </p>
            <input
              type="text"
              class="p-3 mb-4 user-login-form-label"
              placeholder="First name"
            />
            <input
              type="text"
              class="p-3 mb-5 user-login-form-label"
              placeholder="Last name"
            />
          </form>
          <div className="user-login-form-button-container">
            <button className="btn btn-primary user-login-form-button">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
