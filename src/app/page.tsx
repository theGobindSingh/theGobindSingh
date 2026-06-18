import HomeHero from "@/app/home/hero";
import ThemeToggle from "@components/theme-toggle";

const HomePage = () => {
  return (
    <main className="relative h-[200vh]">
      <HomeHero />
      <ThemeToggle />
    </main>
  );
};

export default HomePage;
