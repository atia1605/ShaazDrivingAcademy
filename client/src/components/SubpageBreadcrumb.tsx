import { Link } from "react-router-dom";

type Props = {
  /** Segment after Home / */
  current: string;
};

export function SubpageBreadcrumb({ current }: Props) {
  return (
    <div className="subpage-breadcrumb">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep" aria-hidden>
            /
          </span>
          <span>{current}</span>
        </nav>
      </div>
    </div>
  );
}
