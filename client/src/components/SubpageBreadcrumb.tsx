import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type Props = {
  /** Segment after Home / */
  current: string;
};

export function SubpageBreadcrumb({ current }: Props) {
  const { t } = useTranslation();

  return (
    <div className="subpage-breadcrumb">
      <div className="container">
        <nav className="breadcrumb" aria-label={t("breadcrumb.label")}>
          <Link to="/">{t("breadcrumb.home")}</Link>
          <span className="breadcrumb-sep" aria-hidden>
            /
          </span>
          <span>{current}</span>
        </nav>
      </div>
    </div>
  );
}
