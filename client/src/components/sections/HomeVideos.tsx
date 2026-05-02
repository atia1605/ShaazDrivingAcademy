import { useTranslation } from "react-i18next";
import { SITE } from "../../site";

type VideoItem = {
  youtubeId: string;
  title: string;
  caption: string;
  tag: string;
};

export function HomeVideos() {
  const { t } = useTranslation();
  const videos = t("content.youtubeVideos", { returnObjects: true }) as VideoItem[];

  return (
    <section className="section section-home-videos" aria-labelledby="home-videos-heading">
      <div className="container">
        <h2 id="home-videos-heading">{t("content.homeVideos.h2")}</h2>
        <p className="section-intro home-videos-intro">
          {t("content.homeVideos.introBefore")}{" "}
          <a href="https://www.ontario.ca/document/official-mto-drivers-handbook" target="_blank" rel="noopener noreferrer">
            {t("content.homeVideos.handbook")}
          </a>{" "}
          {t("content.homeVideos.introMid")}{" "}
          <a href="https://www.drivetest.ca" target="_blank" rel="noopener noreferrer">
            DriveTest
          </a>{" "}
          {t("content.homeVideos.introAfter")}
        </p>
        <p className="home-videos-disclaimer muted small">{t("content.homeVideos.disclaimer", { brand: SITE.name })}</p>
        <div className="home-videos-grid">
          {videos.map((v) => (
            <article key={v.youtubeId} className="home-video-card">
              <p className="home-video-tag">{v.tag}</p>
              <h3 className="home-video-title">{v.title}</h3>
              <p className="home-video-caption">{v.caption}</p>
              <div className="home-video-embed">
                <iframe
                  title={v.title}
                  src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?rel=0`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
