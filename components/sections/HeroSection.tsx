import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero" aria-label="Hero">

      {/* Full-screen photo background */}
      <div className="hero__bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero__bg-photo"
          src="/images/cider-spice-bar-craft-cider-tap-pour-concept-rendering.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow">Opening Q1–Q2 2027 · Downtown Las Cruces, NM</p>
        <h1 className="hero__headline">
          Where Las Cruces<br /><em>Eats the World</em>
        </h1>
        <p className="hero__subhead">
          A next-generation food hall, culinary incubator, and Southern New Mexico&apos;s
          only craft cider bar — giving Borderland food makers a permanent downtown home.
        </p>
        <div className="hero__actions">
          <Link href="#opportunity" className="btn btn--primary">See the Opportunity</Link>
          <Link href="#financials" className="btn btn--ghost">Investor Overview</Link>
        </div>
        <div className="hero__badges">
          <span className="badge">8,000 sq ft Indoor Venue</span>
          <span className="badge">10–13 Global Concepts</span>
          <span className="badge">Southern NM&apos;s Only Craft Cider Bar</span>
        </div>
      </div>

      <a className="hero__scroll" href="#opportunity" aria-label="Scroll to the opportunity section">
        <span>See the Opportunity</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>

    </section>
  );
}
