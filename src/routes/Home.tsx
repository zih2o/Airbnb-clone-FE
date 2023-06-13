import { Grid } from '@chakra-ui/react';
import Room from '../components/Room';
import { useQuery } from '@tanstack/react-query';
import { getRooms } from '../api';
import RoomSkeleton from '../components/RoomSkeleton';

interface IPhoto {
  pk: string;
  file: string;
  description: string;
}

interface IRoom {
  pk: string;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IPhoto[];
}

export default function Home() {
  const { isLoading, data: rooms } = useQuery<IRoom[]>(['rooms'], getRooms);
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
      {isLoading ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : null}
      {rooms?.map((room, idx) => (
        <Room
          imageUrl={room.photos[0].file}
          city={room.city}
          country={room.country}
          rating={room.rating}
          price={room.price}
          key={idx}
        />
      ))}
    </Grid>
  );
}
