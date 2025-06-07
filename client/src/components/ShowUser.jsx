import React from "react";

function ShowUser({ users }) {
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
