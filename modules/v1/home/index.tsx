import Header from '@components/v1/header';
import SideEasyAccess from '@components/v1/side-easy-access';
import { ThemeProvider } from '@kami-ui/next-theme';
import HomeAboutSection from '@modules/v1/home/about';
import HomeContactSection from '@modules/v1/home/contact';
import HomeExperienceSection from '@modules/v1/home/experience';
import HomeExtracurricularSection from '@modules/v1/home/extra';
import HomeHeroSection from '@modules/v1/home/hero';
import { HomePageProps } from '@modules/v1/home/types';
import { theme } from '@modules/v1/theme';
import { ReactLenis } from 'lenis/react';
import { PropsWithChildren } from 'react';

const HomeWrapperWithComponents = ({
  children,
}: PropsWithChildren<unknown>) => (
  <ThemeProvider theme={theme}>
    <ReactLenis root options={{ duration: 1 }}>
      <main>{children}</main>
    </ReactLenis>
  </ThemeProvider>
);

const HomeModule = ({ imageData }: HomePageProps) => (
  <HomeWrapperWithComponents>
    <Header />
    <SideEasyAccess />
    <HomeHeroSection />
    <HomeAboutSection />
    <HomeExperienceSection />
    <HomeExtracurricularSection imageData={imageData} />
    <HomeContactSection />
  </HomeWrapperWithComponents>
);

export default HomeModule;
