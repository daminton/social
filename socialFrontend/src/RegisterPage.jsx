import React from "react";
import UserForm from "./components/UserForm";
import {
  Box,
  Heading,
  Center,
  Link,
  useColorMode,
  Button,
  chakra,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { colorMode } = useColorMode();
  let navigate = useNavigate();
  const ChakraLink = chakra(Link); // Wrap Link with chakra

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
    <Center minH="100vh">
      <Box
        p={8}
        maxW="400px"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        bg={colorMode === "dark" ? "gray.700" : "white"}
      >
        <Button
          onClick={() => navigate("/")}
          colorScheme="teal"
          variant="link"
          mt={4}
        >
          <ArrowBackIcon /> Back to Login
        </Button>

        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Register
        </Heading>
        <UserForm addUser={addUser} />
      </Box>
    </Center>
  );
};

export default RegisterPage;
