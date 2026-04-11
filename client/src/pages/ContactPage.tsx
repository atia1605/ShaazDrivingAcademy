import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Contact } from "../components/sections/Contact";

export function ContactPage() {
  return (
    <>
      <SubpageBreadcrumb current="Contact" />
      <Contact />
    </>
  );
}
