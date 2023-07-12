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
  ToastId,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import useUser from '../lib/useUser';
import { logOut } from '../api';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Link } from 'react-router-dom';

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
  const toastId = useRef<ToastId>();

  const { isLoggedIn, user } = useUser();
  const queryClient = useQueryClient();

  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: 'In Progress',
        description: 'Processing log out...',
        status: 'loading',
        position: 'bottom-right',
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries(['me']);
      if (toastId.current) {
        toast.update(toastId.current, {
          title: 'Log out',
          description: '또 만나요!',
          status: 'success',
          position: 'bottom-right',
        });
      }
    },
  });

  const onLogOut = async () => {
    mutation.mutate();
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
      w="100%"
      borderBottomWidth={1}
      position={'sticky'}
      top={'0'}
      zIndex={'1000'}
      backgroundColor={'Background'}
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
              {user?.is_host ? (
                <Link to="/rooms/upload">
                  <MenuItem>Upload room</MenuItem>
                </Link>
              ) : null}
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
