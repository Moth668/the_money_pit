import React, { useState, useEffect } from "react";
import { Box, Stack, Input, Button, HStack, Text, Alert, Link } from "@chakra-ui/react-new";
import { RiArrowRightLine, RiMailLine, RiUserLine } from "react-icons/ri";
import type { ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Router, Link as RouterLink } from "react-router-dom";

const LoginForm: React.FC = () => {
    const [userFormData, setUserFormData] = useState({ login: "", password: "" });
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
        setUserFormData({ login: "", password: "" });
    };

    return (
        <Box 
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
                {/* {showAlert && (
                    <Alert status="error">
                        <Text>Something went wrong with your login credentials!</Text>
                    </Alert>
                )} */}

                <Text fontSize="md">Please enter email or username to login</Text>

                <Input
                    type="text"
                    name="login"
                    placeholder="Your email or username"
                    onChange={handleInputChange}
                    value={userFormData.login}
                    leftIcon={<RiUserLine />}
                />

                <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    onChange={handleInputChange}
                    value={userFormData.password}
                />

                <HStack justify="space-between">
                    <RouterLink to="/SignupForm" color="blue.500">Sign Up - Register New User</RouterLink>
                    <Button background="rgb(212, 188, 94)" color="black" type="submit" disabled={!(userFormData.login && userFormData.password)} rightIcon={<RiArrowRightLine />}>
                        Submit
                    </Button>
                </HStack>
            </Stack>
        </Box>
    );
};

export default LoginForm;
