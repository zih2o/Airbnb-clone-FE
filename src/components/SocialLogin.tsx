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
        <Button leftIcon={<FaGithub />} colorScheme={'facebook'} w={'100%'}>
          Login with Github
        </Button>
      </VStack>
    </Box>
  );
}
