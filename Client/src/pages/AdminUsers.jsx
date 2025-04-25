import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const AdminUsers = () => {
  const [userData, setUserData] = useState();

  const { AuthorizationBearerToken } = useAuth(); //UseContext custom hook , get jwt token which we pass with get req.

  const getAllUserData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: AuthorizationBearerToken,
        },
      });
      const data = await res.json();
      console.log("all user data", data);
      setUserData(data);
    } catch (error) {
      console.log("User data not get", error);
    }
  };

  // Delete the user by Id on Delete button
  const handleDeleteUserById = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: AuthorizationBearerToken,
          },
        }
      );

      const data = await res.json();
      console.log(`Users after delete: ${data}`);

      if (res.ok) {
        getAllUserData(); // for refresh the user data
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>All User Data From DataBase</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((curElem, index) => {
              const { _id, username, email, phone } = curElem;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>
                    Edit <FaRegEdit />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUserById(_id)}
                      className="del"
                    >
                      Delete
                      <MdDeleteForever className="del-icon" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminUsers;
