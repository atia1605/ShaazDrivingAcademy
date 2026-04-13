import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Vehicle } from "../components/sections/Vehicle";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function VehiclePage() {
  useDocumentTitle("Vehicle for Hire (PTC) Program | Shaaz Driving Academy");

  return (
    <>
      <SubpageBreadcrumb current="Vehicle for hire" />
      <Vehicle />
    </>
  );
}
