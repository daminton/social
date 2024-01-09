import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Center,
  Box,
} from "@chakra-ui/react";

const UserForm = ({ addUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields (add more validation as needed)

    // Call the function to add the user
    addUser({ username, email, password });

    // Clear form fields
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box width={300}>
        <FormControl mb={4}>
          <FormLabel>Username:</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Center>
          <Button type="submit" colorScheme="teal" mt={4}>
            Add User
          </Button>
        </Center>
      </Box>
    </form>
  );
};

export default UserForm;
