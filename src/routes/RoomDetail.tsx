import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getReviews, getRoom } from '../api';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { IReview, IRoomDetail } from '../type';
import { FaStar } from 'react-icons/fa';

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
      <HStack width={'40%'} justifyContent={'space-between'} my={10}>
        <VStack alignItems={'flex-start'}>
          <Skeleton isLoaded={!isLoading} height={'30px'}>
            <Heading fontSize={'2xl'}>
              House hosted by {room?.owner.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} height={'30px'}>
            <HStack justifyContent={'flex-start'} w="100%">
              <Text>
                {room?.toilets} toliet{room?.toilets === 1 ? '' : 's'}
              </Text>
              <Text>∙</Text>
              <Text>
                {room?.rooms} room{room?.rooms === 1 ? '' : 's'}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar name={room?.owner.name} size={'xl'} src={room?.owner.avatar} />
      </HStack>
      <Divider />
      <Box mt={10}>
        <Heading fontSize={'2xl'} mb={0}>
          <Skeleton isLoaded={!isReviewsLoading} w={'30%'}>
            <HStack>
              <FaStar /> <Text>{room?.rating}</Text>
              <Text>∙</Text>
              <Text>
                {reviews?.length} review{reviews?.length === 1 ? '' : 's'}
              </Text>
            </HStack>
          </Skeleton>
        </Heading>
        <Container mt={10} maxW="container.lg" marginX="none">
          <Grid gap={10} templateColumns={'1fr 1fr'}>
            {reviews?.map((review, index) => (
              <VStack alignItems={'flex-start'} key={index}>
                <HStack>
                  <Avatar
                    name={review.user.name}
                    src={review.user.avatar}
                    size="md"
                  />
                  <VStack spacing={0} alignItems={'flex-start'}>
                    <Skeleton isLoaded={!isReviewsLoading}>
                      <Heading fontSize={'md'}>{review.user.name}</Heading>
                    </Skeleton>

                    <Skeleton isLoaded={!isReviewsLoading}>
                      <HStack spacing={1}>
                        <FaStar size="12px" />
                        <Text>{review.rating}</Text>
                      </HStack>
                    </Skeleton>
                  </VStack>
                </HStack>
                <Skeleton isLoaded={!isReviewsLoading}>
                  <Text>{review.payload}</Text>
                </Skeleton>
              </VStack>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
