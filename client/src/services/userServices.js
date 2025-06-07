// fetch user data from the server

const getUsers = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/users`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export { getUsers, createUser };
