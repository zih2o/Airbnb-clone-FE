import {
  Box,
  Button,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaAirbnb, FaMoon } from 'react-icons/fa';
import LoginModal from './LoginModal';

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
        <IconButton
          variant={'ghost'}
          icon={<FaMoon />}
          aria-label="Toggle dark mode"
        />
        <Button onClick={onOpen}>Log in</Button>
        <Button colorScheme={'red'}>Sign up</Button>
      </HStack>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}
