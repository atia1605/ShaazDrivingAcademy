import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Contact } from "../components/sections/Contact";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function ContactPage() {
  useDocumentTitle("Contact Shaaz Driving Academy | Phone, Email & GTA Locations");

  return (
    <>
      <SubpageBreadcrumb current="Contact" />
      <Contact />
    </>
  );
}
