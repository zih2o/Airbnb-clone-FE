import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { checkBooking, getReviews, getRoom } from '../api';
import {
  Avatar,
  Box,
  Button,
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
import { IReview, IRoomDetail, Value } from '../type';
import { FaStar } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Helmet } from 'react-helmet';

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
  const [dates, setDates] = useState<Value>(new Date());
  const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
    ['check', roomPk, dates],
    checkBooking,
    {
      cacheTime: 0,
      enabled: dates !== undefined,
    }
  );
  return (
    <Box mt={10} px={{ base: '10', lg: '48' }}>
      <Helmet>
        <title>{room ? room.name : 'Loading...'}</title>
      </Helmet>
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
      <Grid templateColumns={'2fr 1fr'} gap={10}>
        <Box>
          <HStack justifyContent={'space-between'} my={10}>
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
            <Avatar
              name={room?.owner.name}
              size={'xl'}
              src={room?.owner.avatar}
            />
          </HStack>
          <Divider />
          <Box mt={10}>
            <Heading fontSize={'2xl'} mb={0}>
              <Skeleton isLoaded={!isReviewsLoading}>
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
        <Box mt={5}>
          <Calendar
            onChange={setDates}
            value={dates}
            prev2Label={null}
            next2Label={null}
            minDetail="month"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 12 * 1000)}
            selectRange
          />
          <Button
            disabled={!checkBookingData?.ok || !!dates}
            isLoading={isCheckingBooking}
            mt={5}
            w="100%"
            colorScheme={'red'}
          >
            예약하기
          </Button>
          {!isCheckingBooking && !checkBookingData?.ok ? (
            <Text color={'red.500'}>이 날짜에는 예약할 수 없습니다.</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
