import React from 'react';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FaUser, FaLock } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usernameLogIn } from '../api';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: ILoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>();

  const toast = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation(usernameLogIn, {
    onSuccess: () => {
      toast({
        title: 'Log in',
        description: '다시 봬서 반가워요!',
        status: 'success',
        position: 'bottom-right',
      });
      onClose();
      queryClient.refetchQueries(['me']);
      reset();
    },
  });
  const onSubmit = ({ username, password }: ILoginForm) => {
    mutation.mutate({ username, password });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottomWidth={1}>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaUser />
                  </Box>
                }
              />
              <Input
                {...register('username', {
                  required: 'Please write a username',
                })}
                isInvalid={!!errors.username?.message}
                placeholder="Username"
                variant={'filled'}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                {...register('password', {
                  required: 'Please write a password',
                })}
                isInvalid={!!errors.password?.message}
                type="password"
                placeholder="Password"
                variant={'filled'}
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text textColor={'red.500'} fontSize={'sm'} textAlign={'center'}>
              username or password is incorrect.
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme="red"
            w={'100%'}
          >
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
