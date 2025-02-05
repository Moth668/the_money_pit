import React, { useState, useEffect } from "react";
import { Box, Stack, Input, Button, HStack, Text, Group } from "@chakra-ui/react-new";
import type { ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link as RouterLink } from "react-router-dom";

function Form(props: any) {
  return (
    <Box as="form" onSubmit={props.onSubmit} {...props}>
      {props.children}
    </Box>
  );
}

const LoginForm: React.FC = () => {
  const [userFormData, setUserFormData] = useState({
    login: "",
    password: "",
    identifier: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    setShowAlert(!!error);
  }, [error]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { ...userFormData } });
      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setUserFormData({ login: "", password: "", identifier: "" });
  };

  return (
    <Form
      as="form"
      onSubmit={handleFormSubmit}
      width="100%"
      padding={4}
      boxShadow="md" 
      borderRadius="lg" 
      background="rgb(222, 210, 198)" 
      color="black"
    >
      <Stack gap={4} width="full">
        {showAlert && (
          // <Alert status="error">
          //     <Alert.Indicator />
          //     <Alert.Title>Something went wrong with your login credentials!</Alert.Title>
          // </Alert>
          <div>
            <p>Something went wrong with your login credentials!</p>
          </div>
        )}


        <Text fontSize="md" color="white">
          Please enter email or username to login
        </Text>

                <Group attached>
                <Input
                    type="text"
                    name="login"
                    placeholder="Your email or username"
                    onChange={handleInputChange}
                    value={userFormData.login}
                />
                </Group>
                <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    onChange={handleInputChange}
                    value={userFormData.password}
                />


                <HStack justify="space-between">
                    <RouterLink to="/SignupForm" color="blue.500">Sign Up - Register New User</RouterLink>
                    <Button background="rgb(212, 188, 94)" color="black" type="submit" disabled={!(userFormData.login && userFormData.password)}>
                        Submit
                    </Button>
                </HStack>
            </Stack>
        </Form>
    );
};

export default LoginForm;
