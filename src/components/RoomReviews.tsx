import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Grid,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { FaChevronRight, FaStar } from 'react-icons/fa';
import { IReview, IReviewsPage, IRoomDetail } from '../type';
import { getReviews } from '../api';
import useIsOverflow from '../lib/useIsOverflow';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import RoomDetailReview from './RoomDetailReview';
interface IRoomReview {
  rating: number;
}
export default function RoomReviews({ rating }: IRoomReview) {
  const { roomPk } = useParams();
  const {
    isLoading: isReviewsLoading,
    data,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<IReviewsPage>(['rooms', roomPk, 'reviews'], getReviews, {
    getNextPageParam: (lastPage) =>
      lastPage?.nextPage <= lastPage.totalPage ? lastPage?.nextPage : undefined,
  });
  const [reviewRef, isReviewOverflow] = useIsOverflow();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ref, inView } = useInView();
  const totalReview = data?.pages ? data.pages[0].totalReview : 0;
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <Box>
      <Heading fontSize={'2xl'} mb={0}>
        <Skeleton isLoaded={!isReviewsLoading}>
          <HStack>
            <FaStar /> <Text>{rating ?? 0}</Text>
            <Text>∙</Text>
            <Text>
              {totalReview} review{totalReview === 1 ? '' : 's'}
            </Text>
          </HStack>
        </Skeleton>
      </Heading>
      <Container mt={10} maxW="container.lg" marginX="none">
        <Grid templateColumns={'1fr 1fr'} gap={'4'} mb={'4'}>
          {data?.pages
            ? data.pages[0].reviews?.map((review, idx) => (
                <RoomDetailReview
                  idx={idx}
                  review={review}
                  isReviewsLoading={isReviewsLoading}
                  onOpen={onOpen}
                />
              ))
            : null}
        </Grid>
      </Container>
      <Button float={'right'} onClick={onOpen}>
        <FaChevronRight /> 후기 {totalReview}개 모두 보기
      </Button>
      <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="36rem">
          <ModalCloseButton />
          <ModalBody mt={0} overflow={'scroll'}>
            <Heading fontSize={'2xl'} position={'sticky'}>
              <Skeleton isLoaded={!isReviewsLoading}>
                <HStack>
                  <FaStar /> <Text>{rating ?? 0}</Text>
                  <Text>∙</Text>
                  <Text>
                    {totalReview} review{totalReview === 1 ? '' : 's'}
                  </Text>
                </HStack>
              </Skeleton>
            </Heading>
            <Container mt={10} maxW="container.lg" marginX="none">
              <VStack w="100%">
                {data?.pages?.map((page) =>
                  page.reviews?.map((review, index) => {
                    return (
                      <VStack
                        w="100%"
                        alignItems={'flex-start'}
                        key={index}
                        position={'relative'}
                      >
                        <HStack>
                          <Avatar
                            name={review.user.name}
                            src={review.user.avatar}
                            size="md"
                          />
                          <VStack spacing={0} alignItems={'flex-start'}>
                            <Skeleton isLoaded={!isReviewsLoading}>
                              <Heading fontSize={'md'}>
                                {review.user.name}
                              </Heading>
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
                          <Text h="auto">{review.payload}</Text>
                        </Skeleton>
                      </VStack>
                    );
                  })
                )}
                {(hasNextPage || isReviewsLoading) && <Spinner ref={ref} />}
              </VStack>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
