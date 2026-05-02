import { useTranslation } from "react-i18next";

export function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      title: t("howItWorks.step1Title"),
      text: t("howItWorks.step1Text"),
    },
    {
      title: t("howItWorks.step2Title"),
      text: t("howItWorks.step2Text"),
    },
    {
      title: t("howItWorks.step3Title"),
      text: t("howItWorks.step3Text"),
    },
  ];

  return (
    <section className="section section-how" aria-labelledby="how-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="how-heading">{t("howItWorks.title")}</h2>
          <p className="section-intro">{t("howItWorks.intro")}</p>
        </div>
        <ol className="how-grid">
          {steps.map((s, i) => (
            <li key={s.title} className="how-card">
              <span className="how-step" aria-hidden>
                {i + 1}
              </span>
              <div className="how-card-content">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
