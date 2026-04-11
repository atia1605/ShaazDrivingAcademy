import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { FAQ } from "../components/sections/FAQ";

export function FAQPage() {
  return (
    <>
      <SubpageBreadcrumb current="FAQ" />
      <FAQ />
    </>
  );
}
