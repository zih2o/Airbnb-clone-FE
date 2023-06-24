import React from 'react';
import { Box, HStack, Divider, Text, VStack, Button } from '@chakra-ui/react';
import { FaComment, FaGithub } from 'react-icons/fa';

export default function SocialLogin() {
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
        <Button leftIcon={<FaComment />} colorScheme={'yellow'} w={'100%'}>
          Login with Kakao
        </Button>
        <Button
          as={'a'}
          href="https://github.com/login/oauth/authorize?client_id=024636271dcbf00c1fde&scope=read:user,user:email"
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
