import React, { useState } from "react";
import axios from "axios";

const Login = ({ getLoginToken, history }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // on change
  const fillFormData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  // submiting the data of the users
  const submitForm = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://route-egypt-api.herokuapp.com/signin",
      user
    );
    console.log(response);
    if (response.data.message === "success") {
      setUser({ email: "", password: "" });
      // take me to log in
      getLoginToken(response.data.token);
      // localStorage.setItem("userToken", response.data.token);
      history.push("/home");
    } else {
      // error
      setError(response.data.message);
    }
  };
  return (
    <div>
      <div className="container">
        <p className="text-center text-white">{error}</p>
        <h1 className="text-center mb-3">Login</h1>
        <div className="row">
          <form className="form-group w-50 m-auto">
            <input
              onChange={fillFormData}
              value={user.email}
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              name="email"
            />
            <input
              onChange={fillFormData}
              value={user.password}
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              name="password"
            />
            <button onClick={submitForm} className="btn btn-info w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
