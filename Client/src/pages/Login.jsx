import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify"; // toast work like alert
import Seo from "../components/Seo/Seo";

const Login = () => {
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // fun get from useContext custom hook
  const { storeJWTinLS, API } = useAuth();

  const URL = `${API}/api/auth/login`;

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
      const res_data = await response.json(); // response convert json into obj form

      if (response.ok) {
        console.log(
          "response from server changed in json formate so we get data(token)",
          res_data
        );

        // now we can store the token in local storage or session storage or cookies , here we store in Local storage
        storeJWTinLS(res_data.token); //fun call and pass Json web token

        // alert("login successful");
        toast.success("login successful");
        setUserLog({ email: "", password: "" });

        // console.log("after login get res jwt token", res_data.token);

        // Check admin status from token
        // Split jwt token into 3 parts (Header.Payload.Signature)
        const tokenParts = res_data.token.split("."); // Example: "aaa.bbb.ccc" -> ["aaa", "bbb", "ccc"]
        const payload = JSON.parse(atob(tokenParts[1])); // Decode the second part (Payload)  // JSON string ko object m bdla (Base64 ko normal text m convert using atob)

        if (payload.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        console.log("invalid credential");
        // alert(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        toast.warning(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("Login error", error);
      toast.error("Login Failed", error.message);
    }
  };

  return (
    <>
      <Seo title="LogIn page | MERN React19 Site" description="Login Form" />

      <section className="section-hero form" aria-label="login form">
        <div className="grid grid-two-cols">
          {/* Image */}
          <div className="hero-image">
            <picture>
              {/* WebP format (modern browsers) */}
              <source
                srcSet="/Login.webp"
                type="image/webp"
                width="400"
                height="400"
              />
              {/* Fallback JPEG format (older browsers) */}
              <source
                srcSet="/Login.jpg"
                type="image/jpeg"
                width="400"
                height="400"
              />
              {/* Default Contact image with alt text and dimensions */}
              <img
                src="/Login.jpg"
                alt="Developer Image"
                width="400"
                height="400"
                loading="lazy" // Lazy loading for better performance
                decoding="async" // Async decoding for better rendering
              />
            </picture>
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
