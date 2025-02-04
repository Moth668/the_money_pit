import { useState, useEffect } from "react";
import { Box, Stack, Input, Group, Button, HStack, Text } from "@chakra-ui/react-new";
// import {InputAddon}  from "@chakra-ui/react-new";
// import { Alert } from "@chakra-ui/react-new";
// import { RiUserLine } from "react-icons/ri";
import type { ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Form(props:any) {
	return (
		<Box as="form" onSubmit={props.onSubmit} {...props}>
			{props.children}
		</Box>
	)
}

const LoginForm:React.FC = () => {
    const [userFormData, setUserFormData] = useState({ login: "", password: "", identifier: ""});
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
        setUserFormData({ login: "", password: "", identifier: ""});
    };

    return (
        <Form 
            as="form"
            onSubmit={handleFormSubmit}
            width="100%" 
            padding={4} 
            boxShadow="md" 
            borderRadius="lg" 
            background="tomato" 
            color="white"
            // {...( {} as React.ComponentProps<"form"> )}
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

                <Text fontSize="md" color="white">Please enter email or username to login</Text>

                <Group attached>
                {/* <InputAddon pointerEvents='none'><RiUserLine /></InputAddon> */}
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

                <HStack justify="flex-end">
                    <Button colorScheme="blue" type="submit" disabled={!(userFormData.identifier && userFormData.password)} >
                        Submit
                        {/* <InputAddon pointerEvents='none'>rightIcon={<RiArrowRightLine />}</InputAddon> */}
                    </Button>
                </HStack>
            </Stack>
        </Form>
    );
};

export default LoginForm;
