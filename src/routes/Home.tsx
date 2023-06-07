import { Box, Grid, Skeleton, SkeletonText } from '@chakra-ui/react';
import Room from '../components/Room';

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
        <Skeleton rounded={'xl'} height={300} mb={7} />
        <SkeletonText skeletonHeight={3} w={'70%'} mb={4} />
        <SkeletonText skeletonHeight={3} w={'30%'} noOfLines={1} />
      </Box>
      <Room />
    </Grid>
  );
}
