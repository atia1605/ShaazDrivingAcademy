import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Courses } from "../components/sections/Courses";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { SITE } from "../site";

export function CoursesPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("meta.courses", { brand: SITE.name }));

  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <>
      <SubpageBreadcrumb current={t("breadcrumbCurrent.courses")} />
      <Courses />
    </>
  );
}
