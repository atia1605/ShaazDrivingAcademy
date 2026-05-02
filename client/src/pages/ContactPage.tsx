import { useTranslation } from "react-i18next";
import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Contact } from "../components/sections/Contact";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { SITE } from "../site";

export function ContactPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("meta.contact", { brand: SITE.name }));

  return (
    <>
      <SubpageBreadcrumb current={t("breadcrumbCurrent.contact")} />
      <Contact />
    </>
  );
}
