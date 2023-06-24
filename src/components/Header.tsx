import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import useUser from '../lib/useUser';
import { logOut } from '../api';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

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
  const toast = useToast();

  const { isLoggedIn, user } = useUser();
  const queryClient = useQueryClient();

  const onLogOut = async () => {
    await logOut();
    queryClient.refetchQueries(['me']);
    toast({
      title: 'Log out',
      description: '정상적으로 로그아웃되었습니다.',
      status: 'success',
      position: 'bottom-right',
    });
  };
  return (
    <Stack
      justifyContent={'space-between'}
      alignItems={'center'}
      spacing={{
        sm: '4',
        md: '0',
      }}
      direction={{
        sm: 'column',
        md: 'row',
      }}
      px={20}
      py={5}
      borderBottomWidth={1}
    >
      <Box as={'a'} href={'/'} color={logoColor} fontSize={'4xl'}>
        <FaAirbnb />
      </Box>
      <HStack spacing={5}>
        <IconButton
          onClick={toggleColorMode}
          variant={'ghost'}
          icon={<Icon />}
          aria-label="Toggle dark mode"
        />
        {isLoggedIn ? (
          <Menu>
            <MenuButton>
              <Avatar name={user?.name} src={user?.avatar} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onLogOut} textColor={'red.400'} as={'b'}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Button onClick={onLoginOpen}>Log in</Button>
            <LightMode>
              <Button onClick={onSignUpOpen} colorScheme={'red'}>
                Sign up
              </Button>
            </LightMode>
          </>
        )}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
