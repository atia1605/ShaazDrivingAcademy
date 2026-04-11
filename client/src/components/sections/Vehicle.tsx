import { Link } from "react-router-dom";

export function Vehicle() {
  return (
    <section id="vehicle" className="section">
      <div className="container narrow">
        <h2>Vehicle for hire (PTC licence)</h2>
        <p>
          Get certified for vehicle-for-hire (PTC) licensing. Program overview, schedule, and registration details are
          available on request.
        </p>
        <Link to="/register" className="btn btn-primary">
          Register your interest
        </Link>
      </div>
    </section>
  );
}
