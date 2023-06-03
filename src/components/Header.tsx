import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default function Header() {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();

  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue('red.500', 'red.200');
  const Icon = useColorModeValue(FaMoon, FaSun);

  return (
    <HStack
      justifyContent={'space-between'}
      px={10}
      py={5}
      borderBottomWidth={1}
    >
      <Box color={logoColor} fontSize={'4xl'}>
        <FaAirbnb />
      </Box>
      <HStack spacing={5}>
        <IconButton
          onClick={toggleColorMode}
          variant={'ghost'}
          icon={<Icon />}
          aria-label="Toggle dark mode"
        />
        <Button onClick={onLoginOpen}>Log in</Button>
        <LightMode>
          <Button onClick={onSignUpOpen} colorScheme={'red'}>
            Sign up
          </Button>
        </LightMode>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </HStack>
  );
}
