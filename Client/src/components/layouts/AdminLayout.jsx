import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { FcContacts } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {
  //^ for secure admin home route here we get user data using useContext custom hook , so if user isAdmin=true then show route otherwise don't show navigate home page
  const { user, isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log("user data in admin layout", user); //? for the first it show null value , after that we get user value , so that why we use isLoading state in context store , so when value not get loading will true after value get loading will false , then next line execute otherwise show loading...

  // First check if user is logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!user?.isAdmin) {
    // if isAdmin is false in user(object) data
    return <Navigate to="/" />; // redirect to home page
  }
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
