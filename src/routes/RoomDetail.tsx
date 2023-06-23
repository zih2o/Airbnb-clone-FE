import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getReviews, getRoom } from '../api';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
} from '@chakra-ui/react';
import { IReview, IRoomDetail } from '../type';

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data: room } = useQuery<IRoomDetail>(
    ['rooms', roomPk],
    getRoom
  );
  const { isLoading: isReviewsLoading, data: reviews } = useQuery<IReview[]>(
    ['rooms', roomPk, 'reviews'],
    getReviews
  );
  return (
    <Box mt={10} px={{ base: '10', lg: '48' }}>
      <Skeleton h={10} w={'100%'} isLoaded={!isLoading}>
        <Heading fontSize={'3xl'}>{room?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={'hidden'}
        gap={2}
        height="60vh"
        templateRows={'1fr 1fr'}
        templateColumns={'repeat(4, 1fr)'}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={'hidden'}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              <Image
                objectFit={'cover'}
                w="100%"
                h="100%"
                bgColor={'gray.200'}
                src={room?.photos[index]?.file}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
