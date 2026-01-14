/* eslint-disable camelcase -- BE */
import { CloudinaryAsset, SecureCloudinaryAsset } from '@/types/cloudinary';
import HomeModule from '@modules/v1/home';
import { HomePageProps } from '@modules/v1/home/types';
import cloudinary from 'cloudinary';

const HomePage = ({ imageData }: HomePageProps) => (
  <HomeModule imageData={imageData} />
);

// eslint-disable-next-line react-refresh/only-export-components -- next.js
export const getStaticProps = async () => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });
  let secureData: SecureCloudinaryAsset[] = [];
  try {
    const data = await cloudinary.v2.api.resources({
      type: 'upload',
      prefix: 'photo_portfolio', // add your folder
      max_results: 99,
    });
    secureData = ((data?.resources as CloudinaryAsset[]) ?? []).map(
      ({ public_id, secure_url, height, width, format, bytes }) => ({
        id: public_id,
        url: secure_url,
        blurUrl: secure_url.replace(
          '/upload/',
          '/upload/w_20,h_20,c_fill,e_blur:1000,q_auto/',
        ),
        height,
        width,
        format,
        bytes,
      }),
    );
  } catch {
    //
  }
  return {
    props: {
      imageData: secureData ?? [],
    },
  };
};

export default HomePage;
