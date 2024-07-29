import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@kami-ui/next-theme';
import { ReactLenis, useLenis } from 'lenis/react';
import Grainy from '@modules/v2/home/grainy';
import { HomeWrapper } from '@modules/v2/home/styles';
import { HomeProps } from '@modules/v2/home/types';
import { theme } from '@modules/v2/theme';

const HomeWrapperWithComponents = ({ children, ...props }: PropsWithChildren<HomeProps>) => (
  <ThemeProvider theme={theme}>
    <Grainy />
    <ReactLenis root options={{ duration: 1 }}>
      <HomeWrapper {...props}>{children}</HomeWrapper>
    </ReactLenis>
  </ThemeProvider>
);

const Home = ({ className }: HomeProps) => {
  useLenis(() => {
    console.log(window.scrollY);
  }, []);
  return (
    <HomeWrapperWithComponents className={className} css={{ height: '200vh' }}>
      hello
    </HomeWrapperWithComponents>
  );
};

export default Home;
