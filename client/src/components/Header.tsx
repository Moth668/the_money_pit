import { Box, Flex, Image } from '@chakra-ui/react-new';
import { Link } from 'react-router-dom';
import bunkerPig from '../../../assets/bunker-pig.jpg';

const Header: React.FC = () => {
    return (
        <Box as="header" bg="rgb(222, 210, 198)" p={4} height={{ base: '150px', sm: '200px', md: '250px' }}>
            <Flex align="center" justify="center" height="100%">
                <Link to="/">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width= "100%"
                        height={{ base: "100px", sm: "200px", md: "250px" }} // Fixed height
                        overflow="hidden"
                        border=""
                    >
                        <Image
                            src={bunkerPig}
                            alt="Logo"
                            maxWidth="100%" // Keeps image within the container width
                            maxHeight="100%" // Keeps image within the container height
                            objectFit="contain" // Ensures the image does not distort
                        />
                    </Box>
                </Link>
            </Flex>
        </Box>
    );
};

export default Header;