import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { About } from "../components/sections/About";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function AboutPage() {
  useDocumentTitle("About Shaaz Driving Academy | MTO-Approved GTA Driving School");

  return (
    <>
      <SubpageBreadcrumb current="About" />
      <About />
    </>
  );
}
