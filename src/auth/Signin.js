import React, { useState } from "react";
import { API } from "./API.js";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style.css";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: false,
    didRedirect: false,
  });

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const signin = async (user) => {
      return await fetch(`${API}/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => console.log(err));
    };

    const authenticate = (data, next) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        if (data.token) {
          setState({
            ...state,
            didRedirect: true,
          });
        }
      }
    };

    signin({
      email: state.email,
      password: state.password,
    })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setState({ ...state, error: data.error });
        }
        console.log(state.didRedirect);
        authenticate(data);
      })
      .catch(console.log("sign in failed"));
  };

  const signinform = () => {
    return (
      <>
        <div className="center">
          <h1>Login Here </h1>
          {errorMessage()}

          <form onSubmit={handleSubmit}>
            <div className="txt_field">
              <input
                type="text"
                placeholder="email"
                name="email"
                value={state.email}
                onChange={handleChange("email")}
                required
              />
            </div>
            <div className="txt_field">
              <input
                type="password"
                placeholder="password"
                name="password"
                value={state.password}
                onChange={handleChange("password")}
                required
              />
            </div>

            <input type="submit" value="Login" />
          </form>
          <div className="signup_link">
            <Link to="/signup">
              <p> new user ? SignUp here</p>
            </Link>
          </div>
        </div>
      </>
    );
  };

  const performRedirect = () => {
    console.log(state.didRedirect);

    return state.didRedirect ? <Redirect to="/dashboard" /> : null;
  };

  const errorMessage = () => {
    return state.error ? (
      <div style={{ color: "tomato", marginLeft: "2.5em" }}>{state.error}</div>
    ) : (
      ""
    );
  };

  return (
    <div>
      {signinform()}
      {performRedirect()}
    </div>
  );
};

export default Login;
