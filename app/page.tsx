/**
 * Homepage — Las Cruces Culinary Innovation Hub
 *
 * Server component: pure markup, no client state.
 * All interactivity (nav, FAQ, forms, lightbox) is handled by
 * /public/main.js loaded via <Script strategy="afterInteractive">
 * in app/layout.tsx.
 *
 * Section order (Phase 2 spec):
 *   Hero → TrustBar → Gallery → Opportunity → Concept →
 *   VendorMix → Programming → CiderBar → VendorModel →
 *   Financials → Impact → Comparable → FAQ →
 *   Newsletter → Contact → Footer
 */

/* ── Shared chevron SVG used in FAQ items ─────────────────────── */
function ChevronDown() {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

/* ── FAQ item ─────────────────────────────────────────────────── */
function FaqItem({
  num, id, category, question, children,
}: {
  num: string
  id: string
  category: string
  question: string
  children: React.ReactNode
}) {
  return (
    <div className="faq-item" role="listitem" data-category={category}>
      <button className="faq-question" aria-expanded="false" aria-controls={id}>
        <span className="faq-question__num" aria-hidden="true">{num}</span>
        <span className="faq-question__text">{question}</span>
        <span className="faq-icon" aria-hidden="true"><ChevronDown /></span>
      </button>
      <div className="faq-answer" id={id} role="region">
        <div className="faq-answer__inner">{children}</div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        id="scrollProgress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        aria-label="Page scroll progress"
      />

      {/* Skip link */}
      <a className="skip-link" href="#main-content">Skip to main content</a>

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <header className="site-header" id="top">
        <nav className="nav" role="navigation" aria-label="Main navigation">
          <a className="nav__logo" href="#top" aria-label="Cider &amp; Spice — home">
            <span className="nav__logo-title">Cider &amp; Spice</span>
            <span className="nav__logo-sub">Las Cruces Culinary Innovation Hub</span>
          </a>
          <button
            className="nav__toggle" id="navToggle"
            aria-label="Open menu" aria-expanded="false" aria-controls="navMenu"
          >
            <span /><span /><span />
          </button>
          <ul className="nav__menu" id="navMenu" role="list">
            <li><a href="#opportunity">Opportunity</a></li>
            <li><a href="#concept">The Hub</a></li>
            <li><a href="#cider">Cider Bar</a></li>
            <li><a href="#incubator">Vendors</a></li>
            <li><a href="#financials">Investors</a></li>
            <li><a href="#impact">Impact</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact" className="nav__cta">Get Involved</a></li>
          </ul>
        </nav>
      </header>

      <main id="main-content">

        {/* ════════════════════════════════════════════════════════
            §1 HERO
        ════════════════════════════════════════════════════════ */}
        <section className="hero" aria-label="Hero">
          <div className="hero__bg" aria-hidden="true">
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
              A curated food hall, culinary incubator, and Southern New Mexico&apos;s
              only craft cider bar — all under one climate-controlled roof.
            </p>
            <div className="hero__actions">
              <a href="#opportunity" className="btn btn--primary">See the Opportunity</a>
              <a href="#financials" className="btn btn--ghost">Investor Overview</a>
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

        {/* ── TRUST BAR ─────────────────────────────────────────── */}
        <div className="trust-bar" role="region" aria-label="Endorsements and recognition">
          <div className="container trust-bar__inner">
            <span className="trust-bar__label">Endorsed by</span>
            <ul className="trust-bar__list" role="list">
              <li><span>City of Las Cruces</span><em>East Lohman Development Plan</em></li>
              <li className="trust-bar__divider" aria-hidden="true" />
              <li><span>Elevate Las Cruces</span><em>2020 Community Plan</em></li>
              <li className="trust-bar__divider" aria-hidden="true" />
              <li><span>W. Picacho MRA Plan</span><em>Stantec Consulting, 2026</em></li>
              <li className="trust-bar__divider" aria-hidden="true" />
              <li><span>Visit Las Cruces</span><em>Tourism Co-Marketing Partner</em></li>
              <li className="trust-bar__divider" aria-hidden="true" />
              <li><span>NMSU + DACC</span><em>Workforce Pipeline Partners</em></li>
            </ul>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            GALLERY
        ════════════════════════════════════════════════════════ */}
        <section className="section section--gallery" id="gallery" aria-label="Concept Renderings">
          <div className="container">
            <p className="section__eyebrow text-center">See the Vision</p>
            <h2 className="section__heading text-center">Concept Renderings</h2>
            <p className="section__intro text-center">
              AI-generated concept renderings illustrating the Cider &amp; Spice vision.
              These images are for planning and vision purposes — they do not represent
              the finished project.
            </p>
            <div className="gallery-disclosure" role="note">
              <span className="gallery-disclosure__icon" aria-hidden="true">ℹ</span>
              <p>
                All images below are <strong>AI-generated concept renderings</strong>. They are illustrative of the
                vision for <strong>Cider &amp; Spice — Las Cruces Culinary Innovation Hub</strong> and do not
                represent the finished project, confirmed tenants, or actual menu pricing.
              </p>
            </div>
            <div className="gallery-grid">
              <figure className="gallery-item gallery-item--wide" data-section="concept">
                <img src="/images/cider-spice-concept-indoor-mezzanine-flow-concept-rendering.png"
                  alt="A concept rendering of the Cider &amp; Spice food hall interior viewed from the mezzanine level, showing communal dining tables, vendor stalls along the walls, a live-music stage in the background, and open doors leading to an outdoor patio"
                  loading="lazy" decoding="async" />
                <figcaption>
                  <span className="gallery-item__label">Interior · Mezzanine View</span>
                  <span className="gallery-item__note">Concept Rendering | Cider &amp; Spice — Las Cruces Culinary Innovation Hub</span>
                </figcaption>
              </figure>
              <figure className="gallery-item" data-section="outdoor">
                <img src="/images/cider-spice-outdoor-indoor-patio-shade-sails-concept-rendering.png"
                  alt="A concept rendering of the Cider &amp; Spice food hall showing roll-up glass doors fully open to a desert landscaped patio with shade sails and string lights, with the Organ Mountains visible on the horizon"
                  loading="lazy" decoding="async" />
                <figcaption>
                  <span className="gallery-item__label">Indoor–Outdoor Flow · Desert Patio</span>
                  <span className="gallery-item__note">Concept Rendering | Cider &amp; Spice</span>
                </figcaption>
              </figure>
              <figure className="gallery-item" data-section="concept">
                <img src="/images/cider-spice-concept-overhead-stage-full-crowd-concept-rendering.png"
                  alt="A bird's-eye concept rendering of the Cider &amp; Spice food hall filled with guests, showing a live-music stage with a red curtain backdrop, a curved teal tile bar, communal seating, and string lights overhead"
                  loading="lazy" decoding="async" />
                <figcaption>
                  <span className="gallery-item__label">Overhead View · Live Music &amp; Full Crowd</span>
                  <span className="gallery-item__note">Concept Rendering | Cider &amp; Spice</span>
                </figcaption>
              </figure>
              <figure className="gallery-item" data-section="interior">
                <img src="/images/cider-spice-interior-two-level-open-kitchen-concept-rendering.png"
                  alt="A concept rendering of the two-level Cider &amp; Spice food hall interior showing a staircase to a mezzanine dining level, open kitchen counters with chefs, and communal seating surrounded by lush plants"
                  loading="lazy" decoding="async" />
                <figcaption>
                  <span className="gallery-item__label">Two-Level Interior · Open Kitchens</span>
                  <span className="gallery-item__note">Concept Rendering | Cider &amp; Spice</span>
                </figcaption>
              </figure>
              <figure className="gallery-item" data-section="bar">
                <img src="/images/cider-spice-bar-craft-cider-tap-pour-concept-rendering.png"
                  alt="A concept rendering of a bartender pouring craft cider at the Cider &amp; Spice bar, featuring copper taps, a teal tiled backsplash, Edison bulb lighting, and a view of desert mountains through the window"
                  loading="lazy" decoding="async" />
                <figcaption>
                  <span className="gallery-item__label">Craft Cider Bar · Tap Pour</span>
                  <span className="gallery-item__note">Concept Rendering | Cider &amp; Spice</span>
                </figcaption>
              </figure>
              {/* Tenant vision images — content warning required */}
              {[
                {
                  src: '/images/cider-spice-tenant-vision-three-stall-row-vision-image.png',
                  alt: 'A concept rendering of a food hall vendor row at the Cider & Spice food hall, showing three illustrative vendor stalls with branded signage, a service counter with prepared dishes, and a full menu board with example pricing',
                  label: 'Tenant Vision · Illustrative Vendor Row',
                },
                {
                  src: '/images/cider-spice-tenant-vision-sticky-stack-co-stall-vision-image.png',
                  alt: 'A concept rendering of an illustrative slider vendor stall at the Cider & Spice food hall, showing a warmly lit service counter with three trays of mini sliders alongside labeled house-made jam jars, with overhead menu boards',
                  label: 'Tenant Vision · Sticky Stack Co.',
                },
                {
                  src: '/images/cider-spice-tenant-vision-seoul-fire-chicken-stall-vision-image.png',
                  alt: 'A concept rendering of an illustrative Korean fried chicken vendor stall at the Cider & Spice food hall, showing three uniformed staff behind an open prep counter loaded with fried chicken and a large overhead menu board',
                  label: 'Tenant Vision · Seoul Fire Chicken',
                },
              ].map((item) => (
                <figure key={item.src} className="gallery-item gallery-item--warned" data-section="tenant-vision">
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                  <figcaption>
                    <span className="gallery-item__label">{item.label}</span>
                    <span className="gallery-item__note">Vision Image | Cider &amp; Spice — Las Cruces Culinary Innovation Hub</span>
                  </figcaption>
                  <div className="gallery-item__warning" role="note">
                    <span aria-hidden="true">⚠</span>
                    {' '}Illustrative vendor concept only. Brands, menus, and pricing shown are fictitious and not confirmed tenants.
                  </div>
                </figure>
              ))}
              <figure className="gallery-item gallery-item--wide" data-section="gallery">
                <img src="/images/cider-spice-gallery-aerial-outdoor-exterior-collage-vision-image.png"
                  alt="A three-panel illustrative mockup of the Cider &amp; Spice food hall showing the interior dining area with a stage, an outdoor shade-sail event space filled with guests, and the desert-modern exterior building facade"
                  loading="lazy" decoding="async" />
                <figcaption>
                  <span className="gallery-item__label">Interior · Outdoor Event Space · Exterior</span>
                  <span className="gallery-item__note">Illustrative Mockup | Cider &amp; Spice — Las Cruces Culinary Innovation Hub</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            §2 OPPORTUNITY
        ════════════════════════════════════════════════════════ */}
        <section className="band band--dark" id="opportunity" aria-label="The Opportunity">
          <div className="container">
            <p className="band__label">The Opportunity</p>
            <h2 className="band__heading">Las Cruces is ready. The niche is open.</h2>
            <p className="opp-lead">
              A 300,000-strong regional market generates <strong>$178.7M in full-service
              restaurant receipts annually</strong> — yet residents drive 45+ minutes to
              Albuquerque and El Paso for the diversity they can&apos;t find at home. The Hub
              addresses three interconnected gaps simultaneously: dining variety, a craft
              cider destination, and a structured incubator for local food entrepreneurs.
            </p>
            <div className="opp-stats" role="list">
              {[
                { stat: '$178.7M', label: 'Full-service restaurant receipts\nLas Cruces (2025, NMTR RP-80)' },
                { stat: '51%',     label: 'MRA residents ranked restaurants\n#1 most needed business (703 respondents)' },
                { stat: '2.5M',    label: 'Annual out-of-market visitors\n(Placer.ai data, 2025)' },
                { stat: 'Month 18–20', label: 'Projected cash-flow breakeven\nacross all occupancy scenarios' },
              ].map((item) => (
                <div key={item.stat} className="opp-stat" role="listitem">
                  <strong>{item.stat}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="why-grid">
              {[
                { icon: '🌶', title: 'Documented Dining Gap', body: 'Residents drive 45+ minutes for Thai, Mediterranean, and Japanese cuisine — a proven, recurring demand leak from a 300,000–350,000+ regional draw.' },
                { icon: '🍎', title: 'Zero Craft Cider Competition', body: 'No dedicated craft cider bar exists in all of southern New Mexico — a completely open niche anchored by 400+ years of New Mexico apple-growing heritage.' },
                { icon: '🚀', title: 'No Structured Incubator', body: 'Food entrepreneurs face $250K–$500K barriers to entry with no lower-risk pathway. The Hub changes that with rotating incubator stalls at $2,500/month.' },
                { icon: '📊', title: 'Monument Gateway Demand', body: 'The adjacent Organ Mountains–Desert Peaks National Monument generated $6.2M in non-local restaurant spending in 2022 alone — a captive tourist audience.' },
                { icon: '🏙', title: 'City-Backed Vision', body: "The Hub directly implements four adopted city planning documents: Elevate Las Cruces (2020), East Lohman Plan (2021), W. Picacho MRA (2026), and El Paseo MRA (2025)." },
                { icon: '🎓', title: 'Growing Workforce & Campus', body: 'NMSU enrollment growth, Fort Bliss expansion, and an AI data center workforce influx bring residents who have experienced diverse dining elsewhere — and expect it here.' },
              ].map((card) => (
                <div key={card.title} className="why-card">
                  <div className="why-card__icon" aria-hidden="true">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
            <blockquote className="opp-quote">
              &ldquo;For residents: diverse dining, finally here. For investors: a resilient, diversified
              hospitality revenue platform with conservative first-year assumptions and a realistic
              path to non-dilutive grant funding.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            §3 CONCEPT — "How It Works"
        ════════════════════════════════════════════════════════ */}
        <section className="section section--alt" id="concept" aria-label="Hub Concept">
          <div className="container">
            <p className="section__eyebrow text-center">The Concept</p>
            <h2 className="section__heading text-center">One roof. Every craving.</h2>
            <p className="section__intro text-center">
              8,000 sq ft of indoor, climate-controlled space — designed for families, students, foodies, and visitors alike.
            </p>
            <div className="program-grid">
              {[
                { num: '01', title: 'Permanent Anchor Stalls',   detail: '7–8 stalls · 2+ year license',    featured: true,
                  body: 'Dedicated private kitchens for established concepts. New Mexican & Mexican anchors, the Hub Signature Restaurant, Southern BBQ, Mediterranean, Asian Fusion — diversity is built in, not bolted on.' },
                { num: '02', title: 'Rotating Incubator Stalls', detail: '2–3 stalls · 12–18 month cohorts', featured: false,
                  body: 'Emerging culinary entrepreneurs on a structured three-stage pathway from concept validation to full independence — with weekly coaching and marketing support.' },
                { num: '03', title: 'Specialty Craft Cider Bar', detail: '20–25 rotating taps',             featured: false,
                  body: '8–10 New Mexico cideries featured alongside regional and international expressions. Cider Club membership, tasting flights, food pairings, and the social anchor for evening programming.' },
                { num: '04', title: 'Ghost Kitchen Bays',        detail: '2 delivery-only bays',            featured: false,
                  body: '$1,500–$2,000/month + 8% commission. Low-risk format experimentation for delivery platforms with full back-of-house support — no storefront overhead.' },
                { num: '05', title: 'Shared Commissary Kitchen',  detail: '$25–$35/hour rentals',            featured: false,
                  body: 'Available for catering, wholesale production, and external food entrepreneurs. Modeled on The Kitchen Table Santa Fe, which launched with 15 pre-signed members and now serves 34.' },
                { num: '06', title: 'Common Dining Area',         detail: '60–80 climate-controlled seats',  featured: false,
                  body: 'Flexible for live music, trivia nights, Lotería, cultural festivals, and quarterly night markets attracting 300–500 regional attendees. Programming is core infrastructure, not an afterthought.' },
              ].map((card) => (
                <article key={card.num} className={`program-card${card.featured ? ' program-card--featured' : ''}`}>
                  <div className="program-card__num" aria-hidden="true">{card.num}</div>
                  <h3>{card.title}</h3>
                  <p className="program-card__detail">{card.detail}</p>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── VENDOR MIX ─────────────────────────────────────────── */}
        <section className="section" id="vendor-mix" aria-label="Vendor Mix">
          <div className="container">
            <p className="section__eyebrow text-center">Curated for Las Cruces</p>
            <h2 className="section__heading text-center">The Vendor Mix</h2>
            <p className="section__intro text-center">
              Diversity is the foundation — not layered on top. Every concept earns its place because it serves real, documented demand.
            </p>
            <div className="vmix-grid">
              {[
                { icon: '🌶', name: 'Traditional New Mexican',      sub: 'Enchiladas, tamales, red/green chile',  body: 'Cultural credibility anchor; highest local familiarity; repeat visit driver.',                                  tag: 'Anchor',    tagMod: '' },
                { icon: '🌮', name: 'Mexican Street Food',           sub: 'Tacos, tortas, caldos, elotes',         body: 'Price-accessible; high frequency; broad demographic appeal; weekday workhorse.',                            tag: 'Anchor',    tagMod: '' },
                { icon: '⭐', name: 'Hub Signature Restaurant',       sub: 'Owner-operated',                        body: '100% of food revenue flows directly to the Hub; permanent anchor; fully curated concept.',                  tag: 'Hub-Owned', tagMod: 'vmix-tag--gold' },
                { icon: '🔥', name: 'Southern BBQ & Smoked Meats',   sub: 'Brisket, ribs, pulled pork',            body: 'Broad appeal; high weekend traffic; low comparable competition locally.',                                   tag: 'Anchor',    tagMod: '' },
                { icon: '🥗', name: 'Mediterranean / Plant-Forward', sub: 'Falafel, shawarma, grain bowls',        body: 'Health-conscious segment anchor; vegetarian & vegan options; NMSU wellness community.',                     tag: 'Anchor',    tagMod: '' },
                { icon: '🍜', name: 'Asian Fusion or Ramen',         sub: 'Ramen, bao, dumplings',                 body: 'Gen Z and young professional appeal; photogenic; social media content driver.',                            tag: 'Anchor',    tagMod: '' },
                { icon: '🍰', name: 'Dessert / Baked Goods',         sub: 'Pastries, cakes, specialty sweets',     body: 'Repeat-visit add-on; child-friendly; natural commissary kitchen users.',                                   tag: 'Anchor',    tagMod: '' },
                { icon: '🚀', name: 'Rotating Incubator Slots',      sub: '2–3 emerging concepts',                 body: 'Cultural variety; entrepreneurship showcase; staggered 12–18 month cohorts.',                              tag: 'Incubator', tagMod: 'vmix-tag--teal' },
              ].map((card) => (
                <div key={card.name} className={`vmix-card${card.tagMod === 'vmix-tag--teal' ? ' vmix-card--incubator' : ''}`}>
                  <span className="vmix-card__icon" aria-hidden="true">{card.icon}</span>
                  <h3>{card.name}</h3>
                  <p className="vmix-card__sub">{card.sub}</p>
                  <p>{card.body}</p>
                  <span className={`vmix-tag ${card.tagMod}`}>{card.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROGRAMMING ─────────────────────────────────────────── */}
        <section className="section section--alt" aria-label="Programming">
          <div className="container">
            <p className="section__eyebrow text-center">Built-In Events Calendar</p>
            <h2 className="section__heading text-center">Programming as Core Infrastructure</h2>
            <p className="section__intro text-center">
              Weekly rituals and seasonal festivals are operational infrastructure from Day 1 — not amenities added after opening.
              Programming drives habit, revenue, and community.
            </p>
            <div className="event-grid">
              {[
                { freq: 'Weekly',    title: 'Trivia, Live Music & Lotería Nights',   body: 'Habit-building anchors that extend dwell time, increase check averages, and convert first-time visitors into regulars.' },
                { freq: 'Monthly',   title: 'Cultural Food Festivals',               body: 'Global Flavors Night, BBQ Weekend, NM Heritage Festival — ticketed events with incremental vendor revenue and press generation.' },
                { freq: 'Monthly',   title: 'Chile-and-Cider Pairings',             body: "NM agriculture education and producer storytelling tied to the cider bar's seasonal tap rotations." },
                { freq: 'Quarterly', title: 'Night Markets',                         body: '300–500 attendees. Artisans, food, music. Foot traffic surges, regional visitor draw, and vendor booth revenue.' },
                { freq: 'Monthly',   title: 'Cider Education Nights',               body: 'Producer meet-and-greets, harvest events, and tasting flights that drive Cider Club conversions and bottle retail.' },
                { freq: 'Monthly',   title: 'Workforce Open Houses',                body: 'Sunday evening sessions feeding the apprenticeship enrollment pipeline and fulfilling workforce development grant reporting.' },
              ].map((ev) => (
                <div key={ev.title} className="event-card">
                  <span className="event-card__freq">{ev.freq}</span>
                  <h3>{ev.title}</h3>
                  <p>{ev.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            §4 CIDER BAR
        ════════════════════════════════════════════════════════ */}
        <section className="section cider-section" id="cider" aria-label="Craft Cider Bar">
          <div className="cider-bg" aria-hidden="true" />
          <div className="cider-ember-glow" aria-hidden="true" />
          <div className="container cider-inner">

            {/* Left: brand story */}
            <div className="cider-text">
              <div className="cider-wordmark" aria-label="Cider and Spice — Southern NM's first specialty cider bar">
                <span className="cider-wordmark__pre">Introducing</span>
                <span className="cider-wordmark__name">Cider <em>&amp;</em> Spice</span>
                <span className="cider-wordmark__divider" aria-hidden="true">· food hall · las cruces ·</span>
              </div>
              <p className="section__eyebrow">Southern NM&apos;s First Specialty Cider Bar</p>
              <h2 className="section__heading">Zero Competition.<br />400 Years of Heritage.</h2>
              <p>No dedicated craft cider bar exists in all of southern New Mexico — a completely open niche anchored by four centuries of apple-growing heritage from Velarde, Los Ranchos, Cloudcroft, and the Sacramento Mountains.</p>
              <p>20–25 rotating taps featuring 8–10 New Mexico cideries alongside regional craft producers and international expressions — Spanish Basque, French Normandy, hopped English styles — all paired with the Hub&apos;s global food menu.</p>
              <ul className="check-list">
                <li>8–10 NM cideries: Hellgate, Steel Bender, Black Mesa, Tractor Brewing, and more</li>
                <li>Seasonal harvest rotations tied to NM apple orchards</li>
                <li>Regional and international cider education depth</li>
                <li>Wine and intentionally minimal local craft beer as pairing alternatives</li>
              </ul>
              <blockquote className="cider-voice">
                <span className="cider-voice__quote">&ldquo;Come hungry.<br />Leave inspired.<br />Tell everyone.&rdquo;</span>
                <cite className="cider-voice__cite">— The Cider &amp; Spice way</cite>
              </blockquote>
              <div className="cider-palette" aria-hidden="true">
                <span style={{ background: '#1a0f08' }} title="Midnight Ember" />
                <span style={{ background: '#8b2500' }} title="Chili Brick" />
                <span style={{ background: '#d4500a' }} title="Spice Fire" />
                <span style={{ background: '#d4a84b' }} title="Saffron Gold" />
                <span style={{ background: '#e8d5a0' }} title="Warm Cream" />
                <span style={{ background: '#f5f0e8', border: '1px solid rgba(255,255,255,.15)' }} title="Parchment" />
              </div>
            </div>

            {/* Right: membership tiers — focal point */}
            <div className="cider-membership">
              <div className="cider-membership__header">
                <h3>Cider Club Membership</h3>
                <p className="cider-membership__sub">Predictable recurring revenue — independent of daily foot traffic.</p>
              </div>
              <div className="tier-cards">
                {/* Taster */}
                <div className="tier">
                  <div className="tier__accent-bar" aria-hidden="true" />
                  <div className="tier__icon" aria-hidden="true">🍎</div>
                  <div className="tier__name">Taster</div>
                  <div className="tier__price">$25<span>/mo</span></div>
                  <ul>
                    <li>1 tasting flight/month (4 ciders)</li>
                    <li>10% discount on all pours</li>
                    <li>Member newsletter &amp; early event access</li>
                  </ul>
                  <form className="tier__email-form" data-tier="taster" data-tier-name="Tasting Passport" noValidate>
                    <label htmlFor="tier-email-taster" className="sr-only">Email address for Tasting Passport waitlist</label>
                    <input id="tier-email-taster" className="tier__email-input" type="email" placeholder="your@email.com" required autoComplete="email" />
                    <button type="submit" className="tier__cta">Join Waitlist — Tasting Passport</button>
                    <p className="tier__email-success" hidden aria-live="polite"><span aria-hidden="true">✓</span> You&rsquo;re on the list!</p>
                    <p className="tier__email-error"   hidden aria-live="polite">Something went wrong — please try again.</p>
                  </form>
                </div>
                {/* Enthusiast (featured) */}
                <div className="tier tier--featured">
                  <div className="tier__badge">Most Popular</div>
                  <div className="tier__accent-bar" aria-hidden="true" />
                  <div className="tier__icon" aria-hidden="true">🫙</div>
                  <div className="tier__name">Enthusiast</div>
                  <div className="tier__price">$45<span>/mo</span></div>
                  <ul>
                    <li>2 flights/month</li>
                    <li>15% discount on all pours</li>
                    <li>Reserved seating at cider events</li>
                    <li>Producer meet-and-greet access</li>
                  </ul>
                  <form className="tier__email-form" data-tier="enthusiast" data-tier-name="Spice Route" noValidate>
                    <label htmlFor="tier-email-enthusiast" className="sr-only">Email address for Spice Route waitlist</label>
                    <input id="tier-email-enthusiast" className="tier__email-input" type="email" placeholder="your@email.com" required autoComplete="email" />
                    <button type="submit" className="tier__cta">Join Waitlist — Spice Route</button>
                    <p className="tier__email-success" hidden aria-live="polite"><span aria-hidden="true">✓</span> You&rsquo;re on the list!</p>
                    <p className="tier__email-error"   hidden aria-live="polite">Something went wrong — please try again.</p>
                  </form>
                </div>
                {/* Connoisseur */}
                <div className="tier">
                  <div className="tier__accent-bar" aria-hidden="true" />
                  <div className="tier__icon" aria-hidden="true">🍾</div>
                  <div className="tier__name">Connoisseur</div>
                  <div className="tier__price">$85<span>/mo</span></div>
                  <ul>
                    <li>Unlimited tasting flights</li>
                    <li>20% discount on all pours</li>
                    <li>Private-label seasonal bottle</li>
                    <li>Quarterly private pairing dinner</li>
                  </ul>
                  <form className="tier__email-form" data-tier="connoisseur" data-tier-name="Ember Society" noValidate>
                    <label htmlFor="tier-email-connoisseur" className="sr-only">Email address for Ember Society waitlist</label>
                    <input id="tier-email-connoisseur" className="tier__email-input" type="email" placeholder="your@email.com" required autoComplete="email" />
                    <button type="submit" className="tier__cta">Join Waitlist — Ember Society</button>
                    <p className="tier__email-success" hidden aria-live="polite"><span aria-hidden="true">✓</span> You&rsquo;re on the list!</p>
                    <p className="tier__email-error"   hidden aria-live="polite">Something went wrong — please try again.</p>
                  </form>
                </div>
              </div>
              <div className="cider-rev">
                <div>
                  <strong data-count="179" data-prefix="$" data-suffix="K">$179K</strong>
                  <span>Year 1 Cider Revenue (conservative)</span>
                </div>
                <div>
                  <strong data-count="278" data-prefix="$" data-suffix="K">$278K</strong>
                  <span>Year 2 Growth Projection</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            §5 VENDOR MODEL
        ════════════════════════════════════════════════════════ */}
        <section className="section" id="incubator" aria-label="Vendor and Incubator Model">
          <div className="container">
            <p className="section__eyebrow text-center">Vendor &amp; Incubator Model</p>
            <h2 className="section__heading text-center">Your Launchpad to Independence</h2>
            <p className="section__intro text-center">
              No structured culinary incubator exists in southern New Mexico. The Hub changes that — giving food entrepreneurs
              a lower-risk, mentor-supported pathway from concept to standalone restaurant.
            </p>
            <div className="journey-steps">
              <div className="journey-step">
                <div className="journey-step__num">Stage 1</div>
                <div className="journey-step__content">
                  <h3>Incubator Entry</h3>
                  <p className="journey-step__time">Months 1–12</p>
                  <p><strong>Milestone:</strong> Concept validated, menu refined, profitability established, 4.0+ Google rating.</p>
                  <p><strong>Hub Support:</strong> Weekly coaching, NMED permit guidance, POS training, marketing integration, collective purchasing, insurance verification.</p>
                  <p className="journey-step__cost">$2,000–$2,500/month + 8% of gross sales</p>
                </div>
              </div>
              <div className="journey-step">
                <div className="journey-step__num">Stage 2</div>
                <div className="journey-step__content">
                  <h3>Permanent Stall</h3>
                  <p className="journey-step__time">Months 13–18</p>
                  <p><strong>Milestone:</strong> Sustained profitability + loyalty proven → offered a permanent stall license within the Hub.</p>
                  <p><strong>Hub Support:</strong> Long-term license, mentorship role for next cohort, ongoing operational and marketing support.</p>
                  <p className="journey-step__cost">$2,800–$3,200/month + 6% of gross sales</p>
                </div>
              </div>
              <div className="journey-step">
                <div className="journey-step__num">Stage 3</div>
                <div className="journey-step__content">
                  <h3>Independence</h3>
                  <p className="journey-step__time">Months 19–36</p>
                  <p><strong>Milestone:</strong> Graduation to a fully independent brick-and-mortar location in the Las Cruces region.</p>
                  <p><strong>Hub Support:</strong> SBA loan guidance, commercial site selection, business plan development, alumni network, optional co-investment (5–15% equity stake).</p>
                </div>
              </div>
            </div>
            <div className="equity-callout">
              <h3>Equity &amp; Inclusive Entrepreneurship</h3>
              <p><strong>70% of vendor stalls reserved</strong> for first-time, minority, veteran, or immigrant entrepreneurs — reflecting Las Cruces&apos;s 65%+ Hispanic population and its active military and veteran community.</p>
              <div className="priority-groups">
                <span>First-time restaurant owners</span>
                <span>Hispanic, Black, Asian &amp; Native American entrepreneurs</span>
                <span>Veteran-owned businesses</span>
                <span>Immigrant-owned businesses</span>
                <span>Women-owned businesses</span>
              </div>
            </div>
            <div className="kitchen-callout">
              <h3>Every Stall Gets Its Own Private Kitchen</h3>
              <p>Every vendor stall includes its own fully equipped, private dedicated kitchen — not a shared arrangement where vendors compete for equipment.</p>
              <div className="equipment-grid">
                {['Commercial 6-Burner Gas Range','Dedicated Ventilation Hood + Fire Suppression','2-Door Reach-In Refrigerator','Commercial Freezer','Commercial Fryer','8 ft NSF Stainless Prep Table','Dedicated Hand + 3-Compartment Sinks','Touchscreen POS System','Branded Counter + Serving Window','Smallwares Starter Package'].map((item) => (
                  <div key={item} className="equip-item">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            §6 INVESTOR OVERVIEW
        ════════════════════════════════════════════════════════ */}
        <section className="section section--dark" id="financials" aria-label="Financial Overview">
          <div className="container">
            <p className="section__eyebrow text-center">Investor Overview</p>
            <h2 className="section__heading text-center">A Resilient, Diversified Revenue Platform</h2>
            <p className="section__intro text-center">Conservative assumptions. Diversified revenue streams. A realistic, non-dilutive grant funding pathway.</p>

            <div className="highlights-grid">
              {[
                { val: '$1,505,000',    label: 'Total Project Capital' },
                { val: '$850,000',      label: 'SBA 7(a) Loan (pre-qualification in progress)' },
                { val: '$405K–$595K',   label: 'Target Grant Funding (NMFA, WIOA, HFFF, EPE, DLCP)' },
                { val: 'Month 18–20',   label: 'Cash Flow Breakeven' },
                { val: '85%',           label: '3-Year Cumulative Investor ROI' },
                { val: 'Q1–Q2 2027',    label: 'Grand Opening Target' },
              ].map((h) => (
                <div key={h.val} className="highlight">
                  <strong>{h.val}</strong>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>

            <div className="disclosure-note">
              <strong>Financial Model Disclosure (May 2026):</strong> The Appendix F Cashflow Tool is the governing financial model — Year 1 Revenue $822,000 / EOY Cash $60,100.
              SBA underwriters, grant reviewers, and accredited investors should reference Appendix F. Full financial package available on request.
            </div>

            <h3 className="subsection-heading">Three-Year Financial Trajectory</h3>
            <div className="table-wrap" role="region" aria-label="Three-year financial trajectory table" tabIndex={0}>
              <table className="data-table data-table--dark" aria-label="Three-year financial projections">
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Revenue</th>
                    <th scope="col">EBITDA / Cash</th>
                    <th scope="col">Margin</th>
                    <th scope="col">Primary Drivers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Year 1</strong></td>
                    <td>$822,000</td>
                    <td>$60,100 EOY Cash</td>
                    <td>—</td>
                    <td>Appendix F ramp model; Cider Club launch; occupancy ramp 50%→70%</td>
                  </tr>
                  <tr>
                    <td><strong>Year 2</strong></td>
                    <td>$1,430,000</td>
                    <td>$384,000</td>
                    <td>27%</td>
                    <td>Full-year 85%+ occupancy; Cider Club 100+ members; first vendor graduations</td>
                  </tr>
                  <tr>
                    <td><strong>Year 3</strong></td>
                    <td>$1,700,000</td>
                    <td>$570,000</td>
                    <td>34%</td>
                    <td>90%+ occupancy; mature cider programming; permanent stall promotions</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} className="tfoot-summary">
                      <strong>3-Year Cumulative</strong>
                      &ensp;&middot;&ensp;
                      <strong>$4.1M+ Revenue</strong>
                      &ensp;&middot;&ensp;
                      <strong>$1,068,000 EBITDA</strong>
                      &ensp;&middot;&ensp;
                      <span className="tfoot-irr">Investor IRR: 17–20% (Illustrative)</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Debt service summary card */}
            <div className="ds-card-row">
              <div className="ds-card">
                <h4 className="ds-card__title">Debt Service Summary</h4>
                <div className="ds-card__metrics">
                  <div className="ds-metric">
                    <strong>$850,000</strong>
                    <span>SBA 7(a) Principal</span>
                  </div>
                  <div className="ds-metric">
                    <strong>~$10,600/mo</strong>
                    <span>Estimated Monthly Payment<br />(10-yr term, ~7.5% rate)</span>
                  </div>
                  <div className="ds-metric">
                    <strong>~$127,200/yr</strong>
                    <span>Annual Debt Service</span>
                  </div>
                </div>
                <p className="ds-card__note">
                  Working capital runway of 6–9 months is built into the Appendix F model. The conservative Year 1 assumption
                  ($822K revenue) keeps debt service coverage positive even at 60% occupancy ($860K downside scenario),
                  providing a meaningful margin of safety during the ramp period.
                </p>
              </div>
            </div>

            <h3 className="subsection-heading">Revenue Stream Diversification</h3>
            <div className="revenue-bars">
              {[
                { label: 'Permanent Stall Rent + Sales %',       pct: '38', mod: '' },
                { label: 'Cider Bar + Cider Club',               pct: '20', mod: ' rev-bar__fill--amber' },
                { label: 'Incubator Stalls Rent + Sales %',      pct: '14', mod: ' rev-bar__fill--teal' },
                { label: 'Event Programming',                    pct: '10', mod: ' rev-bar__fill--rose' },
                { label: 'Commissary Kitchen + Ghost Kitchens',  pct: '11', mod: ' rev-bar__fill--olive' },
                { label: 'Gift Shop, Marketing & Ancillary',     pct: '7',  mod: ' rev-bar__fill--muted' },
              ].map((bar) => (
                <div key={bar.label} className="rev-bar">
                  <div className="rev-bar__label">{bar.label}</div>
                  <div className="rev-bar__track">
                    <div className={`rev-bar__fill${bar.mod}`} style={{ width: `${bar.pct}%` }} aria-label={`${bar.pct}%`}>
                      ~{bar.pct}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="subsection-heading">Stress Test Scenarios</h3>
            <div className="stress-grid">
              <div className="stress-card">
                <h4>Downside (60% occupancy)</h4>
                <div className="stress-card__rev">$860,000</div>
                <div className="stress-card__ebitda stress-card__ebitda--pos">$32,000 EBITDA</div>
                <p>Still EBITDA-positive. Tight but viable.</p>
              </div>
              <div className="stress-card stress-card--base">
                <h4>Base Case (70% · Appendix F)</h4>
                <div className="stress-card__rev">$822,000</div>
                <div className="stress-card__ebitda stress-card__ebitda--pos">$60,100 EOY Cash</div>
                <p>Governing Appendix F model. Conservative ramp-year projection.</p>
              </div>
              <div className="stress-card">
                <h4>Upside (90%+ by Month 8)</h4>
                <div className="stress-card__rev">$1,300,000</div>
                <div className="stress-card__ebitda stress-card__ebitda--pos">$320,000 EBITDA</div>
                <p>Growth scenario — achievable if Sawmill Market-level demand materializes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            §7 COMMUNITY IMPACT
        ════════════════════════════════════════════════════════ */}
        <section className="section" id="impact" aria-label="Community Impact">
          <div className="container">
            <p className="section__eyebrow text-center">Community Impact</p>
            <h2 className="section__heading text-center">Six Grant Categories. Simultaneous Qualification.</h2>
            <p className="section__intro text-center">
              The Hub simultaneously qualifies for six distinct economic development grant categories — an unusually strong position
              that creates a realistic path to <strong>$405,000–$595,000</strong> in non-dilutive grant capital.
            </p>
            <div className="grant-grid">
              {[
                { icon: '🏗', title: 'Small Business Incubator Infrastructure', body: '12+ food entrepreneur startups in Year 1; structured mentorship; staggered graduation pipeline with measurable outcomes.', sources: 'NMFA · HFFF · SBA Community Advantage · DLCP Renovate Main Street', tag: 'Incubator' },
                { icon: '👷', title: 'Workforce Development', body: '10–15 paid apprenticeships/year at $15–$18/hour; NMSU + DACC partnership; career ladder to ownership. Directly advances the #1 ranked goal in Elevate Las Cruces.', sources: 'WIOA/EmployNM · W. Picacho MRA Strategy 3.5', tag: 'Workforce' },
                { icon: '🌆', title: 'Downtown Revitalization', body: "Downtown Las Cruces location within an active MRA zone; Sawmill Market cited by name as a precedent in the City's East Lohman Development Plan.", sources: 'DLCP · EDA Public Works · MRA Property Tax Deferral', tag: 'Downtown' },
                { icon: '🌿', title: 'Local Agriculture & Food Systems', body: '20–30% local sourcing commitment; NM cider bar highlights 400+ years of regional apple heritage; value-added agricultural processing partnerships eligible.', sources: 'USDA LFPP · NM Dept. of Agriculture', tag: 'Agriculture' },
                { icon: '🏛', title: 'Minority & Equity Economic Development', body: '70% of stalls reserved for underrepresented entrepreneurs; bilingual onboarding; veteran priority pathway; 65%+ Hispanic/Latino community served.', sources: 'NMFA · Community Foundation of Southern NM · SBA', tag: 'Equity' },
                { icon: '✈️', title: 'Tourism Infrastructure', body: 'Visit Las Cruces co-marketing partnership; M2M alignment; 2.5M annual out-of-market visitors; OMDPNM gateway dining destination.', sources: 'NM Destination Forward ($500K eligible) · Visit Las Cruces', tag: 'Tourism' },
              ].map((card) => (
                <div key={card.title} className="grant-card">
                  <div className="grant-card__icon" aria-hidden="true">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <p className="grant-card__sources">{card.sources}</p>
                  <span className="grant-tag">{card.tag}</span>
                </div>
              ))}
            </div>
            <div className="jobs-callout">
              <h3>50–70 Total Jobs Created</h3>
              <div className="jobs-breakdown">
                <div className="jobs-item"><strong>16</strong><span>Direct Hub FTE<br />(full + part-time staff)</span></div>
                <div className="jobs-sep" aria-hidden="true">+</div>
                <div className="jobs-item"><strong>18–30</strong><span>Vendor &amp; incubator<br />staff employed</span></div>
                <div className="jobs-sep" aria-hidden="true">×</div>
                <div className="jobs-item"><strong>1.5×</strong><span>Indirect regional<br />economic multiplier</span></div>
                <div className="jobs-sep" aria-hidden="true">=</div>
                <div className="jobs-item jobs-item--total"><strong>50–70</strong><span>Total regional<br />jobs impact</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            §8 PROOF OF CONCEPT
        ════════════════════════════════════════════════════════ */}
        <section className="section section--alt" id="comparable" aria-label="Comparable Markets">
          <div className="container">
            <p className="section__eyebrow text-center">Validated Model</p>
            <h2 className="section__heading text-center">Proof of Concept — Right Here in New Mexico</h2>
            <p className="section__intro text-center">The Hub&apos;s model is proven. Two direct New Mexico comparables and a national growth trend confirm both the demand and the format.</p>
            <div className="comparable-grid">
              <div className="comp-card">
                <div className="comp-card__header">
                  <h3>Sawmill Market</h3>
                  <span className="comp-card__loc">Albuquerque, NM</span>
                </div>
                <ul className="comp-card__bullets">
                  <li>35,000–40,000 sq ft · 28–30 food concepts</li>
                  <li>Cited by name in the City of Las Cruces East Lohman Development Plan as a positive development precedent</li>
                  <li>Demonstrated that food halls build community affection — longer visits, higher spend, repeat customers</li>
                </ul>
                <blockquote className="comp-card__quote">
                  &ldquo;People stay longer, come back more often, and spend more money in places that attract their affection.&rdquo;
                  <cite>— Jim Long, Heritage Cos.</cite>
                </blockquote>
              </div>
              <div className="comp-card">
                <div className="comp-card__header">
                  <h3>The Kitchen Table</h3>
                  <span className="comp-card__loc">Santa Fe, NM</span>
                </div>
                <ul className="comp-card__bullets">
                  <li>Opened May 2023 in a smaller NM market than Las Cruces</li>
                  <li>Launched with 15 pre-signed commissary members → now serves 34 active members</li>
                  <li>Santa Fe Chamber Business of the Year (2023) &amp; Edible Magazine Local Hero Award (2024)</li>
                </ul>
                <p className="comp-card__context">Directly validates the Hub&apos;s commissary kitchen model in a comparable NM market.</p>
              </div>
              <div className="comp-card comp-card--trend">
                <div className="comp-card__header">
                  <h3>National Industry Trend</h3>
                  <span className="comp-card__loc">Food Hall Market, USA</span>
                </div>
                <ul className="comp-card__bullets">
                  <li>Food halls grew <strong>26%</strong> while traditional hospitality contracted (2025)</li>
                  <li>25 food halls in 2010 → 360 by 2023 → <strong>700+ projected by 2027</strong></li>
                  <li>Las Cruces sits in a completely untapped gap within an actively growing national category</li>
                </ul>
                <p className="comp-card__context">The format is validated; the Las Cruces market is wide open.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            §9 FAQ
        ════════════════════════════════════════════════════════ */}
        <section className="section section--faq" id="faq" aria-label="Frequently Asked Questions">
          <div className="container container--narrow">
            <p className="section__eyebrow text-center">Have Questions?</p>
            <h2 className="section__heading text-center">Frequently Asked Questions</h2>
            <p className="section__intro text-center">Everything you need to know about the Hub, the Cider Bar, and how to get involved before we open.</p>
            <div className="faq-filters" role="tablist" aria-label="Filter FAQ by category">
              {[
                { filter: 'all',     label: 'All',              active: true },
                { filter: 'opening', label: 'Opening & Hours',  active: false },
                { filter: 'food',    label: 'Food & Dining',    active: false },
                { filter: 'cider',   label: 'Cider Club',       active: false },
                { filter: 'vendor',  label: 'Vendors',          active: false },
                { filter: 'invest',  label: 'Investors',        active: false },
              ].map((tab) => (
                <button
                  key={tab.filter}
                  className={`faq-filter${tab.active ? ' faq-filter--active' : ''}`}
                  data-filter={tab.filter}
                  role="tab"
                  aria-selected={tab.active}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="faq-list" id="faqList" role="list">
              <FaqItem num="01" id="faq-1" category="opening" question="When does the Hub open?">
                <p>We are targeting a Grand Opening in <strong>Q1–Q2 2027</strong> in downtown Las Cruces, New Mexico. Sign up for our newsletter or pre-register for the Cider Club below to be the first to know when we announce the exact date.</p>
                <a href="#newsletter" className="faq-answer__cta">Get notified first →</a>
              </FaqItem>
              <FaqItem num="02" id="faq-2" category="food" question="What cuisines will be available?">
                <p>The Hub will feature <strong>10–13 distinct food concepts</strong> under one roof: traditional New Mexican, Mexican street food, Southern BBQ and smoked meats, Mediterranean and plant-forward cuisine, Asian fusion and ramen, desserts and baked goods, and 2–3 rotating incubator stalls with emerging local chefs. Every visit offers something new.</p>
              </FaqItem>
              <FaqItem num="03" id="faq-3" category="cider" question="What is the Cider Club and how do I join?">
                <p>The Cider Club is our monthly membership program — three tiers: <strong>Taster ($25/mo)</strong> for flights and discounts, <strong>Enthusiast ($45/mo)</strong> for reserved seating and producer events, and <strong>Connoisseur ($85/mo)</strong> for unlimited flights, a private-label seasonal bottle, and quarterly pairing dinners. Founding members who pre-register now lock in exclusive pricing before opening day.</p>
                <a href="#cider" className="faq-answer__cta">See all Cider Club tiers →</a>
              </FaqItem>
              <FaqItem num="04" id="faq-4" category="vendor" question="I'm a food entrepreneur — how do I apply for an incubator stall?">
                <p>Incubator stalls start at <strong>$2,000–$2,500/month</strong> and include your own private, fully-equipped commercial kitchen. Every incubator vendor receives weekly coaching, NMED permitting guidance, POS training, marketing integration, and a clear three-stage pathway to a permanent stall or your own independent restaurant. <strong>70% of stalls are reserved for first-time, minority, veteran, or immigrant entrepreneurs.</strong></p>
                <a href="#contact" className="faq-answer__cta">Apply as a Vendor →</a>
              </FaqItem>
              <FaqItem num="05" id="faq-5" category="opening" question="Where exactly will the Hub be located?">
                <p>The Hub will be located in <strong>downtown Las Cruces</strong> within a zoning area designated as Urban Character under the Realize Las Cruces 2025 Zoning Code. Sign up for our newsletter to receive the location announcement as soon as the lease is executed.</p>
                <a href="#newsletter" className="faq-answer__cta">Get the location announcement →</a>
              </FaqItem>
              <FaqItem num="06" id="faq-6" category="opening" question="What are the hours of operation?">
                <p>Planned hours are <strong>Sunday–Thursday 11am–9pm</strong> and <strong>Friday–Saturday 11am–10pm</strong>, 365 days a year. The indoor, climate-controlled design means no weather closures — a deliberate operational advantage in the New Mexico desert climate.</p>
              </FaqItem>
              <FaqItem num="07" id="faq-7" category="invest" question="How can I invest or provide grant funding?">
                <p>The Hub is seeking <strong>$1,505,000</strong> in total project capital through an SBA 7(a) loan and non-dilutive grant funding. Accredited investors can request the full investor package — Appendix F Cashflow Model, capital stack detail, and 3-year projections — by selecting &quot;Investor / Funder&quot; in the contact form below. 3-year cumulative EBITDA target: $1,068,000 with a 17–20% IRR (illustrative).</p>
                <a href="#contact" className="faq-answer__cta">Request the investor package →</a>
              </FaqItem>
            </div>
            <div className="faq-footer">
              <p className="faq-footer__text">Still have questions?</p>
              <a href="#contact" className="btn btn--primary faq-footer__btn">Send Us a Message</a>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ───────────────────────────────────────────── */}
        <section className="section newsletter-section" id="newsletter" aria-label="Stay Updated">
          <div className="container container--narrow text-center">
            <p className="section__eyebrow">Be First to Know</p>
            <h2 className="section__heading">Get the Insider Update</h2>
            <p className="section__intro">
              Grand opening announcements, vendor reveals, Cider Club founding-member access, and night market dates — straight to your inbox. No spam, ever.
            </p>
            <form className="newsletter-form" id="newsletterForm" noValidate aria-label="Newsletter signup">
              <div className="newsletter-form__row">
                <label className="sr-only" htmlFor="nl-email">Email address</label>
                <input type="email" id="nl-email" name="email" className="form-input" placeholder="Your email address" required autoComplete="email" aria-required="true" />
                <button type="submit" className="btn btn--primary">Subscribe</button>
              </div>
              <p className="newsletter-form__note">Join <strong id="nlCount">847</strong> people already on the list. Unsubscribe any time.</p>
              <div className="form-success" id="nlSuccess" hidden role="status" aria-live="polite">
                <span>✓</span> You&apos;re on the list! We&apos;ll be in touch before Grand Opening.
              </div>
              <div className="form-error" id="nlError" hidden role="alert" aria-live="assertive">
                Please enter a valid email address.
              </div>
            </form>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────── */}
        <section className="section section--cta" id="contact" aria-label="Get Involved">
          <div className="container container--narrow text-center">
            <p className="section__eyebrow">Join the Movement</p>
            <h2 className="section__heading">Ready to be part of something new in Las Cruces?</h2>
            <p className="section__intro">Whether you&apos;re an investor, prospective vendor, community partner, or Cider Club founding member — tell us who you are and we&apos;ll be in touch within 48 hours.</p>
            <div className="cta-grid">
              {[
                { type: 'investor', icon: '💼', title: 'Investors & Funders',           body: 'Request the full investor package including the Appendix F ramp model, capital stack detail, and 5-year financial projections.' },
                { type: 'vendor',   icon: '🍳', title: 'Prospective Vendors',           body: 'Apply for an anchor stall, incubator slot, ghost kitchen bay, or commissary kitchen membership. Applications open now.' },
                { type: 'partner',  icon: '🤝', title: 'Community Partners',            body: 'NMSU, DACC, Visit Las Cruces, DLCP, Veterans Business Outreach — explore programming, workforce, and co-marketing partnerships.' },
                { type: 'cider',    icon: '🍺', title: 'Cider Club — Founding Members', body: 'Pre-register before Grand Opening to lock in founding-member pricing and perks permanently.' },
              ].map((card) => (
                <div key={card.type} className="cta-card" data-type={card.type}>
                  <div className="cta-card__icon" aria-hidden="true">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
            <form className="contact-form" id="contactForm" noValidate aria-label="Contact form">
              <h3 className="contact-form__heading">Send Us a Message</h3>
              <div className="contact-form__grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="cf-name">Full Name <span aria-hidden="true">*</span></label>
                  <input type="text" id="cf-name" name="name" className="form-input" placeholder="Jane Doe" required autoComplete="name" aria-required="true" />
                  <span className="form-field-error" id="err-name" role="alert" aria-live="polite" hidden>Please enter your name.</span>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="cf-email">Email Address <span aria-hidden="true">*</span></label>
                  <input type="email" id="cf-email" name="email" className="form-input" placeholder="jane@example.com" required autoComplete="email" aria-required="true" />
                  <span className="form-field-error" id="err-email" role="alert" aria-live="polite" hidden>Please enter a valid email address.</span>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="cf-type">I am a… <span aria-hidden="true">*</span></label>
                  <select id="cf-type" name="type" className="form-input form-select" required aria-required="true">
                    <option value="" disabled>Select one</option>
                    <option value="investor">Investor / Funder</option>
                    <option value="vendor">Vendor / Food Entrepreneur</option>
                    <option value="partner">Community / Institutional Partner</option>
                    <option value="cider">Cider Club Founding Member</option>
                    <option value="general">General Interest / Media</option>
                  </select>
                  <span className="form-field-error" id="err-type" role="alert" aria-live="polite" hidden>Please select your interest area.</span>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="cf-org">Organization <span className="form-label--opt">(optional)</span></label>
                  <input type="text" id="cf-org" name="organization" className="form-input" placeholder="Company or business name" autoComplete="organization" />
                </div>
              </div>
              <div className="form-group form-group--full">
                <label className="form-label" htmlFor="cf-message">Message <span aria-hidden="true">*</span></label>
                <textarea id="cf-message" name="message" className="form-input form-textarea" placeholder="Tell us about your interest in the Hub…" required aria-required="true" rows={4} />
                <span className="form-field-error" id="err-message" role="alert" aria-live="polite" hidden>Please enter a message.</span>
              </div>
              <div className="form-group form-group--full form-group--check">
                <label className="form-check">
                  <input type="checkbox" id="cf-newsletter" name="newsletter" value="yes" />
                  <span>Also add me to the newsletter for Grand Opening announcements and Cider Club updates.</span>
                </label>
              </div>
              <div className="contact-form__submit-wrap">
                <p className="contact-form__submit-nudge">We respond to every inquiry within 48 hours — no commitment required.</p>
                <button type="submit" className="btn btn--primary contact-form__submit" id="cfSubmit">
                  <span className="btn-label">Send Message →</span>
                  <span className="btn-spinner" aria-hidden="true" hidden />
                </button>
              </div>
              <div className="form-success contact-form__success" id="cfSuccess" hidden role="status" aria-live="polite">
                <strong>✓ Message received!</strong> We&apos;ll be in touch within 48 hours.
              </div>
              <div className="form-error contact-form__error" id="cfError" hidden role="alert" aria-live="assertive">
                Something went wrong. Please email us directly at{' '}
                <a href="mailto:info@lccullinaryhub.com">info@lccullinaryhub.com</a>.
              </div>
            </form>
            <div className="contact-info">
              <p>
                <strong>Las Cruces Culinary Innovation Hub</strong><br />
                Downtown Las Cruces, New Mexico<br />
                <a href="mailto:info@lccullinaryhub.com">info@lccullinaryhub.com</a>
              </p>
              <p className="contact-info__doc">
                Document Version 12.1 · Complete Edition · May 2026<br />
                Status: Active — For Investor &amp; Grant Distribution
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <p className="footer-brand__title">Las Cruces Culinary Innovation Hub</p>
              <p className="footer-brand__tag">A Culinary Incubator · Workforce Development Center · Craft Cider Destination for Southern New Mexico</p>
              <nav className="footer-social" aria-label="Social media links">
                <a href="https://www.instagram.com/lccullinaryhub" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com/lccullinaryhub" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  <span>Facebook</span>
                </a>
                <a href="https://www.tiktok.com/@lccullinaryhub" target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok" className="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/></svg>
                  <span>TikTok</span>
                </a>
              </nav>
            </div>
            <div className="footer-links">
              <nav className="footer-nav" aria-label="Footer navigation">
                <p className="footer-nav__heading">Explore</p>
                <ul role="list">
                  <li><a href="#opportunity">The Opportunity</a></li>
                  <li><a href="#concept">The Concept</a></li>
                  <li><a href="#cider">Craft Cider Bar</a></li>
                  <li><a href="#incubator">Vendor Model</a></li>
                  <li><a href="#financials">Investor Overview</a></li>
                  <li><a href="#impact">Community Impact</a></li>
                  <li><a href="#faq">FAQ</a></li>
                  <li><a href="#contact">Get Involved</a></li>
                </ul>
              </nav>
              <nav className="footer-nav" aria-label="Get involved navigation">
                <p className="footer-nav__heading">Get Involved</p>
                <ul role="list">
                  <li><a href="#contact" data-prefill="investor">Investor Inquiries</a></li>
                  <li><a href="#contact" data-prefill="vendor">Vendor Applications</a></li>
                  <li><a href="#contact" data-prefill="partner">Community Partnerships</a></li>
                  <li><a href="#contact" data-prefill="cider">Cider Club Pre-Register</a></li>
                  <li><a href="#newsletter">Newsletter Signup</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Las Cruces Culinary Innovation Hub. All rights reserved.</p>
            <p className="footer-disclaimer">
              Forward-looking financial projections are for informational purposes only and do not constitute an offer of securities.
              Prospective investors should review the full business plan and consult qualified advisors.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">↑</a>
    </>
  )
}
