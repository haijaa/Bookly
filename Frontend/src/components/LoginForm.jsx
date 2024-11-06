import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container p-3 my-5 d-flex flex-column w-25">
      <ul className="nav nav-pills mb-3 d-flex flex-row justify-content-between">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "login" ? "active" : ""}`}
            onClick={() => handleTabClick("login")}
          >
            Login
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "register" ? "active" : ""}`}
            onClick={() => handleTabClick("register")}
          >
            Register
          </button>
        </li>
      </ul>

      {activeTab === "login" && (
        <div className="tab-content">
          <div className="text-center mb-3">
            <p>or:</p>
          </div>

          <input
            className="form-control mb-4"
            type="email"
            placeholder="Email address"
          />
          <input
            className="form-control mb-4"
            type="password"
            placeholder="Password"
          />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe"> Remember me</label>
            </div>
            <a href="#!">Forgot password?</a>
          </div>

          <button className="btn btn-primary mb-4 w-100">Sign in</button>
          <p className="text-center">
            Not a member?{" "}
            <a href="#!" onClick={() => handleTabClick("register")}>
              Register
            </a>
          </p>
        </div>
      )}

      {activeTab === "register" && (
        <div className="tab-content">
          <div className="text-center mb-3">
            <p>or:</p>
          </div>

          <input className="form-control mb-4" type="text" placeholder="Name" />
          <input
            className="form-control mb-4"
            type="text"
            placeholder="Username"
          />
          <input
            className="form-control mb-4"
            type="email"
            placeholder="Email"
          />
          <input
            className="form-control mb-4"
            type="password"
            placeholder="Password"
          />

          <div className="d-flex justify-content-center mb-4">
            <input type="checkbox" id="agreeTerms" />
            <label htmlFor="agreeTerms">
              {" "}
              I have read and agree to the terms
            </label>
          </div>

          <button className="btn btn-primary mb-4 w-100">Sign up</button>
        </div>
      )}
    </div>
  );
}

export default Login;
