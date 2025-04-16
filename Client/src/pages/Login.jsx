import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // fun get from useContext custom hook
  const { storeJWTinLS } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserLog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userLog);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLog), // JavaScript Obj. to JSON string convert and send data to backend
      });
      // console.log("after login response", response);
      if (response.ok) {
        const res_data = await response.json(); // response convert into JSON obj form
        console.log(
          "response from server changed in json formate so we get data(token)",
          res_data
        );

        // now we can store the token in local storage or session storage or cookies , here we store in Local storage
        storeJWTinLS(res_data.token); //fun call and pass Json web token

        alert("login successful");
        setUserLog({ email: "", password: "" });

        navigate("/");
      } else {
        console.log("invalid credential");
        alert("invalid credential");
      }
    } catch (error) {
      console.log("Login error", error);
      alert("Login error");
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
