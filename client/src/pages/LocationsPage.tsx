import { useTranslation } from "react-i18next";
import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Locations } from "../components/sections/Locations";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { SITE } from "../site";

export function LocationsPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("meta.locations", { brand: SITE.name }));

  return (
    <>
      <SubpageBreadcrumb current={t("breadcrumbCurrent.locations")} />
      <Locations />
    </>
  );
}
