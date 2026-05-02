import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IconBook, IconHelp, IconInfo, IconMail, IconMapPin } from "../NavIcons";

export function HomeQuickLinks() {
  const { t } = useTranslation();

  const links = [
    { to: "/about", labelKey: "homeQuickLinks.about", descKey: "homeQuickLinks.aboutDesc", Icon: IconInfo },
    { to: "/courses", labelKey: "homeQuickLinks.courses", descKey: "homeQuickLinks.coursesDesc", Icon: IconBook },
    {
      to: "/locations",
      labelKey: "homeQuickLinks.locations",
      descKey: "homeQuickLinks.locationsDesc",
      Icon: IconMapPin,
    },
    { to: "/faq", labelKey: "homeQuickLinks.faq", descKey: "homeQuickLinks.faqDesc", Icon: IconHelp },
    { to: "/contact", labelKey: "homeQuickLinks.contact", descKey: "homeQuickLinks.contactDesc", Icon: IconMail },
  ] as const;

  return (
    <section className="section section-quicklinks" aria-labelledby="quicklinks-heading">
      <div className="container">
        <h2 id="quicklinks-heading" className="quicklinks-title">
          {t("homeQuickLinks.title")}
        </h2>
        <p className="section-intro">{t("homeQuickLinks.intro")}</p>
        <ul className="quicklinks-grid">
          {links.map(({ to, labelKey, descKey, Icon }) => (
            <li key={to}>
              <Link to={to} className="quicklink-card">
                <span className="quicklink-icon" aria-hidden>
                  <Icon />
                </span>
                <span className="quicklink-label">{t(labelKey)}</span>
                <span className="quicklink-desc">{t(descKey)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
