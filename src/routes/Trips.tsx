import React from 'react';
import ProtectedPage from '../components/ProtectedPage';
import { Container, Heading } from '@chakra-ui/react';

export default function Trips() {
  return (
    <ProtectedPage>
      <Container>
        <Heading>여행</Heading>
      </Container>
    </ProtectedPage>
  );
}
