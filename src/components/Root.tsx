import { Outlet } from 'react-router-dom';
import { Box, Button, HStack } from '@chakra-ui/react';
import { FaAirbnb } from 'react-icons/fa';

export default function Root() {
  return (
    <Box>
      <HStack
        justifyContent={'space-between'}
        px={10}
        py={5}
        borderBottomWidth={1}
      >
        <Box color={'red.500'} fontSize={'4xl'}>
          <FaAirbnb />
        </Box>
        <HStack spacing={5}>
          <Button>Log in</Button>
          <Button colorScheme={'red'}>Sign up</Button>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}
