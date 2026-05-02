import { useTranslation } from "react-i18next";
import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Contact } from "../components/sections/Contact";
import { usePageSeo } from "../hooks/usePageSeo";
import { SITE } from "../site";

export function ContactPage() {
  const { t } = useTranslation();
  usePageSeo({
    title: t("meta.contact", { brand: SITE.name }),
    description: t("metaDesc.contact"),
  });

  return (
    <>
      <SubpageBreadcrumb current={t("breadcrumbCurrent.contact")} />
      <Contact />
    </>
  );
}
