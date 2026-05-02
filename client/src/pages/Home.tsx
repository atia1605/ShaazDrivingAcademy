import { useTranslation } from "react-i18next";
import { usePageSeo } from "../hooks/usePageSeo";
import { HomeCourseCta } from "../components/sections/HomeCourseCta";
import { HomeFaqTeaser } from "../components/sections/HomeFaqTeaser";
import { HomeLocationsStrip } from "../components/sections/HomeLocationsStrip";
import { HomeQuickLinks } from "../components/sections/HomeQuickLinks";
import { HomeG1Resources } from "../components/sections/HomeG1Resources";
import { HomeVideos } from "../components/sections/HomeVideos";
import { HomeAreasServed } from "../components/sections/HomeAreasServed";
import { GradDiscountBanner } from "../components/GradDiscountBanner";
import { Hero } from "../components/sections/Hero";
import { HowItWorks } from "../components/sections/HowItWorks";
import { SITE } from "../site";
import { LessonReportCarousel } from "../components/sections/LessonReportCarousel";
import { TrustHighlightsCarousel } from "../components/sections/TrustHighlightsCarousel";
import { Testimonials } from "../components/sections/Testimonials";

export function Home() {
  const { t } = useTranslation();
  usePageSeo({
    title: t("meta.home", { brand: SITE.name }),
    description: t("metaDesc.home"),
  });

  return (
    <>
      <Hero />
      <GradDiscountBanner />
      <HomeAreasServed />
      <GradDiscountBanner />
      <HowItWorks />
      <GradDiscountBanner />
      <LessonReportCarousel />
      <GradDiscountBanner />
      <TrustHighlightsCarousel />
      <GradDiscountBanner />
      <HomeCourseCta />
      <GradDiscountBanner />
      <HomeQuickLinks />
      <GradDiscountBanner />
      <HomeVideos />
      <GradDiscountBanner />
      <HomeG1Resources />
      <GradDiscountBanner />
      <Testimonials />
      <GradDiscountBanner />
      <HomeFaqTeaser />
      <GradDiscountBanner />
      <HomeLocationsStrip />
      <GradDiscountBanner />
    </>
  );
}
