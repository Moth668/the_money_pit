import { useState, useEffect } from "react";
import { Box, Stack, Input, Group, InputAddon, Button, HStack, Text } from "@chakra-ui/react-new";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react-legacy";
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
    <Form as="form" onSubmit={handleFormSubmit} width="100%" padding={4} boxShadow="md" borderRadius="lg" background="tomato" color="white">
      <Stack gap={4} width="full">
        {showAlert && (
          <Alert status="error">
          <AlertIcon />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>Please check your details and try again.</AlertDescription>
        </Alert>
        )}

        <Text fontSize="md" color="white">Create an account</Text>

        <Group attached>
          <InputAddon><RiUserLine /></InputAddon>
          <Input
            type="text"
            name="username"
            placeholder="Your username"
            onChange={handleInputChange}
            value={userFormData.username}
            // leftIcon={<RiUserLine />}
          />

        </Group>
        <Group attached>
        <InputAddon><RiMailLine /></InputAddon>
          <Input
            type="email"
            name="email"
            placeholder="Your email address"
            onChange={handleInputChange}
            value={userFormData.email}
            // leftIcon={<RiMailLine />}
          />
        </Group>
        <Group attached>
        <InputAddon><RiLockLine /></InputAddon>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            onChange={handleInputChange}
            value={userFormData.password}
            // leftIcon={<RiLockLine />}
          />
        </Group>
        <HStack justify="flex-end">
          <Button colorScheme="blue" type="submit" disabled={!(userFormData.username && userFormData.email && userFormData.password)} >
            Submit
            {/* rightIcon={<RiArrowRightLine />} */}
          </Button>
        </HStack>
      </Stack>
    </Form>
  );
};

export default SignupForm;