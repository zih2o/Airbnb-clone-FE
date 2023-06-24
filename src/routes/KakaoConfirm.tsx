import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { kakaoLogIn } from '../api';
import { Heading, Spinner, Text, VStack, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function KakaoConfirm() {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  const mutation = useMutation(kakaoLogIn, {
    onSuccess: () => {
      queryClient.refetchQueries(['me']);
      navigate('/');
      toast({
        status: 'success',
        title: 'Log in',
        description: '다시 봬서 반가워요!',
        position: 'bottom-right',
      });
    },
  });

  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      mutation.mutate(code);
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={'center'} mt={40}>
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
