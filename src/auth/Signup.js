import React, { useState } from "react";
import { API } from "./API.js";
import { Link } from "react-router-dom";
import "./style.css";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signup = async (user) => {
    return await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        console.log("resp", response);
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name: name, email: email, password: password })
      .then((data) => {
        console.log("data", data);
        if (data.error) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: data.error,
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("error in signup"));
  };

  const signUpForm = () => {
    return (
      <>
        <div className="center">
          {" "}
          <h2>Sign Up here</h2>
          {successMessage()}
          {errorMessage()}
          <form onSubmit={onSubmit}>
            <div className="txt_field">
              <input
                type="text"
                placeholder="name"
                onChange={handleChange("name")}
                value={name}
              />
            </div>

            <div className="txt_field">
              <input
                type="email"
                placeholder="email"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="txt_field">
              <input
                type="password"
                placeholder="password"
                onChange={handleChange("password")}
                value={password}
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
          <div className="signup_link">
            <Link to="/">
              <p>? already a user. Login here</p>
            </Link>
          </div>
        </div>
      </>
    );
  };
  const successMessage = () => {
    return (
      <div>
        <p>{success}</p>
        <div className="signup_link" style={{ display: success ? "" : "none" }}>
          <span style={{ color: "green" }}>
            {" "}
            New account created successfully
          </span>
          .<Link to="/">Login here</Link>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div style={{ color: "tomato" }}>
        <div style={{ display: error ? "" : "none" }}>Error: {error}</div>
      </div>
    );
  };

  return <>{signUpForm()}</>;
};

export default SignUp;
