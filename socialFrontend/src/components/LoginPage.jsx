import React, { useState } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useAppContext } from "./AppContext";

const LoginPage = () => {
  const { loginUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colorMode } = useColorMode();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation (you may want to enhance this)
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      // Make a POST request to the backend for user authentication
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      // Assuming the server returns a token and user ID upon successful login
      const { token, userId } = await response.json();

      // Save the user ID to the context
      loginUser({ userId, token });

      // Log the received token and user ID for debugging purposes
      console.log("Received token:", token);
      console.log("User ID:", userId);

      // Redirect or perform any other actions you need after login
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Login failed");
    }
  };

  return (
    <VStack
      spacing={4}
      align="stretch"
      bg={colorMode === "dark" ? "gray.800" : "gray.100"}
      p={8}
      borderRadius="md"
    >
      <Heading
        as="h2"
        size="xl"
        color={colorMode === "dark" ? "white" : "black"}
      >
        Login
      </Heading>
      <form onSubmit={handleLogin}>
        <FormControl>
          <FormLabel color={colorMode === "dark" ? "white" : "black"}>
            Email
          </FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg={colorMode === "dark" ? "white" : "gray.800"}
            color={colorMode === "dark" ? "gray.800" : "white"}
          />
        </FormControl>
        <FormControl>
          <FormLabel color={colorMode === "dark" ? "white" : "black"}>
            Password
          </FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg={colorMode === "dark" ? "white" : "gray.800"}
            color={colorMode === "dark" ? "gray.800" : "white"}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>
          Login
        </Button>
      </form>
    </VStack>
  );
};

export default LoginPage;
