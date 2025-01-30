import { useState, useEffect } from 'react';
import { Box, Fieldset, FormControl, Input, Button, Alert } from '@chakra-ui/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
      handleModalClose();
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <Box as="form" onSubmit={handleFormSubmit} w="100%" p={4} boxShadow="md" borderRadius="lg">
      {showAlert && (
        <Alert status="error" mb={4}>
          Something went wrong with your login credentials!
        </Alert>
      )}

      <Fieldset mb={4} isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input type="email" name="email" placeholder="Your email" onChange={handleInputChange} value={userFormData.email} />
      </Fieldset>

      <Fieldset mb={4} isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input type="password" name="password" placeholder="Your password" onChange={handleInputChange} value={userFormData.password} />
      </Fieldset>

      <Button colorScheme="blue" type="submit" isDisabled={!(userFormData.email && userFormData.password)} width="full">
        Submit
      </Button>
    </Box>
  );
};

export default LoginForm;