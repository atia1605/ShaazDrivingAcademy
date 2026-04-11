const steps = [
  {
    title: "Choose your course",
    text: "Browse BDE packages or individual lessons, or tell us your goals — we will match you to the right program.",
  },
  {
    title: "Register & pay online",
    text: "Submit your details and pay deposits securely by card. Prefer phone or email? We are one tap away.",
  },
  {
    title: "Start learning",
    text: "Complete classroom and in-car training with licensed instructors, then book your road test with confidence.",
  },
];

export function HowItWorks() {
  return (
    <section className="section section-how" aria-labelledby="how-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="how-heading">How it works</h2>
          <p className="section-intro">A simple path from first contact to getting your licence.</p>
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
