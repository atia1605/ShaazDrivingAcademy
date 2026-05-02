import { useTranslation } from "react-i18next";
import { FaqJsonLd } from "../components/FaqJsonLd";
import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { FAQ } from "../components/sections/FAQ";
import { usePageSeo } from "../hooks/usePageSeo";
import { SITE } from "../site";

export function FAQPage() {
  const { t } = useTranslation();
  usePageSeo({
    title: t("meta.faq", { brand: SITE.name }),
    description: t("metaDesc.faq"),
  });

  return (
    <>
      <FaqJsonLd />
      <SubpageBreadcrumb current={t("breadcrumbCurrent.faq")} />
      <FAQ />
    </>
  );
}
