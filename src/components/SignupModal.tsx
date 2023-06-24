import React, { useRef, useState } from 'react';
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
  ToastId,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FaUser, FaLock, FaEnvelope, FaUserNinja } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';
import { ISignUpError, ISignUpForm } from '../type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../api';
import { AxiosError } from 'axios';

interface ISignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: ISignupModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignUpForm>();

  const toast = useToast();
  const toastId = useRef<ToastId>();

  const queryClient = useQueryClient();

  const [Error, setError] = useState('');

  const mutation = useMutation(signUp, {
    onMutate: () => {
      toastId.current = toast({
        title: 'In Progress',
        description: '회원가입을 진행 중입니다.',
        status: 'loading',
        position: 'bottom-right',
      });
    },
    onSuccess: () => {
      onClose();
      queryClient.refetchQueries(['me']);
      if (toastId.current) {
        toast.update(toastId.current, {
          title: 'Sign Up',
          description: '만나서 반가워요!',
          status: 'success',
          position: 'bottom-right',
        });
      }
      // reset();
    },
    onError: (error: AxiosError<ISignUpError>) => {
      setError(error?.response?.data?.error || '');
      if (!Error) {
        toast({
          title: 'Failure',
          description: 'Account creation failed.',
          status: 'error',
          position: 'bottom-right',
        });
      }
    },
  });

  const onSubmit = ({ name, username, email, password }: ISignUpForm) => {
    mutation.mutate({ name, username, email, password });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottomWidth={1}>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
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
                {...register('name', { required: true })}
                isInvalid={!!errors.name?.message}
                placeholder="Name"
                variant={'filled'}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                {...register('email', { required: true })}
                isInvalid={!!errors.email?.message}
                placeholder="Email"
                variant={'filled'}
                type="email"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                {...register('username', { required: true })}
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
                {...register('password', { required: true })}
                isInvalid={!!errors.password?.message}
                placeholder="Password"
                variant={'filled'}
                type="password"
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text textAlign="center" fontSize="sm" textColor="red.500">
              {Error}
            </Text>
          ) : null}
          <Button type="submit" mt={4} colorScheme="red" w={'100%'}>
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
