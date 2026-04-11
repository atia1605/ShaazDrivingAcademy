import { HomeCourseCta } from "../components/sections/HomeCourseCta";
import { HomeFaqTeaser } from "../components/sections/HomeFaqTeaser";
import { HomeLocationsStrip } from "../components/sections/HomeLocationsStrip";
import { HomeQuickLinks } from "../components/sections/HomeQuickLinks";
import { HomeG1Resources } from "../components/sections/HomeG1Resources";
import { HomeVideos } from "../components/sections/HomeVideos";
import { Hero } from "../components/sections/Hero";
import { HowItWorks } from "../components/sections/HowItWorks";
import { Testimonials } from "../components/sections/Testimonials";

export function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <HomeCourseCta />
      <HomeQuickLinks />
      <HomeVideos />
      <HomeG1Resources />
      <Testimonials />
      <HomeFaqTeaser />
      <HomeLocationsStrip />
    </>
  );
}
