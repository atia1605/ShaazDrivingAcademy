import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { StickyMobileCta } from "./StickyMobileCta";
import { TopBar } from "./TopBar";

export function Layout() {
  return (
    <div className="app-shell">
      <div className="site-head">
        <TopBar />
        <Header />
      </div>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  );
}
