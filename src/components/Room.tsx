import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaCamera, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { IAddToWishlist, IRoomList, IRoomPage } from '../type';
import { useNavigate } from 'react-router-dom';
import WishlistModal from './WishlistModal';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { addToWishlist } from '../api';

export default function Room({
  pk,
  photos,
  city,
  country,
  is_owner,
  rating,
  price,
  owner,
  is_liked,
}: IRoomList) {
  const gray = useColorModeValue('gray.600', 'gray.300');
  const navigate = useNavigate();
  const {
    isOpen: isLikeOpen,
    onClose: onLikeClose,
    onOpen: onLikeOpen,
  } = useDisclosure();
  const queryClient = useQueryClient();
  const likeMutation = useMutation(addToWishlist, {
    onMutate: async ({ roomPk, wishlistPk }: IAddToWishlist) => {
      await queryClient.cancelQueries({ queryKey: ['rooms'] });
      const previousData = queryClient.getQueryData(['rooms']);
      queryClient.setQueryData<InfiniteData<IRoomPage>>(
        ['rooms'],
        (oldData) => ({
          pageParams: oldData?.pageParams ?? [],
          pages:
            oldData?.pages.map((page) => ({
              ...page,
              rooms: page.rooms.map((room) => {
                if (room.pk === roomPk) {
                  return { ...room, is_liked: !room.is_liked };
                }
                return room;
              }),
            })) ?? [],
        })
      );
      return { previousData };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['rooms'], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
  const onLikeClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    is_liked
      ? likeMutation.mutate({ roomPk: pk, wishlistPk: 'unlike' })
      : onLikeOpen();
  };
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`rooms/${pk}/photos`);
  };
  return (
    <VStack alignItems={'flex-start'}>
      <Box
        position={'relative'}
        overflow={'hidden'}
        rounded={'xl'}
        w="100%"
        mb={3}
      >
        {photos[0] ? (
          <Image minH="300" src={photos[0].file} />
        ) : (
          <Box minH="300" h="100%" w="100%" p={10} bg="green.400" />
        )}
        <Button
          onClick={is_owner ? onCameraClick : onLikeClick}
          variant={'unstyled'}
          position={'absolute'}
          top={2}
          right={1}
          color={'gray.100'}
        >
          {is_owner ? (
            <FaCamera size={25} />
          ) : is_liked ? (
            <FaHeart size={25} color="red" />
          ) : (
            <FaRegHeart size={25} />
          )}
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
          호스트: {owner.name} 님
        </Text>
        <Text fontSize={'sm'} color={gray}>
          11월 18일 ~ 11월 30일
        </Text>
      </Box>
      <Text>
        <Text as={'b'}>₩ {price}</Text> /박
      </Text>
      <WishlistModal isOpen={isLikeOpen} onClose={onLikeClose} roomPk={pk} />
    </VStack>
  );
}
