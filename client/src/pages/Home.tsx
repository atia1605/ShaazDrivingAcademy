import { HomeQuickLinks } from "../components/sections/HomeQuickLinks";
import { Hero } from "../components/sections/Hero";
import { HowItWorks } from "../components/sections/HowItWorks";
import { Testimonials } from "../components/sections/Testimonials";

export function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <HomeQuickLinks />
      <Testimonials />
    </>
  );
}
