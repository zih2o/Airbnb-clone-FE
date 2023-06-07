import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaRegHeart, FaStar } from 'react-icons/fa';

export default function Room() {
  const gray = useColorModeValue('gray.600', 'gray.300');
  return (
    <VStack alignItems={'flex-start'}>
      <Box position={'relative'} overflow={'hidden'} rounded={'xl'} mb={3}>
        <Image
          minH={300}
          src="https://a0.muscache.com/im/pictures/miso/Hosting-10989371/original/46c0c87f-d9bc-443c-9b64-24d9e594b54c.jpeg?im_w=720"
        />
        <Button
          variant={'unstyled'}
          position={'absolute'}
          top={2}
          right={1}
          color={'gray.100'}
        >
          <FaRegHeart size={25} />
        </Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={'7fr 1fr'}>
          <Text as={'b'} noOfLines={1}>
            발렌시아, 스페인
          </Text>
          <HStack spacing={1}>
            <FaStar />
            <Text>4.9</Text>
          </HStack>
        </Grid>
        <Text fontSize={'sm'} color={gray}>
          호스트: sagrario 님 ・ 호스트 경력 7년
        </Text>
        <Text fontSize={'sm'} color={gray}>
          11월 18일 ~ 11월 30일
        </Text>
      </Box>
      <Text>
        <Text as={'b'}>₩ 60,897</Text> /박
      </Text>
    </VStack>
  );
}
