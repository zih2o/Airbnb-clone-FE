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
import { IRoomList } from '../type';

export default function Room({
  photos,
  city,
  country,
  rating,
  price,
}: IRoomList) {
  const gray = useColorModeValue('gray.600', 'gray.300');
  return (
    <VStack alignItems={'flex-start'}>
      <Box position={'relative'} overflow={'hidden'} rounded={'xl'} mb={3}>
        <Image minH={300} src={photos[0].file} />
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
            {city}, {country}
          </Text>
          <HStack spacing={1}>
            <FaStar />
            <Text>{rating}</Text>
          </HStack>
        </Grid>
        <Text fontSize={'sm'} color={gray}>
          호스트: @@@@ 님 ・ 호스트 경력 7년
        </Text>
        <Text fontSize={'sm'} color={gray}>
          11월 18일 ~ 11월 30일
        </Text>
      </Box>
      <Text>
        <Text as={'b'}>₩ {price}</Text> /박
      </Text>
    </VStack>
  );
}
