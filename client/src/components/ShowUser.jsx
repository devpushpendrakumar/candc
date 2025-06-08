import React from "react";
import { useState } from "react";
import { deleteUser, updateUser } from "../services/userServices.js";

function ShowUser({ users, onDelete }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setEdit(true);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      console.log(`Delete user with ID: ${userId}`);
      onDelete((pre) => pre + 1);
    } catch (err) {
      console.error(`Error deleting user with ID ${userId}:`, err);
    }
  };

  const handleSave = async (user) => {
    try {
      const updatedUser = {
        name: name,
        email: email,
        phone: phone,
      };
      await updateUser(user.id, updatedUser);
      console.log("User updated successfully");
      setEdit(false);
      setName("");
      setEmail("");
      setPhone("");
      onDelete((pre) => pre + 1);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div>
      <div>User Details</div>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          {users.map((user, index) => {
            return (
              <tbody key={user.id}>
                <tr>
                  <td>
                    {!edit ? (
                      user.name
                    ) : (
                      <input
                        id="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {!edit ? (
                      user.email
                    ) : (
                      <input
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {!edit ? (
                      user.phone
                    ) : (
                      <input
                        id="phone"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {!edit && (
                      <button onClick={() => handleEdit(user)}>Edit</button>
                    )}
                    {!edit && (
                      <button onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    )}
                    {edit && (
                      <button onClick={() => handleSave(user)}>Save</button>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
}

export default ShowUser;
