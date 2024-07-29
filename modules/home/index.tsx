import { HomeWrapper } from '@modules/home/styles';
import { HomeProps } from '@modules/home/types';

export default function Home({ className }: HomeProps) {
  return <HomeWrapper className={className}>Hello Home</HomeWrapper>;
}
