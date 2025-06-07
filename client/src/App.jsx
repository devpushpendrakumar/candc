const users = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 9876543210",
  },
  {
    id: 2,
    name: "Sanya Verma",
    email: "sanya.verma@example.com",
    phone: "+91 9988776655",
  },
  {
    id: 3,
    name: "Rohan Gupta",
    email: "rohan.gupta@example.com",
    phone: "+91 9123456789",
  },
  {
    id: 4,
    name: "Diya Patel",
    email: "diya.patel@example.com",
    phone: "+91 9555123456",
  },
  {
    id: 5,
    name: "Vivaan Singh",
    email: "vivaan.singh@example.com",
    phone: "+91 9810293847",
  },
  {
    id: 6,
    name: "Anika Reddy",
    email: "anika.reddy@example.com",
    phone: "+91 9001002003",
  },
];

import "./App.css";
import { useState, useEffect, useCallback } from "react";
import GetInput from "./components/GetInput";
import ShowUser from "./components/ShowUser";
import { getUsers, createUser } from "./services/userServices.js";

function App() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {function App() {
  const [usersList, setUsersList] = useState(users);
  const [list, setList] = useState([]);

  useEffect(async () => {
    const fetchedUser = await getUsers();
    setList(fetchedUser);
  }, [usersList]);
  return (
    <div className="AppContainer">
      <GetInput setUsersList={setUsersList} />
      <ShowUser users={usersList} />
    </div>
  );
}

export default App;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedUsers = await getUsers();
        setUsersList(fetchedUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refreshKey]);

  const handleAddUser = useCallback(async (newUserData) => {
    try {
      await createUser(newUserData);

      setRefreshKey((prev) => prev + 1);

      console.log("User added successfully!");
    } catch (err) {
      console.error("Error adding user:", err);
      setError(err);
    }
  }, []);

  if (loading) {
    return <div className="AppContainer">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="AppContainer" style={{ color: "red" }}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="AppContainer">
      <GetInput onUserAdded={handleAddUser} />
      <ShowUser users={usersList} />
    </div>
  );
}

export default App;
