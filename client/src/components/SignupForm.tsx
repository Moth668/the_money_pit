import { useState, useEffect } from "react";
import { Box, Stack, Input, Group, InputAddon, Button, HStack, Text } from "@chakra-ui/react-new";
import { Alert, AlertIcon, AlertTitle, AlertDescription, InputGroup, InputLeftElement } from "@chakra-ui/react-legacy";
import { RiMailLine, RiUserLine, RiLockLine } from "react-icons/ri";
// import { RiArrowRightLine } from "react-icons/ri";
import type { ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Form(props:any) {
	return (
		<Box as="form" onSubmit={props.onSubmit} {...props}>
			{props.children}
		</Box>
	)
}

const SignUpForm:React.FC = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({ variables: { ...userFormData } });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
    setUserFormData({ username: "", email: "", password: "" });
  };

  return (
    <Form as="form" 
    onSubmit={handleFormSubmit} 
    width="100%" 
    padding={4} 
    boxShadow="md" 
    borderRadius="lg" 
    background="black" 
    color="pink">
      <Stack gap={4} width="full">
        {/* {showAlert && (
           <Alert status="error">
             <Alert.Indicator />
           </Alert>
         )} */}

        <Text fontSize="md" color="white">Create an account</Text>
        
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<RiUserLine />} />
          <Input
            type="text"
            name="username"
            placeholder="Your username"
            onChange={handleInputChange}
            value={userFormData.username}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<RiMailLine />} />
          <Input
            type="email"
            name="email"
            placeholder="Your email address"
            onChange={handleInputChange}
            value={userFormData.email}
          />
        </InputGroup>
          
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<RiLockLine />} />
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            onChange={handleInputChange}
            value={userFormData.password}
          />
        </InputGroup>

        <HStack justify="flex-end">
          <Button colorScheme="blue" type="submit" disabled={!(userFormData.username && userFormData.email && userFormData.password)} rightIcon={<RiArrowRightLine />}>
            Submit
            {/* rightIcon={<RiArrowRightLine />} */}
          </Button>
        </HStack>
      </Stack>
    </Form>
  );
};

export default SignUpForm;