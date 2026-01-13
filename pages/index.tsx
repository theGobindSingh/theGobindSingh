import HomeModule from '@modules/v1/home';
import { HomePageProps } from '@modules/v1/home/types';
import axios from 'axios';

const HomePage = ({ imageData }: HomePageProps) => (
  <HomeModule imageData={imageData} />
);

export const getStaticProps = async () => {
  const { data } = await axios.get(`${process.env.BASE_URL}/api/images`);
  return {
    props: {
      imageData: data?.data ?? [],
    },
  };
};

export default HomePage;
