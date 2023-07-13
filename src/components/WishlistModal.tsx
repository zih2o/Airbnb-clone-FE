import {
  Box,
  Button,
  Grid,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { ICreateWishlist, IModal, IWishlist } from '../type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createWishlist, getWishlists } from '../api';
import { useForm } from 'react-hook-form';

export default function WishlistModal({ isOpen, onClose }: IModal) {
  const {
    isOpen: isCreationOpen,
    onOpen: onCreationOpen,
    onClose: onCreationClose,
  } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ICreateWishlist>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: wishlists, isLoading: isWishlistsLoading } = useQuery<
    IWishlist[]
  >(['wishlists'], getWishlists);
  const mutation = useMutation(createWishlist, {
    onSuccess: () => {
      toast({
        title: 'Wishlist Upload',
        description: '새 위시리스트가 만들어졌어요!',
        status: 'success',
        position: 'bottom-right',
      });
      queryClient.refetchQueries(['wishlists']);
      onCreationClose();
    },
  });
  console.log(watch('name'), errors);
  const onSubmit = (data: ICreateWishlist) => {
    mutation.mutate(data);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h={'70vh'} overflow={'scroll'}>
          <ModalHeader
            borderBottom={'1px'}
            borderColor={'gray.200'}
            position={'sticky'}
            top="0"
            zIndex={'10'}
            backgroundColor={'white'}
          >
            위시리스트에 담기
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody my="4">
            <Grid templateColumns={'1fr 1fr'} gap={'8'}>
              {wishlists?.map((wishlist) => (
                <Box>
                  <Button
                    h={'48'}
                    w="100%"
                    backgroundColor={'gray.300'}
                    rounded={'lg'}
                    border={'4px'}
                    borderColor={'white'}
                    shadow={'lg'}
                  >
                    <Image
                      src={
                        wishlist.rooms ? wishlist.rooms[0]?.photos[0]?.file : ''
                      }
                    />
                  </Button>
                  <Text alignSelf={'flex-start'} pl="2" fontSize={'lg'}>
                    {wishlist.name}
                  </Text>
                  <Text
                    alignSelf={'flex-start'}
                    pl="2"
                    fontSize={'sm'}
                    color={'gray.500'}
                  >
                    {wishlist.rooms.length ?? 0}개 저장됨
                  </Text>
                </Box>
              ))}
            </Grid>
          </ModalBody>

          <ModalFooter
            position={'sticky'}
            bottom="0"
            backgroundColor={'white'}
            borderTop={'1px'}
            borderColor={'gray.200'}
          >
            <Button onClick={onCreationOpen} colorScheme={'blackAlpha'}>
              새로운 위시리스트 만들기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal size="lg" isOpen={isCreationOpen} onClose={onCreationClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader borderBottom={'1px'} borderColor={'gray.200'}>
            위시리스트 만들기
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody my="4">
            <InputGroup size={'lg'} borderColor={'gray.400'}>
              <InputLeftAddon>이름</InputLeftAddon>
              <Input
                type={'text'}
                {...register('name', {
                  required: 'Name is required',
                  maxLength: 50,
                })}
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter borderTop={'1px'} borderColor={'gray.200'}>
            <Button
              size={'lg'}
              type="submit"
              isDisabled={!!errors.name?.message}
              colorScheme={'blackAlpha'}
            >
              새로 만들기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
