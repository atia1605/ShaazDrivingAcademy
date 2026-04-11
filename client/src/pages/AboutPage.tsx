import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { About } from "../components/sections/About";

export function AboutPage() {
  return (
    <>
      <SubpageBreadcrumb current="About" />
      <About />
    </>
  );
}
