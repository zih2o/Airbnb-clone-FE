import { Center, Grid, Image, Spinner, Wrap } from '@chakra-ui/react';
import Room from '../components/Room';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getRooms } from '../api';
import RoomSkeleton from '../components/RoomSkeleton';
import { Link } from 'react-router-dom';
import { IRoomList, IRoomPage } from '../type';
import { Helmet } from 'react-helmet';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function Home() {
  const {
    isLoading: isRoomsLoading,
    data,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<IRoomPage>(['rooms'], getRooms, {
    getNextPageParam: (lastPage) =>
      lastPage?.nextPage <= lastPage.totalPage ? lastPage?.nextPage : undefined,
  });
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Wrap mt={10} px={20}>
      <Grid
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
        <Helmet>
          <title>Airbnb Clone</title>
        </Helmet>
        {data?.pages?.map((page) =>
          page?.rooms?.map((room, idx) =>
            isRoomsLoading ? (
              <RoomSkeleton />
            ) : (
              <Link to={`rooms/${room.pk}`} key={idx}>
                <Room
                  pk={room.pk}
                  name={room.name}
                  owner={room.owner}
                  is_owner={room.is_owner}
                  photos={room.photos}
                  city={room.city}
                  country={room.country}
                  rating={room.rating}
                  price={room.price}
                  key={idx}
                />
              </Link>
            )
          )
        )}
      </Grid>
      {hasNextPage || isRoomsLoading ? (
        <Center>
          <Spinner ref={ref} />
        </Center>
      ) : null}
    </Wrap>
  );
}
