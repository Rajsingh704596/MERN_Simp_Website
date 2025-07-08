import { useAuth } from "../store/auth";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn } = useAuth(); // custom useContext hook

  return (
    // header
    <header aria-label="header">
      <div className="container">
        <NavLink to="/" className="logo-brand">
          <img
            src="./android-chrome-192x192.png"
            alt="My logo"
            aria-label="logo"
            width={30}
            height={25}
          />
          <h5>Web Dev</h5>
        </NavLink>

        {/* Navigation link */}
        <nav aria-label="Main Navigation">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/service">Service</NavLink>
            </li>

            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {/* Ternary operator use to check if isLoggedIn true so show Logout link otherwise show Login and register link */}
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout">logout</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
