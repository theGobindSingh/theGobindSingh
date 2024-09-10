import Header from '@components/v2/header';
import { ThemeProvider } from '@kami-ui/next-theme';
import { FullWidthWrapper } from '@kami-ui/react-components';
import Grainy from '@modules/v2/home/grainy';
import { homeWrapperStyles } from '@modules/v2/home/styles';
import { HomeProps } from '@modules/v2/home/types';
import { theme } from '@modules/v2/theme';
import { ReactLenis, useLenis } from 'lenis/react';
import { PropsWithChildren } from 'react';

const HomeWrapperWithComponents = ({ children, ...props }: PropsWithChildren<HomeProps>) => (
  <ThemeProvider disableOnAmp={false} theme={theme}>
    <Grainy />
    <ReactLenis root options={{ duration: 1 }}>
      <FullWidthWrapper {...props} css={homeWrapperStyles} element="div" containerSize="85%">
        {children}
      </FullWidthWrapper>
    </ReactLenis>
  </ThemeProvider>
);

const Home = ({ className }: HomeProps) => {
  console.log('hello');
  useLenis(() => {
    // console.log(window.scrollY);
  }, []);
  return (
    <HomeWrapperWithComponents className={className} css={{ height: '200vh' }}>
      <Header />
      hello
    </HomeWrapperWithComponents>
  );
};

export default Home;
