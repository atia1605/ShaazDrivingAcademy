import { useTranslation } from "react-i18next";
import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Locations } from "../components/sections/Locations";
import { usePageSeo } from "../hooks/usePageSeo";
import { SITE } from "../site";

export function LocationsPage() {
  const { t } = useTranslation();
  usePageSeo({
    title: t("meta.locations", { brand: SITE.name }),
    description: t("metaDesc.locations"),
  });

  return (
    <>
      <SubpageBreadcrumb current={t("breadcrumbCurrent.locations")} />
      <Locations />
    </>
  );
}
