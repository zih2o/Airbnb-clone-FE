import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FaBed, FaMoneyBill, FaToilet } from 'react-icons/fa';
import ProtectedPage from '../components/ProtectedPage';
import HostOnlyPage from '../components/HostOnlyPage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAmenities, getCategories, uploadRoom } from '../api';
import { IAmenity, ICategory, IUploadRoomVariables } from '../type';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { AmenityKind } from '../lib/amenityKind';

export default function UploadRoom() {
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(['amenities'], getAmenities);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >(['categories'], getCategories);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IUploadRoomVariables>();

  const toast = useToast();

  const mutation = useMutation(uploadRoom, {
    onSuccess: (data) => {
      reset();
      toast({
        title: 'Upload room',
        description: '방이 성공적으로 업로드 되었어요!',
        status: 'success',
        position: 'bottom-right',
      });
    },
    onError: () => {
      toast({
        title: 'Upload room',
        description: '문제가 생겼어요...',
        status: 'error',
        position: 'bottom-right',
      });
    },
  });

  const onSubmit = (data: IUploadRoomVariables) => {
    mutation.mutate(data);
  };

  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Helmet>
          <title>Upload Room</title>
        </Helmet>
        <Box
          pb={40}
          mt={10}
          px={{
            base: 10,
            lg: 40,
          }}
        >
          <Container>
            <Heading textAlign={'center'}>Upload Room</Heading>
            <VStack
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              spacing={5}
              mt={5}
            >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register('name', { required: true })}
                  isInvalid={!!errors.name?.message}
                  required
                  type="text"
                />
                <FormHelperText>Write the name of your room.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  {...register('country', { required: true })}
                  isInvalid={!!errors.country?.message}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  {...register('city', { required: true })}
                  isInvalid={!!errors.city?.message}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  {...register('address', { required: true })}
                  isInvalid={!!errors.address?.message}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaMoneyBill />} />
                  <Input
                    {...register('price', { required: true })}
                    isInvalid={!!errors.price?.message}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input
                    {...register('rooms', { required: true })}
                    isInvalid={!!errors.rooms?.message}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaToilet />} />
                  <Input
                    {...register('toilets', { required: true })}
                    isInvalid={!!errors.toilets?.message}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register('description', { required: true })}
                  isInvalid={!!errors.name?.message}
                />
              </FormControl>
              <FormControl>
                <Checkbox {...register('pet_friendly')}>Pet friendly?</Checkbox>
              </FormControl>
              <FormControl>
                <FormLabel>Kind of room</FormLabel>
                <Select
                  {...register('kind', { required: true })}
                  isInvalid={!!errors.kind?.message}
                  placeholder="Choose a kind"
                >
                  <option value="entire_place">Entire Place</option>
                  <option value="private_room">Private Room</option>
                  <option value="shared_room">Shared Room</option>
                </Select>
                <FormHelperText>
                  What kind of room are you renting?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <FormHelperText>
                  Which keyword describe your room best?
                </FormHelperText>
                <Select
                  {...register('category', { required: true })}
                  isInvalid={!!errors.name?.message}
                  placeholder="Choose a category"
                >
                  {categories?.map((category) => (
                    <option key={category.pk} value={category.pk}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Amenities</FormLabel>
                <VStack alignItems={'flex-start'}>
                  <Accordion allowToggle w={'100%'}>
                    {AmenityKind.map((kind, idx) => (
                      <AccordionItem key={idx}>
                        <AccordionButton key={idx + 1} pb={'2'} w={'100%'}>
                          <HStack justifyContent={'space-between'} w={'100%'}>
                            <Heading fontSize={'sm'}>{kind[1]}</Heading>
                            <AccordionIcon />
                          </HStack>
                        </AccordionButton>
                        <Grid key={idx + 2} templateColumns={'1fr 1fr'}>
                          {amenities
                            ?.filter((amenity) => amenity.kind === kind[0])
                            .map((amenity) => (
                              <AccordionPanel key={amenity.pk}>
                                <Checkbox
                                  {...register('amenities', { required: true })}
                                  value={amenity.pk}
                                >
                                  {amenity.name}
                                </Checkbox>
                                {amenity.description !== '' ? (
                                  <FormHelperText>
                                    {amenity.description}
                                  </FormHelperText>
                                ) : null}
                              </AccordionPanel>
                            ))}
                        </Grid>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </VStack>
              </FormControl>
              <Button
                isLoading={mutation.isLoading}
                type="submit"
                colorScheme={'red'}
                size="lg"
                w="100%"
              >
                Upload Room
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
