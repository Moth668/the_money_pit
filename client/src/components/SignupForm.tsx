import { useState, useEffect, ReactNode } from "react";
import { Box, Stack, Input, Button, HStack, Text } from "@chakra-ui/react-new";
import { Alert as AlertOld, InputGroup, InputLeftElement } from "@chakra-ui/react-legacy";
import { RiMailLine, RiUserLine, RiLockLine } from "react-icons/ri";
// import { RiArrowRightLine } from "react-icons/ri";
import type { ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Form(props: any) {
  return (
    <Box as="form" onSubmit={props.onSubmit} {...props}>
      {props.children}
    </Box>
  )
}

const SignUpForm: React.FC = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorElement, setErrorElement] = useState<ReactNode>(null);

  useEffect(() => {
    setShowAlert(!!error);
  }, [error]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null); // Reset previous error

    try {
      const { data } = await addUser({ variables: { ...userFormData } });
      Auth.login(data.addUser.token);
    } catch (e: any) {
      console.error("Signup Error:", e);

      let errorMsg: string = "An unexpected error occurred. Please try again.";
      let errorLMNT: ReactNode = <span></span>;

      if (e.graphQLErrors && e.graphQLErrors.length > 0) {
        const originalMessage = e.graphQLErrors[0].message;

        if (originalMessage.includes("duplicate key error")) {
          if (originalMessage.includes("username")) {
            errorMsg = "This username is already taken. Please choose another.";
          } else if (originalMessage.includes("email")) {
            errorMsg = "This email is already registered.  "
              
            errorLMNT = (<span>
              <a
                href="/LoginForm"
                style={{ color: "#FFD700", textDecoration: "underline", fontWeight: "bold" }}
              >
                Click here to log in.
              </a>
            </span>)
          }
        } else {
          errorMsg = originalMessage; // Use general GraphQL error
        }
      }

      setErrorMessage(errorMsg);
      setErrorElement(errorLMNT)
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
        {showAlert && (
          <AlertOld status="error"
            sx={{
              backgroundColor: "#ff4c4c", // Bright red for visibility
              borderRadius: "8px",
              padding: "10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <Text>
              {errorMessage} {errorElement}
            </Text>
          </AlertOld>
        )}

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
          <Button colorScheme="blue" type="submit" disabled={!(userFormData.username && userFormData.email && userFormData.password)} >
            Submit
          </Button>
        </HStack>
      </Stack>
    </Form>
  );
};

export default SignUpForm;