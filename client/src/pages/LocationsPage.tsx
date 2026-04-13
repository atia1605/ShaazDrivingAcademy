import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Locations } from "../components/sections/Locations";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function LocationsPage() {
  useDocumentTitle("Driving School Locations | Toronto Danforth & Scarborough | Shaaz Driving Academy");

  return (
    <>
      <SubpageBreadcrumb current="Locations" />
      <Locations />
    </>
  );
}
