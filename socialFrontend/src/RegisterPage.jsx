import React from "react";
import UserForm from "./components/UserForm";

const RegisterPage = () => {
  const addUser = async (userData) => {
    try {
      // Make a POST request to the backend to create a new user
      const response = await fetch("http://localhost:3001/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      // Handle success or update UI as needed
      console.log("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <UserForm addUser={addUser} />
    </div>
  );
};

export default RegisterPage;
