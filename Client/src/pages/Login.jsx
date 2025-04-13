import React from "react";

import { useState } from "react";

const Login = () => {
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserLog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userLog);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLog),
      });
      // console.log("after login response", response);
      if (response.ok) {
        setUserLog({ email: "", password: "" });
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <>
      <section className="section-hero">
        <div className="grid grid-two-cols">
          {/* Image */}
          <div className="hero-image">
            <img src="./image.jpg" alt="Register Now" width="400" />
          </div>
          {/* login form */}

          <form onSubmit={handleSubmit}>
            <div className="contact">
              <h1>Login Form</h1>
              <div>
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="Enter your email"
                  value={userLog.email}
                  onChange={handleChange}
                  id="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password">Password :</label>
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  placeholder="Enter your password"
                  value={userLog.password}
                  onChange={handleChange}
                  id="password"
                  required
                />
              </div>
              <div>
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
