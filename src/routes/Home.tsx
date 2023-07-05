import { Grid, Image } from '@chakra-ui/react';
import Room from '../components/Room';
import { useQuery } from '@tanstack/react-query';
import { getRooms } from '../api';
import RoomSkeleton from '../components/RoomSkeleton';
import { Link } from 'react-router-dom';
import { IRoomList } from '../type';

export default function Home() {
  const { isLoading, data: rooms } = useQuery<IRoomList[]>(['rooms'], getRooms);
  const svgString =
    "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><circle cx='50' cy='50' r='40' /></svg>";

  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;
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
        <Link to={`rooms/${room.pk}`} key={idx}>
          <Room
            pk={room.pk}
            name={room.name}
            is_owner={room.is_owner}
            photos={room.photos}
            city={room.city}
            country={room.country}
            rating={room.rating}
            price={room.price}
            key={idx}
          />
        </Link>
      ))}
    </Grid>
  );
}
