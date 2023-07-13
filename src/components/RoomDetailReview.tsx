import React from 'react';
import {
  Avatar,
  Button,
  HStack,
  Heading,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { IReview } from '../type';
import useIsOverflow from '../lib/useIsOverflow';

interface IRoomDetailReview {
  idx: number;
  review: IReview;
  isReviewsLoading: boolean;
  onOpen: () => void;
}

export default function RoomDetailReview({
  idx,
  review,
  isReviewsLoading,
  onOpen,
}: IRoomDetailReview) {
  const [reviewRef, isReviewOverflow] = useIsOverflow();

  return (
    <VStack
      key={idx}
      w={'100%'}
      alignItems={'flex-start'}
      position={'relative'}
      overflow={'hidden'}
    >
      <HStack key={idx + 'a'}>
        <Avatar
          key={idx + 'aa'}
          name={review.user.name}
          src={review.user.avatar}
          size="md"
        />
        <VStack key={idx + 'b'} spacing={0} alignItems={'flex-start'}>
          <Skeleton isLoaded={!isReviewsLoading}>
            <Heading key={idx + 'bb'} fontSize={'md'}>
              {review.user.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isReviewsLoading}>
            <HStack key={idx + 'c'} spacing={1}>
              <FaStar size="12px" />
              <Text key={idx + 'cc'}>{review.rating}</Text>
            </HStack>
          </Skeleton>
        </VStack>
      </HStack>
      <Skeleton isLoaded={!isReviewsLoading}>
        <Text h="12" overflow={'clip'} ref={reviewRef} key={idx + 'd'}>
          {review.payload}
        </Text>
      </Skeleton>
      {isReviewOverflow ? (
        <Button
          key={idx + 'e'}
          onClick={onOpen}
          position={'absolute'}
          bottom={'1'}
          right={'1'}
          size={'xs'}
          colorScheme="blackAlpha"
        >
          더보기
        </Button>
      ) : null}
    </VStack>
  );
}
