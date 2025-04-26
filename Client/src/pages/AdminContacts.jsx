import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const [contactData, setContactData] = useState([]); // Store Contact Data
  const { AuthorizationBearerToken } = useAuth(); // useContext custom hook get token

  const getAllContactData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: AuthorizationBearerToken,
        },
      });
      const data = await res.json(); // JSON data convert into Object form
      console.log("contact data", data);
      if (res.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete the Contact by Id
  const handleDeleteContactById = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: AuthorizationBearerToken,
          },
        }
      );

      const data = await res.json();
      console.log(`Contact delete: ${data}`);

      if (res.ok) {
        getAllContactData(); // for refresh the contact data
        toast.success("Contact data Deleted Successfully");
      } else {
        toast.warning("Contact data not delete ");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllContactData();
  }, []);

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin : User Contact Data In Database</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contactData?.map((curElem, index) => {
              const { _id, username, email, message } = curElem;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{message}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteContactById(_id)}
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

export default AdminContacts;
