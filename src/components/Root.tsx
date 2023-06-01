import { Outlet } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FaAirbnb, FaMoon, FaUser, FaLock } from 'react-icons/fa';

export default function Root() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <HStack
        justifyContent={'space-between'}
        px={10}
        py={5}
        borderBottomWidth={1}
      >
        <Box color={'red.500'} fontSize={'4xl'}>
          <FaAirbnb />
        </Box>
        <HStack spacing={5}>
          <IconButton
            variant={'ghost'}
            icon={<FaMoon />}
            aria-label="Toggle dark mode"
          />
          <Button onClick={onOpen}>Log in</Button>
          <Button colorScheme={'red'}>Sign up</Button>
        </HStack>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottomWidth={1}>Log in</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color={'gray.500'}>
                      <FaUser />
                    </Box>
                  }
                />
                <Input placeholder="Username" variant={'filled'} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Box color={'gray.500'}>
                      <FaLock />
                    </Box>
                  }
                />
                <Input placeholder="Password" variant={'filled'} />
              </InputGroup>
            </VStack>
            <Button mt={4} colorScheme="red" w={'100%'}>
              Log in
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Outlet />
    </Box>
  );
}
