import { useState, useEffect } from "react";
import { Box, Stack, Input, Button, HStack, Text } from "@chakra-ui/react";
import { Alert } from "@chakra-ui/react";
import { RiArrowRightLine, RiMailLine, RiUserLine, RiLockLine } from "react-icons/ri";
import type { ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
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
      handleModalClose();
    } catch (e) {
      console.error(e);
    }
    setUserFormData({ username: "", email: "", password: "" });
  };

  return (
    <Box as="form" onSubmit={handleFormSubmit} width="100%" padding={4} boxShadow="md" borderRadius="lg" background="tomato" color="white">
      <Stack gap={4} width="full">
        {showAlert && (
          <Alert status="error">
            <Alert.Indicator />
            <Alert.Title>Something went wrong with your signup!</Alert.Title>
          </Alert>
        )}

        <Text fontSize="md" color="white">Create an account</Text>
        
        <Input
          type="text"
          name="username"
          placeholder="Your username"
          onChange={handleInputChange}
          value={userFormData.username}
          leftIcon={<RiUserLine />}
        />

        <Input
          type="email"
          name="email"
          placeholder="Your email address"
          onChange={handleInputChange}
          value={userFormData.email}
          leftIcon={<RiMailLine />}
        />

        <Input
          type="password"
          name="password"
          placeholder="Your password"
          onChange={handleInputChange}
          value={userFormData.password}
          leftIcon={<RiLockLine />}
        />

        <HStack justify="flex-end">
          <Button colorScheme="blue" type="submit" isDisabled={!(userFormData.username && userFormData.email && userFormData.password)} rightIcon={<RiArrowRightLine />}>
            Submit
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default SignupForm;