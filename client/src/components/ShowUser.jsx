import React from "react";
import { deleteUser } from "../services/userServices.js";

function ShowUser({ users, onDelete }) {
  const handleEdit = (userData) => {
    // Logic to handle editing a user
    console.log(`Edit user with ID: ${userId}`);
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
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
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
