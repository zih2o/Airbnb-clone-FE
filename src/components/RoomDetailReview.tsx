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
      w={'100%'}
      alignItems={'flex-start'}
      key={idx}
      position={'relative'}
      overflow={'hidden'}
    >
      <HStack>
        <Avatar name={review.user.name} src={review.user.avatar} size="md" />
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
        <Text h="12" overflow={'clip'} ref={reviewRef}>
          {review.payload}
        </Text>
      </Skeleton>
      {isReviewOverflow ? (
        <Button
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
