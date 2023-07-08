import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaChevronRight, FaStar } from 'react-icons/fa';
import { IReview, IRoomDetail } from '../type';
import { getReviews } from '../api';
import useIsOverflow from '../lib/useIsOverflow';
import { useParams } from 'react-router-dom';
interface IRoomReview {
  rating: number;
}
export default function RoomReviews({ rating }: IRoomReview) {
  const { roomPk } = useParams();
  const { isLoading: isReviewsLoading, data: reviews } = useQuery<IReview[]>(
    ['rooms', roomPk, 'reviews'],
    getReviews
  );
  const [reviewRef, isReviewOverflow] = useIsOverflow();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Heading fontSize={'2xl'} mb={0}>
        <Skeleton isLoaded={!isReviewsLoading}>
          <HStack>
            <FaStar /> <Text>{rating?.toFixed(1)}</Text>
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
            <VStack alignItems={'flex-start'} key={index} position={'relative'}>
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
          ))}
        </Grid>
      </Container>
      <Button float={'right'} onClick={onOpen}>
        <FaChevronRight /> 후기 {reviews?.length}개 모두 보기
      </Button>
      <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="36rem">
          <ModalCloseButton />
          <ModalBody mt={0} overflow={'scroll'}>
            <Heading fontSize={'2xl'} py={4} mb={12}>
              <Skeleton isLoaded={!isReviewsLoading}>
                <HStack>
                  <FaStar /> <Text>{rating?.toFixed(1)}</Text>
                  <Text>∙</Text>
                  <Text>
                    {reviews?.length} review{reviews?.length === 1 ? '' : 's'}
                  </Text>
                </HStack>
              </Skeleton>
            </Heading>
            <Container mt={10} maxW="container.lg" marginX="none">
              <VStack>
                {reviews?.map((review, index) => (
                  <VStack
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
                      <Text h="12">{review.payload}</Text>
                    </Skeleton>
                  </VStack>
                ))}
              </VStack>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
