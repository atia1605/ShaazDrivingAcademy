export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-copy">© {new Date().getFullYear()} Shaaz Driving Academy. All rights reserved.</p>
        <p className="footer-address">
          2688 Danforth Avenue, Toronto, Ontario M4C 1L7 · Phone:{" "}
          <a href="tel:4166865799">416-686-5799</a>, <a href="tel:6477837582">647-783-7582</a> · Email:{" "}
          <a href="mailto:shohanchowdhury@hotmail.com">shohanchowdhury@hotmail.com</a>
        </p>
        <p className="footer-meta">
          Licensed by Province of Ontario, Ministry of Transportation (MTO). Your safety is our priority.
        </p>
      </div>
    </footer>
  );
}
