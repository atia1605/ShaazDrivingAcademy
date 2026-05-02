import { useTranslation } from "react-i18next";
import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { About } from "../components/sections/About";
import { usePageSeo } from "../hooks/usePageSeo";
import { SITE } from "../site";

export function AboutPage() {
  const { t } = useTranslation();
  usePageSeo({
    title: t("meta.about", { brand: SITE.name }),
    description: t("metaDesc.about"),
  });

  return (
    <>
      <SubpageBreadcrumb current={t("breadcrumbCurrent.about")} />
      <About />
    </>
  );
}
