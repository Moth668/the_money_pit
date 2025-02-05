import { Box, Flex, Image } from '@chakra-ui/react-new';
import { Link } from 'react-router-dom';
import bunkerPig from '../../../assets/bunker-pig.jpg';

const Header: React.FC = () => {
    return (
        <Box as="header" bg="gray.800" p={4} height={{ base: '150px', sm: '200px', md: '250px' }}>
            {/* Responsive height based on screen size */}
            <Flex align="center" justify="center" height="100%">
                <Link to="/">
                    <Box
                        width="100%"
                        height="100%"
                        overflow="hidden"
                        border="2px solid black"
                    >
                        <Image
                            src={bunkerPig}
                            alt="Logo"
                            width="50%" // Makes the image fill the width of the container
                            height="50%" // Makes the image fill the height of the container
                            objectFit="contain" // Ensures the image covers the entire container
                            maxWidth="100%" // Ensures the image does not exceed its original size
                            maxHeight="100%" // Ensures the image does not exceed its original size
                            margin="auto" // Centers the image horizontally
                        />
                    </Box>
                </Link>
            </Flex>
        </Box>
    );
};

export default Header;