import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import { IoIosMail } from 'react-icons/io';

export default function Footer() {
  return (
    <HStack
      justifyContent={'center'}
      w={'100vw'}
      h="40"
      mt="8"
      backgroundColor={'gray.100'}
      borderTop={'1px'}
      borderColor={'gray.300'}
      zIndex={'1'}
    >
      <IoIosMail size={40} color={'gray'} />
    </HStack>
  );
}
