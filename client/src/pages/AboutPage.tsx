import { useTranslation } from "react-i18next";
import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { About } from "../components/sections/About";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { SITE } from "../site";

export function AboutPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("meta.about", { brand: SITE.name }));

  return (
    <>
      <SubpageBreadcrumb current={t("breadcrumbCurrent.about")} />
      <About />
    </>
  );
}
