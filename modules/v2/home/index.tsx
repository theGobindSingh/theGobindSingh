import Header from '@components/v2/header';
import SideNav from '@components/v2/side-nav';
import { ThemeProvider } from '@kami-ui/next-theme';
import Grainy from '@modules/v2/home/grainy';
import HomeHero from '@modules/v2/home/hero';
import { theme } from '@modules/v2/theme';
import { ReactLenis, useLenis } from 'lenis/react';
import { PropsWithChildren, useEffect, useRef } from 'react';

const HomeWrapperWithComponents = ({
  children,
}: PropsWithChildren<unknown>) => (
  <ThemeProvider theme={theme}>
    <Grainy />
    <ReactLenis root options={{ duration: 1 }}>
      {children}
    </ReactLenis>
  </ThemeProvider>
);

const Home = () => {
  const screenHeightForScroll = useRef<number>(900);
  const sideNavRef = useRef<HTMLDivElement>(null);
  const homeHeroRef = useRef<HTMLDivElement>(null);

  useLenis(() => {
    // const scrollPosition = window.scrollY;
    // const screenHeight = screenHeightForScroll.current;
    // const percentFoldScrolled = Math.max(Math.min((scrollPosition * 100) / screenHeight, 100), 0);
    // const reversePercentFoldScrolled = 100 - percentFoldScrolled / 5;
    // if (scrollPosition > 50) {
    //   sideNavRef.current?.classList.remove('display-none');
    // } else {
    //   sideNavRef.current?.classList.add('display-none');
    // }
    // if (scrollPosition > screenHeight) {
    //   sideNavRef.current?.querySelector('.ham-wrapper')?.classList.add('visible');
    // } else {
    //   sideNavRef.current?.querySelector('.ham-wrapper')?.classList.remove('visible');
    // }
    // homeHeroRef.current?.style.setProperty(
    //   'transform',
    //   `scale(${reversePercentFoldScrolled}%) translateY(${percentFoldScrolled}%)`,
    // );
    // homeHeroRef.current?.style.setProperty('opacity', `${reversePercentFoldScrolled}%`);
  }, []);
  useEffect(() => {
    const { innerHeight } = window;
    screenHeightForScroll.current = 0.8 * innerHeight;
  }, []);
  return (
    <HomeWrapperWithComponents>
      <Header />
      <SideNav ref={sideNavRef} />
      <HomeHero ref={homeHeroRef} />
      <div
        css={{
          height: '200vh',
          backgroundColor: 'rgba(123,234.321,0.75)',
          marginTop: 'calc(100svh - var(--header-height))',
          zIndex: 1,
          position: 'relative',
          isolation: 'isolate',
        }}
      />
    </HomeWrapperWithComponents>
  );
};

export default Home;
