import { SubpageBreadcrumb } from "../components/SubpageBreadcrumb";
import { Vehicle } from "../components/sections/Vehicle";

export function VehiclePage() {
  return (
    <>
      <SubpageBreadcrumb current="Vehicle for hire" />
      <Vehicle />
    </>
  );
}
