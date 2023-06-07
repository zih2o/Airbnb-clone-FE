import { Grid } from '@chakra-ui/react';
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
      {[
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 22, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 22,
      ].map((index) => (
        <Room />
      ))}
    </Grid>
  );
}
