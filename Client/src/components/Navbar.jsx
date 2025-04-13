import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/"> My Logo</NavLink>
        </div>
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
          <NavLink to="/login">
            <li>Login</li>
          </NavLink>
          <NavLink to="/register">
            <li>Register</li>
          </NavLink>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
