// App.jsx

import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  extendTheme,
  ColorModeScript,
  Box,
  Flex,
  Heading,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import SplashScreen from "./components/SplashScreen";
import AddPostForm from "./components/AddPostForm";
import { AppProvider } from "./components/AppContext";
import { useNavigate } from "react-router-dom";

import "./App.css";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleToggle = () => {
    toggleColorMode();
  };

  return (
    <Button
      onClick={handleToggle}
      ml={2}
      bg={colorMode === "light" ? "gray.300" : "gray.700"}
      _hover={{ bg: colorMode === "light" ? "gray.400" : "gray.600" }}
      color={colorMode === "light" ? "black" : "white"}
    >
      {colorMode === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
};

const App = () => {
  const handleLogin = (receivedToken) => {
    const navigate = useNavigate();
    navigate("/posts");
    console.log("User is logged in with token:", receivedToken);
  };

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AppProvider>
        <Router>
          <Box height="100vh" overflow="hidden">
            <Flex
              justifyContent="space-between"
              p={4}
              bg={
                theme.config.initialColorMode === "light"
                  ? "gray.200"
                  : "gray.700"
              }
            >
              <Heading
                as="h1"
                size="lg"
                color={
                  theme.config.initialColorMode === "light" ? "black" : "white"
                }
              >
                Social
              </Heading>
              <ColorModeToggle />
            </Flex>
            <Routes>
              <Route
                path="/"
                element={<SplashScreen onLogin={handleLogin} />}
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/post" element={<AddPostForm />} />
            </Routes>
          </Box>
        </Router>
      </AppProvider>
    </ChakraProvider>
  );
};

export default App;
