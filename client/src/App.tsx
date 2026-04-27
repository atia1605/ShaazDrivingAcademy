import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { CoursesPage } from "./pages/CoursesPage";
import { FAQPage } from "./pages/FAQPage";
import { Home } from "./pages/Home";
import { LocationsPage } from "./pages/LocationsPage";
import { Pay } from "./pages/Pay";
import { PaySuccess } from "./pages/PaySuccess";
import { Register } from "./pages/Register";
import { VehiclePage } from "./pages/VehiclePage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="vehicle" element={<VehiclePage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="register" element={<Register />} />
          <Route path="pay" element={<Pay />} />
          <Route path="pay/success" element={<PaySuccess />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
