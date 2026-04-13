import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { FAQ } from "../components/sections/FAQ";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function FAQPage() {
  useDocumentTitle("FAQ | Road Tests, G1, BDE & Payments | Shaaz Driving Academy");

  return (
    <>
      <SubpageBreadcrumb current="FAQ" />
      <FAQ />
    </>
  );
}
