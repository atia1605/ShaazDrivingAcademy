import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Courses } from "../components/sections/Courses";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function CoursesPage() {
  useDocumentTitle("Driving Courses & Lesson Prices | BDE Toronto & Scarborough | Shaaz Driving Academy");

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
