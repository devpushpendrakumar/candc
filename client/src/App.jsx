import "./App.css";
import { useState, useEffect, useCallback } from "react"; // Import useCallback
import GetInput from "./components/GetInput";
import ShowUser from "./components/ShowUser";
import { getUsers, createUser } from "./services/userServices.js"; // Assuming createUser is also in userServices.js

function App() {
  const [usersList, setUsersList] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // A state variable to trigger re-fetches

  // Effect to fetch users when the component mounts or refreshKey changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading true before fetching
      setError(null); // Clear any previous errors
      try {
        const fetchedUsers = await getUsers();
        //console.log("Fetched users:", fetchedUsers); // Log the fetched users
        setUsersList(fetchedUsers.data.length > 0 ? fetchedUsers.data : []); // Update the usersList state
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError(err); // Store the error
      } finally {
        setLoading(false); // Set loading false after fetch attempt
      }
    };

    fetchUsers(); // Call the async function
  }, [refreshKey]); // Dependency array: re-run this effect when refreshKey changes

  // Callback function to handle adding a new user
  // This function will be passed down to GetInput
  const handleAddUser = useCallback(async (newUserData) => {
    try {
      // 1. Send new user data to the server
      await createUser(newUserData);

      // 2. If successful, increment refreshKey to trigger getUsers() again
      setRefreshKey((prev) => prev + 1);

      // Optional: Give feedback to the user (e.g., a success message)
      console.log("User added successfully!");
    } catch (err) {
      console.error("Error adding user:", err);
      // Handle error, e.g., show an error message to the user
      setError(err);
    }
  }, []); // Empty dependency array for useCallback means this function won't change unless its internal dependencies change.

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
      {/* Pass the handleAddUser function to GetInput */}
      <GetInput onUserAdded={handleAddUser} />
      {/* Display the fetched users */}
      <ShowUser users={usersList} onDelete={setRefreshKey} />
    </div>
  );
}

export default App;
