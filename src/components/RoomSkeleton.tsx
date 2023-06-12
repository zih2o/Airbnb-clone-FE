import { Box, HStack, Skeleton } from '@chakra-ui/react';
import React from 'react';

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton rounded="lg" height={300} mb={5} />
      <HStack justifyContent={'space-between'} mb={3}>
        <Skeleton h={4} rounded={'lg'} w={'60%'} />
        <Skeleton h={4} rounded={'lg'} w={'15%'} />
      </HStack>
      <Skeleton h={3} w={'70%'} rounded={'lg'} mb={1} />
      <Skeleton h={3} w={'50%'} rounded={'lg'} mb={4} />
      <Skeleton h={4} w={'30%'} rounded={'lg'} />
    </Box>
  );
}
