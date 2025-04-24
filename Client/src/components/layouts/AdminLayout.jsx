import { NavLink, Outlet } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { FcContacts } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";

const AdminLayout = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <li>
              <NavLink to="/admin/users">
                <FaUsers />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/contacts">
                <FcContacts />
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin">
                <FcHome />
                Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </header>
  );
};

export default AdminLayout;
