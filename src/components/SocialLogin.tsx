import React from 'react';
import { Box, HStack, Divider, Text, VStack, Button } from '@chakra-ui/react';
import { FaComment, FaGithub } from 'react-icons/fa';

export default function SocialLogin() {
  const kakaoParams = {
    client_id: '3578cdbb0e21d6feabaa9d424e7d14e5',
    redirect_uri: 'http://127.0.0.1:3000/social/kakao',
    response_type: 'code',
  };
  const githubParams = {
    client_id: '024636271dcbf00c1fde',
    scope: 'read:user,user:email',
  };
  const kakaoParamStr = new URLSearchParams(kakaoParams).toString();
  const githubParamStr = new URLSearchParams(githubParams).toString();
  return (
    <Box mb={4}>
      <HStack my={6}>
        <Divider />
        <Text
          textTransform={'uppercase'}
          as={'b'}
          fontSize={'xs'}
          color={'gray.500'}
        >
          or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as={'a'}
          href={`https://kauth.kakao.com/oauth/authorize?${kakaoParamStr}`}
          leftIcon={<FaComment />}
          colorScheme={'yellow'}
          w={'100%'}
        >
          Login with Kakao
        </Button>
        <Button
          as={'a'}
          href={`https://github.com/login/oauth/authorize?${githubParamStr}`}
          leftIcon={<FaGithub />}
          colorScheme={'facebook'}
          w={'100%'}
        >
          Login with Github
        </Button>
      </VStack>
    </Box>
  );
}
