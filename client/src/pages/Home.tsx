import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Courses } from "../components/sections/Courses";
import { FAQ } from "../components/sections/FAQ";
import { HowItWorks } from "../components/sections/HowItWorks";
import { Hero } from "../components/sections/Hero";
import { Locations } from "../components/sections/Locations";
import { Testimonials } from "../components/sections/Testimonials";
import { Vehicle } from "../components/sections/Vehicle";

export function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <About />
      <Courses />
      <Locations />
      <Vehicle />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
