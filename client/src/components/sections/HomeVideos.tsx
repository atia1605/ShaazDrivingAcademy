import { homeYoutubeVideos } from "../../data/content";

export function HomeVideos() {
  return (
    <section className="section section-home-videos" aria-labelledby="home-videos-heading">
      <div className="container">
        <h2 id="home-videos-heading">Videos — G1, G2 &amp; G</h2>
        <p className="section-intro home-videos-intro">
          Independent YouTube explainers on Ontario’s graduated licensing, written test prep, and how the levels fit
          together. Always rely on the{" "}
          <a href="https://www.ontario.ca/document/official-mto-drivers-handbook" target="_blank" rel="noopener noreferrer">
            official MTO Driver&apos;s Handbook
          </a>{" "}
          and{" "}
          <a href="https://www.drivetest.ca" target="_blank" rel="noopener noreferrer">
            DriveTest
          </a>{" "}
          for authoritative rules and booking.
        </p>
        <p className="home-videos-disclaimer muted small">
          These videos are not created by Shaaz Driving Academy; we share them for general information only.
        </p>
        <div className="home-videos-grid">
          {homeYoutubeVideos.map((v) => (
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
