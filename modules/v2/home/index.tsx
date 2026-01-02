import Header from '@components/v2/header';
import SideNav from '@components/v2/side-nav';
import { ThemeProvider } from '@kami-ui/next-theme';
import BlackSection from '@modules/v2/home/black-section';
import Grainy from '@modules/v2/home/grainy';
import HomeHero from '@modules/v2/home/hero';
import { theme } from '@modules/v2/theme';
import { ReactLenis } from 'lenis/react';
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
  const blackSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { innerHeight } = window;
    screenHeightForScroll.current = 0.8 * innerHeight;
  }, []);

  return (
    <HomeWrapperWithComponents>
      <Header />
      <SideNav ref={sideNavRef} />
      <HomeHero ref={homeHeroRef} />
      <BlackSection
        ref={blackSectionRef}
        css={{
          marginTop: 'calc(100svh - var(--header-height))',
          zIndex: 1,
          position: 'relative',
          isolation: 'isolate',
          height: '200vh',
          backgroundColor: 'gray',
        }}
      />
      <div
        css={{
          backgroundColor: 'black',
          height: '100svh',
          position: 'relative',
          zIndex: 2,
          isolation: 'isolate',
        }}
      >
        hello world
      </div>
    </HomeWrapperWithComponents>
  );
};

export default Home;
