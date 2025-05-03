import { useAuth } from "../store/auth";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn } = useAuth(); // custom useContext hook

  return (
    // header
    <header>
      <div className="container">
        <div>
          <NavLink to="/" className="logo-brand">
            <img
              src="./android-chrome-192x192.png"
              alt="My logo"
              width={30}
              height={25}
            />
            Web Dev
          </NavLink>
        </div>
        {/* Navigation link */}
        <nav>
          <ul>
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
            <NavLink to="/about">
              <li>About</li>
            </NavLink>
            <NavLink to="/service">
              <li>Service</li>
            </NavLink>
            <NavLink to="/contact">
              <li>Contact</li>
            </NavLink>
            {/* Ternary operator use to check if isLoggedIn true so show Logout link otherwise show Login and register link */}
            {isLoggedIn ? (
              <NavLink to="/logout">
                <li>logout</li>
              </NavLink>
            ) : (
              <>
                <NavLink to="/register">
                  <li>Register</li>
                </NavLink>
                <NavLink to="/login">
                  <li>Login</li>
                </NavLink>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
