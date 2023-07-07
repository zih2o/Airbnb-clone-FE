import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Heading,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  HStack,
  Image,
  Box,
  Grid,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '../api';
import { ICreateBookingForm, IRoomDetail } from '../type';
import { useParams } from 'react-router-dom';
import { dashToDot, getDateDiff } from '../lib/utils';
interface IBookingModal {
  data: ICreateBookingForm;
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  room: IRoomDetail;
}
export const BookingConfirmModal = ({
  data: { check_in, check_out, guests },
  isModalOpen,
  onModalClose,
  room,
}: IBookingModal) => {
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const { roomPk } = useParams();
  const [alertMessage, setAlertMessage] = useState<string>();
  const days = getDateDiff(check_in, check_out);
  const mutation = useMutation(createBooking, {
    onSuccess: () => {
      onModalClose();
      setAlertMessage('예약이 완료되었습니다. 즐거운 여행되세요!');
      onAlertOpen();
    },
    onError: () => {
      setAlertMessage('예약 중 문제가 발생했습니다.');
      onAlertOpen();
    },
  });
  const handleBooking = () => {
    if (roomPk) {
      mutation.mutate({ bookingData: { check_in, check_out, guests }, roomPk });
    }
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onModalClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>예약 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid alignItems={'flex-start'} templateColumns={'2fr 1fr'}>
              <VStack
                justifyContent={'space-between'}
                alignItems={'flex-start'}
                gap={2}
              >
                <Stat>
                  <StatLabel>숙소</StatLabel>
                  <StatNumber fontSize={'lg'}>{room?.name}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>날짜</StatLabel>
                  <StatNumber fontSize={'lg'}>
                    {dashToDot(check_in)} - {dashToDot(check_out)}
                    <br />
                    {days}박 {days + 1}일
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>인원</StatLabel>
                  <StatNumber fontSize={'lg'}>{guests}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>결제 금액</StatLabel>
                  <StatNumber>
                    {(room?.price * days).toLocaleString()} 원
                  </StatNumber>
                </Stat>
              </VStack>
              <Box boxSize="10rem" rounded={'sm'} overflow={'hidden'}>
                <Image src={room?.photos[0].file} />
              </Box>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onModalClose} mr={3}>
              취소
            </Button>
            <Button onClick={handleBooking} colorScheme="red">
              예약
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isAlertOpen} onClose={onAlertClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>알림</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{alertMessage}</ModalBody>
          <ModalFooter>
            <Button onClick={onAlertClose} colorScheme="linkedin">
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
