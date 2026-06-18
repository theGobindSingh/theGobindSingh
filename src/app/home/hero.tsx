import FullWidthWrapper from "@components/full-width-wrapper";

const HomeHero = () => {
  return (
    <FullWidthWrapper element="section">
      <h1 className="text-4xl font-bold">Welcome to my portfolio</h1>
      <p className="mt-4 text-lg">
        I am a software developer specializing in building exceptional digital
        experiences. Currently, I am focused on building responsive full-stack
        web applications.
      </p>
    </FullWidthWrapper>
  );
};

export default HomeHero;
