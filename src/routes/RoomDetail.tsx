import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { checkBooking, createBooking, getReviews, getRoom } from '../api';
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  Wrap,
  useDisclosure,
} from '@chakra-ui/react';
import {
  ICreateBookingForm,
  IReview,
  IReviewsPage,
  IRoomDetail,
  Value,
} from '../type';
import { FaChevronRight, FaStar } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../calendar.css';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { BookingConfirmModal } from '../components/BookingConfirmModal';
import { formatDate } from '../lib/utils';
import useIsOverflow from '../lib/useIsOverflow';
import RoomReviews from '../components/RoomReviews';
import AmenitySVG from '../components/AmenitySVG';

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data: room } = useQuery<IRoomDetail>(
    ['rooms', roomPk],
    getRoom
  );

  const [dates, setDates] = useState<Value>(new Date());
  const { register, watch } = useForm<ICreateBookingForm>();
  const {
    isOpen: isBookingOpen,
    onOpen: onBookingOpen,
    onClose: onBookingClose,
  } = useDisclosure();
  const {
    isOpen: isDscOpen,
    onOpen: onDscOpen,
    onClose: onDscClose,
  } = useDisclosure();
  const [ref, isOverflow] = useIsOverflow();
  const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
    ['check', roomPk, dates],
    checkBooking,
    {
      cacheTime: 0,
      enabled: dates !== undefined,
    }
  );
  return (
    <Box w="auto"h="auto" mt={10} px={{ base: '10', lg: '48' }} zIndex={"1"} >
      <Helmet>
        <title>{room ? room.name : 'Loading...'}</title>
      </Helmet>
      <Skeleton h={10} w={'100%'} isLoaded={!isLoading}>
        <HStack>
          <Heading fontSize={'3xl'}>{room?.name}</Heading>
          {room?.is_owner ? (
            <Link to={`edit`}>
              <Button colorScheme={'red'}>Edit</Button>
            </Link>
          ) : null}
        </HStack>
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
      <Grid templateColumns={'2fr 1fr'} gap={10} >
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
          <Text
            ref={ref}
            position={'relative'}
            whiteSpace={'break-spaces'}
            h="72"
            overflow={'clip'}
            backgroundColor={'rgba(224, 224, 224, 0.2)'}
            rounded={'xl'}
            p="8"
            my="10"
          >
            {room?.description}
            {isOverflow ? (
              <Button
                onClick={onDscOpen}
                position={'absolute'}
                bottom={4}
                right={4}
                colorScheme={'blackAlpha'}
              >
                <FaChevronRight />더 보기
              </Button>
            ) : null}
          </Text>
          <Modal size={'xl'} isOpen={isDscOpen} onClose={onDscClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>숙소 안내</ModalHeader>
              <ModalCloseButton />

              <ModalBody overflow={'scroll'} whiteSpace={'break-spaces'}>
                {room?.description}
              </ModalBody>
            </ModalContent>
          </Modal>

          <Divider />
          <Heading fontSize={'3xl'} my={'10'}>
            숙소 편의시설
          </Heading>
          <Grid templateColumns={'1fr 1fr'}>
            {room?.amenities?.map((amenity, idx) => {
              return (
                <HStack key={idx} mb={'4'} alignItems={'center'}>
                  <AmenitySVG path={amenity.icon_image} />
                  <Text fontSize={'xl'} textAlign={'center'}>
                    {amenity.name}
                  </Text>
                </HStack>
              );
            })}
          </Grid>
          <Divider my={10} />
          <RoomReviews rating={room?.rating ?? 0} />
        </Box>
        <Box w="auto" h="70vh" mt={5} position={"sticky"} top={"24"}>
          <Calendar
            onChange={setDates}
            value={dates}
            prev2Label={null}
            next2Label={null}
            minDetail="month"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 12 * 1000)}
            selectRange
            formatDay={(locale, date) => date.getDate().toString()}
          />
          <VStack
            mt="4"
            py="4"
            
            rounded={'xl'}
            shadow={'xl'}
            backgroundColor={'rgba(224, 224, 224, 0.2)'}
            gap={'0'}
          >
            <HStack justifyContent={'space-between'} w="100%" py="4">
              <HStack>
                <Heading fontSize={'2xl'} ml="4">
                  ₩ {room?.price.toLocaleString()}
                </Heading>
                <Text>/ 박</Text>
              </HStack>
              <HStack pr="4">
                <FaStar />{' '}
                <Text as="b" fontSize={'lg'}>
                  {room?.rating ?? 0}
                </Text>
              </HStack>
            </HStack>
            <Divider />
            <HStack w="100%" h={'14'}>
              <Stat w="50%" h="100%" ml="4">
                <StatLabel>체크인</StatLabel>
                <StatNumber
                  {...register('check_in', { required: true })}
                  fontSize={'lg'}
                  textAlign={'center'}
                >
                  {checkBookingData?.check_in}
                </StatNumber>
              </Stat>
              <Divider orientation="vertical" h="100%" />
              <Stat w="50%" h="100%" ml="4">
                <StatLabel>체크아웃</StatLabel>
                <StatNumber
                  {...register('check_out', { required: true })}
                  fontSize={'lg'}
                  textAlign={'center'}
                >
                  {checkBookingData?.check_out}
                </StatNumber>
              </Stat>
            </HStack>
            <Divider />
            <Stat w="100%" px="4">
              <StatLabel mb="2">게스트 인원</StatLabel>
              <NumberInput defaultValue={1} max={100} min={1}>
                <NumberInputField {...register('guests')} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Stat>
          </VStack>
          <Button
            onClick={onBookingOpen}
            isDisabled={!checkBookingData?.ok}
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
      <BookingConfirmModal
        data={{
          guests: watch('guests'),
          check_in: checkBookingData?.check_in ?? formatDate(new Date()),
          check_out: checkBookingData?.check_out ?? formatDate(new Date()),
        }}
        isModalOpen={isBookingOpen}
        onModalOpen={onBookingOpen}
        onModalClose={onBookingClose}
        room={room!}
      />
    </Box>
  );
}
