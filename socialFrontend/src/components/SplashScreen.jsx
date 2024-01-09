import React from "react";
import { Box, Flex, Heading, Button, Center, chakra } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";

const ChakraLink = chakra(Link); // Wrap Link with chakra

const SplashScreen = ({ onLogin }) => {
  return (
    <Flex
      h="100vh"
      bg={{ light: "teal.500", dark: "gray.800" }}
      color={{ light: "white", dark: "gray.200" }}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        p={8}
        bg={{ light: "white", dark: "gray.700" }}
        borderRadius="lg"
        boxShadow="md"
        border="1px solid"
        borderColor={{ light: "teal.300", dark: "gray.600" }}
        w="350px"
        textAlign="center"
        overflow="hidden" // Add this to hide any overflowing content
      >
        <LoginPage onLogin={onLogin} />
        <Center>
          {/* Use chakra-enhanced Link component */}
          <Button
            as={ChakraLink}
            to="/register"
            colorScheme="teal"
            variant="link"
            mt={4}
          >
            Don't have an account? Register here.
          </Button>
        </Center>
      </Box>
    </Flex>
  );
};

export default SplashScreen;
