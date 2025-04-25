import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";

const AdminUpdateUser = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const { AuthorizationBearerToken } = useAuth();
  const Params = useParams(); // id get from router
  // console.log("Params data Get id from path In Router", Params);

  const handleInputChange = () => {};

  const getSingleUserData = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${Params.id}`,
        {
          method: "Get",
          headers: {
            Authorization: AuthorizationBearerToken,
          },
        }
      );

      const data = await res.json();
      console.log(`Single User Data: ${data}`);

      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  return (
    <>
      <section className="section-hero">
        {/* Registration form */}
        <form>
          <div className="contact">
            <h1>Update User Data </h1>

            <div>
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                autoComplete="off"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                id="name"
                placeholder="Enter updated name"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                autoComplete="off"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                id="email"
                placeholder="Enter updated email"
                required
              />
            </div>

            <div>
              <label htmlFor="phone">Phone :</label>
              <input
                type="phone"
                autoComplete="off"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                id="phone"
                placeholder="Enter updated phone number"
                required
              />
            </div>

            <div>
              <button type="submit">Update</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AdminUpdateUser;
