import Header from '@components/v1/header';
import SectionWrapper from '@components/v1/section-wrapper';
import SideEasyAccess from '@components/v1/side-easy-access';
import { ThemeProvider } from '@kami-ui/next-theme';
import { theme } from '@modules/v1/theme';
import { ReactLenis } from 'lenis/react';
import { PropsWithChildren } from 'react';

const HomeWrapperWithComponents = ({
  children,
}: PropsWithChildren<unknown>) => (
  <ThemeProvider theme={theme}>
    <ReactLenis root options={{ duration: 1 }}>
      {children}
    </ReactLenis>
  </ThemeProvider>
);

const HomeModule = () => {
  const a = '';
  return (
    <HomeWrapperWithComponents>
      {/* <div
        className="backdrop"
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backdropFilter: 'blur(8px)',
          zIndex: 99,
        }}
      /> */}
      <Header />
      <SideEasyAccess />
      {Array.from({ length: 5 }).map((_, index) => (
        <SectionWrapper key={index}>
          Section {index + 1} - {a}
        </SectionWrapper>
      ))}
    </HomeWrapperWithComponents>
  );
};

export default HomeModule;
