import { useTranslation } from "react-i18next";
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
import { SITE } from "../site";
import { LessonReportCarousel } from "../components/sections/LessonReportCarousel";
import { TrustHighlightsCarousel } from "../components/sections/TrustHighlightsCarousel";
import { Testimonials } from "../components/sections/Testimonials";

export function Home() {
  const { t } = useTranslation();
  useDocumentTitle(t("meta.home", { brand: SITE.name }));

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
