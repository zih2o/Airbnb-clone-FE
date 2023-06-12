import { Box, Grid, HStack, Skeleton } from '@chakra-ui/react';
import Room from '../components/Room';

interface IPhoto {
  pk: string;
  file: string;
  description: string;
}

interface IRoom {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IPhoto[];
}

export default function Home() {
  return (
    <Grid
      mt={10}
      px={20}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: '1fr',
        md: '1fr 1fr',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
        '2xl': 'repeat(5, 1fr)',
      }}
    >
      <Box>
        <Skeleton rounded="lg" height={300} mb={5} />
        <HStack justifyContent={'space-between'} mb={3}>
          <Skeleton h={4} rounded={'lg'} w={'60%'} />
          <Skeleton h={4} rounded={'lg'} w={'15%'} />
        </HStack>
        <Skeleton h={3} w={'70%'} rounded={'lg'} mb={1} />
        <Skeleton h={3} w={'50%'} rounded={'lg'} mb={4} />
        <Skeleton h={4} w={'30%'} rounded={'lg'} />
      </Box>
      <Room />
    </Grid>
  );
}
