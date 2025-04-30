import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [userReg, setUserReg] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const { storeJWTinLS, API } = useAuth(); // fun get from useContext custom hook

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserReg((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userReg);

    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // it define post data is json format
        },
        body: JSON.stringify(userReg), // state data pass in JSON.stringify format in body
      });
      // console.log(
      //   "after registration API hit, get response from server",
      //   response
      // );

      const res_data = await response.json();
      console.log("after json object change response from server", res_data);
      if (response.ok) {
        // stored the token in localhost
        // stored the token in localhost
        storeJWTinLS(res_data.token); // fun call and json web token pass (for store in local storage)
        setUserReg({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successfully");
        // navigate("/login");
        navigate("/"); // after register direct show home page
      } else {
        //alert(res_data.extraDetails ? res_data.extraDetails : res_data.message); //form validation error show in UI which we get from backend zod validation response
        toast.warning(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        ); //form validation error show in UI which we get from backend zod validation response
      }
    } catch (error) {
      console.log("registration error", error);
      toast.error("registration error", error);
    }
  };

  return (
    <>
      <section className="section-hero">
        <div className="grid grid-two-cols">
          {/* Image */}
          <div className="hero-image">
            <picture>
              {/* WebP format (modern browsers) */}
              <source
                srcSet="/Register.webp"
                type="image/webp"
                width="400"
                height="400"
              />
              {/* Fallback JPEG format (older browsers) */}
              <source
                srcSet="/Register.jpg"
                type="image/jpeg"
                width="400"
                height="400"
              />
              {/* Default Contact image with alt text and dimensions */}
              <img
                src="/Register.jpg"
                alt="Developer Image"
                width="400"
                height="400"
                loading="lazy" // Lazy loading for better performance
                decoding="async" // Async decoding for better rendering
              />
            </picture>
          </div>
          {/* Registration form */}

          <form onSubmit={handleSubmit}>
            <div className="contact">
              <h1>Registration Form</h1>
              <div>
                <label htmlFor="name">Name :</label>
                <input
                  type="text"
                  autoComplete="off"
                  name="username"
                  value={userReg.username}
                  onChange={handleChange}
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  value={userReg.email}
                  onChange={handleChange}
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="number">Phone No. :</label>
                <input
                  type="number"
                  autoComplete="off"
                  name="phone"
                  value={userReg.phone}
                  onChange={handleChange}
                  id="number"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password :</label>
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  value={userReg.password}
                  onChange={handleChange}
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div>
                <button type="submit">Register</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
