import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { HomeCourseCta } from "../components/sections/HomeCourseCta";
import { HomeFaqTeaser } from "../components/sections/HomeFaqTeaser";
import { HomeLocationsStrip } from "../components/sections/HomeLocationsStrip";
import { HomeQuickLinks } from "../components/sections/HomeQuickLinks";
import { HomeG1Resources } from "../components/sections/HomeG1Resources";
import { HomeVideos } from "../components/sections/HomeVideos";
import { HomeAreasServed } from "../components/sections/HomeAreasServed";
import { Hero } from "../components/sections/Hero";
import { HowItWorks } from "../components/sections/HowItWorks";
import { LessonReportCarousel } from "../components/sections/LessonReportCarousel";
import { TrustHighlightsCarousel } from "../components/sections/TrustHighlightsCarousel";
import { Testimonials } from "../components/sections/Testimonials";

export function Home() {
  useDocumentTitle(
    "Shaaz Driving Academy | Toronto & Scarborough Driving School — BDE, G1, G2 & G Lessons"
  );

  return (
    <>
      <Hero />
      <HomeAreasServed />
      <HowItWorks />
      <LessonReportCarousel />
      <TrustHighlightsCarousel />
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
