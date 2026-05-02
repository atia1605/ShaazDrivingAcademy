import { useTranslation } from "react-i18next";
import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { FAQ } from "../components/sections/FAQ";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { SITE } from "../site";

export function FAQPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("meta.faq", { brand: SITE.name }));

  return (
    <>
      <SubpageBreadcrumb current={t("breadcrumbCurrent.faq")} />
      <FAQ />
    </>
  );
}
