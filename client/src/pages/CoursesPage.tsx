import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Courses } from "../components/sections/Courses";

export function CoursesPage() {
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
      <SubpageBreadcrumb current="Courses" />
      <Courses />
    </>
  );
}
