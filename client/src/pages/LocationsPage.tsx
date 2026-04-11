import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Locations } from "../components/sections/Locations";

export function LocationsPage() {
  return (
    <>
      <SubpageBreadcrumb current="Locations" />
      <Locations />
    </>
  );
}
