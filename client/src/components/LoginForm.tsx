import { useState, useEffect } from "react";
import { Box, Stack, Input, Button, HStack, Text } from "@chakra-ui/react";
import { Alert } from "@chakra-ui/react";
import { RiArrowRightLine, RiMailLine, RiUserLine } from "react-icons/ri";
import type { ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
    const [userFormData, setUserFormData] = useState({ identifier: "", password: "" });
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
            Auth.login(data.login.token);
            handleModalClose();
        } catch (e) {
            console.error(e);
        }
        setUserFormData({ identifier: "", password: "" });
    };

    return (
        <Box as="form" onSubmit={handleFormSubmit} width="100%" padding={4} boxShadow="md" borderRadius="lg" background="tomato" color="white">
            <Stack gap={4} width="full">
                {showAlert && (
                    <Alert status="error">
                        <Alert.Indicator />
                        <Alert.Title>Something went wrong with your login credentials!</Alert.Title>
                    </Alert>
                )}

                <Text fontSize="md" color="white">Please enter email or username to login</Text>

// this is where user is told to enter and email or user name to login
                <Input
                    type="text"
                    name="identifier"
                    placeholder="Your email or username"
                    onChange={handleInputChange}
                    value={userFormData.identifier}
                    leftIcon={<RiUserLine />}
                />

                <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    onChange={handleInputChange}
                    value={userFormData.password}
                />

                <HStack justify="flex-end">
                    <Button colorScheme="blue" type="submit" isDisabled={!(userFormData.identifier && userFormData.password)} rightIcon={<RiArrowRightLine />}>
                        Submit
                    </Button>
                </HStack>
            </Stack>
        </Box>
    );
};

export default LoginForm;
