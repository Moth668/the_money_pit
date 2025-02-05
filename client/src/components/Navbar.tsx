import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Spacer,
  Button,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react-legacy";
import SignUpForm from "./SignupForm";
import Auth from "../utils/auth";

const AppNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box bg="tomato" p={4} color="white">
      <Flex align="center">
        <Button as={Link} to="/" variant="ghost" color="white" fontSize="xl">
          Google Books Search
        </Button>
        <Spacer />
        <HStack spacing={4}>
          <Button as={Link} to="/">Search For Books</Button>
          {Auth.loggedIn() ? (
            <>
              <Button as={Link} to="/saved">See Your Books</Button>
              <Button onClick={Auth.logout}>Logout</Button>
            </>
          ) : (
            <Button onClick={onOpen}>Login/Sign Up</Button>
          )}
        </HStack>
      </Flex>

      {/* Modal for Login/Signup */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <TabList>
              <Tab onClick={() => setTabIndex(0)}>Login</Tab>
              <Tab onClick={() => setTabIndex(1)}>Sign Up</Tab>
            </TabList>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs index={tabIndex} onChange={setTabIndex}>
              <TabPanels>
                {/* <TabPanel>
                  <LoginForm handleModalClose={onClose} />
                </TabPanel> */}
                <TabPanel>
                  <SignUpForm handleModalClose={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AppNavbar;