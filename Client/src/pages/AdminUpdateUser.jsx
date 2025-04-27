import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminUpdateUser = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const { AuthorizationBearerToken } = useAuth();
  const Params = useParams(); // id get from router
  // console.log("Params data Get id from path In Router", Params);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitUpdateForm = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/update/${Params.id}`,
        {
          method: "PATCH", //PATCH method use for update
          headers: {
            "Content-Type": "application/json", // if we pass JSON data for update , we also pass this line so backend can read Json data (Same like Post method)
            Authorization: AuthorizationBearerToken, //Authorized token pass
          },
          body: JSON.stringify(userData), // In body updated user data (which is object form) pass into JSON format on Backend
        }
      );

      if (res.ok) {
        toast.success("User Data Update Successfully");
      } else {
        toast.warning("User Data Not Update");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
        <form onSubmit={handleSubmitUpdateForm}>
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
