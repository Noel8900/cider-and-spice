// hp-nav-hero.jsx — sticky nav + hero (Direction A) + trust bar

function HPNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [ribbon, setRibbon] = React.useState(() => {
    try { return !localStorage.getItem('cs-ribbon-dismissed'); } catch { return true; }
  });

  const dismissRibbon = () => {
    setRibbon(false);
    try { localStorage.setItem('cs-ribbon-dismissed', '1'); } catch {}
  };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ribbonH = ribbon ? 38 : 0;

  const navBg = scrolled ? 'rgba(22,14,7,0.96)' : 'transparent';
  const navBorder = scrolled ? `1px solid ${HP.border}` : '1px solid transparent';

  return (
    <>
      {ribbon && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 38, zIndex: 110, background: 'linear-gradient(90deg,rgba(26,16,8,.98),rgba(38,22,10,.98))', borderBottom: '1px solid rgba(196,98,45,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '0 48px' }}>
          <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: `${HP.wheat}`, opacity: .80 }}>
            <span style={{ color: HP.terracotta }}>✦</span> &nbsp;Founding cohort &nbsp;·&nbsp; <strong style={{ color: HP.terracotta }}>4 vendor spots remaining</strong> &nbsp;·&nbsp; Applications close Q3 2026
          </span>
          <a href="#cta" style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.2em', textTransform: 'uppercase', color: HP.parchment, background: HP.terracotta, padding: '5px 14px', textDecoration: 'none', fontWeight: 600, flexShrink: 0, transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#a8521f'}
            onMouseLeave={e => e.currentTarget.style.background = HP.terracotta}
          >Apply Now</a>
          <button onClick={dismissRibbon} aria-label="Dismiss" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: `${HP.cream}38`, fontSize: 18, lineHeight: 1, padding: '4px 6px', transition: 'color .2s' }}
            onMouseEnter={e => e.currentTarget.style.color = HP.cream}
            onMouseLeave={e => e.currentTarget.style.color = `${HP.cream}38`}
          >×</button>
        </div>
      )}
      <nav style={{ position: 'fixed', top: ribbonH, left: 0, right: 0, zIndex: 100, background: navBg, borderBottom: navBorder, backdropFilter: scrolled ? 'blur(14px)' : 'none', transition: 'background .4s ease, border-color .4s ease, backdrop-filter .4s ease, top .3s ease' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        {/* Logo */}
        <a href="#" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, fontWeight: 300, color: HP.cream, textDecoration: 'none', letterSpacing: '-.01em', flexShrink: 0 }}>
          Cider <em style={{ fontStyle: 'italic', color: HP.terracotta }}>&amp;</em> Spice
        </a>

        {/* Desktop links */}
        <div className="hp-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {[['The Space','#gallery'],['Vendors','#features'],['Incubator','#howitworks'],['Community','#community'],['Invest','#stats']].map(([l, h]) => (
            <a key={l} href={h} style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', color: `${HP.cream}58`, textDecoration: 'none', transition: 'color .25s' }}
              onMouseEnter={e => e.currentTarget.style.color = HP.cream}
              onMouseLeave={e => e.currentTarget.style.color = `${HP.cream}58`}
            >{l}</a>
          ))}
          <a href="#cta" style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', background: HP.terracotta, color: HP.parchment, textDecoration: 'none', padding: '9px 22px', fontWeight: 600, transition: 'background .25s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#a8521f'}
            onMouseLeave={e => e.currentTarget.style.background = HP.terracotta}
          >Claim Your Stall</a>
        </div>

        {/* Mobile hamburger */}
        <button className="hp-hamburger" onClick={() => setMenuOpen(o => !o)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 4 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: i === 1 ? 16 : 22, height: 1.5, background: `${HP.cream}80`, transition: 'width .25s' }} />)}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'rgba(22,14,7,.98)', borderTop: `1px solid ${HP.border}`, padding: '20px 28px 28px' }}>
          {[['The Space','#gallery'],['Vendors','#features'],['Incubator','#howitworks'],['Community','#community'],['Invest','#stats'],['Claim Your Stall','#cta']].map(([l, h]) => (
            <a key={l} href={h} onClick={() => setMenuOpen(false)} style={{ display: 'block', fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: HP.cream, textDecoration: 'none', padding: '14px 0', borderBottom: `1px solid ${HP.border}` }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
    </>
  );
}

function HPHero() {
  const parallaxRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: HP.bg }}>
      {/* Background with parallax + Ken Burns */}
      <div ref={parallaxRef} style={{ position: 'absolute', inset: '-8% 0', willChange: 'transform' }}>
        <img src={HP_IMGS.bar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', animation: 'hp-kenburns 14s ease-out both' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(28,18,9,.97) 0%, rgba(28,18,9,.72) 48%, rgba(28,18,9,.22) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(28,18,9,.96) 0%, transparent 52%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 80% at 5% 50%, rgba(196,98,45,.16) 0%, transparent 60%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: HP_GRAIN, opacity: .032, backgroundSize: '180px' }} />

      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 36, right: 36, width: 52, height: 52, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 52, height: 1, background: 'rgba(212,168,75,.2)' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 1, height: 52, background: 'rgba(212,168,75,.2)' }} />
      </div>
      <div style={{ position: 'absolute', bottom: 36, left: 36, width: 52, height: 52, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 52, height: 1, background: 'rgba(212,168,75,.2)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 1, height: 52, background: 'rgba(212,168,75,.2)' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1280, margin: '0 auto', padding: 'clamp(100px,12vw,140px) clamp(24px,5vw,72px) clamp(60px,8vw,100px)' }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36, animation: 'hp-fade-up .8s ease both', animationDelay: '.2s' }}>
          <div style={{ width: 36, height: 1, background: HP.terracotta, flexShrink: 0 }} />
          <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: '.35em', textTransform: 'uppercase', color: HP.terracotta }}>Opening Q1–Q2 2027 · Downtown Las Cruces, NM</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(52px,8vw,94px)', fontWeight: 300, lineHeight: .9, letterSpacing: '-.022em', color: HP.parchment, marginBottom: 28, maxWidth: 860, animation: 'hp-fade-up .95s ease both', animationDelay: '.38s' }}>
          Where Las Cruces<br />
          <em style={{ fontStyle: 'italic', color: HP.terracotta }}>Eats the World</em>
        </h1>

        {/* Wheat rule */}
        <div style={{ height: 1, background: `linear-gradient(90deg,${HP.wheat},transparent)`, marginBottom: 28, animation: 'hp-rule-expand .7s ease both', animationDelay: '.58s' }} />

        {/* Sub */}
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 'clamp(13px,1.4vw,15px)', lineHeight: 1.85, color: HP.wheat, opacity: .68, maxWidth: 480, marginBottom: 44, animation: 'hp-fade-up .8s ease both', animationDelay: '.68s' }}>
          The Borderland has extraordinary food talent — street cooks, home chefs, generational recipes. Cider &amp; Spice gives that talent a permanent downtown address.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 52, animation: 'hp-fade-up .8s ease both', animationDelay: '.82s' }}>
          {[
            { l: 'See the Opportunity', fill: true,  href: '#hall-os' },
            { l: 'Investor Overview',   fill: false, href: '#stats'    },
          ].map(({ l, fill, href }) => (
            <a key={l} href={href} style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', padding: '14px 34px', textDecoration: 'none', fontWeight: fill ? 600 : 400, background: fill ? HP.terracotta : 'transparent', color: fill ? HP.parchment : `${HP.wheat}a8`, border: fill ? 'none' : `1px solid rgba(245,236,215,.18)`, transition: 'all .25s', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.background = fill ? '#a8521f' : 'rgba(245,236,215,.06)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = fill ? HP.terracotta : 'transparent'; e.currentTarget.style.transform = 'none'; }}
            >{l}</a>
          ))}
        </div>

        {/* Stat badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, animation: 'hp-fade-up .8s ease both', animationDelay: '.98s' }}>
          {[['8,000 sq ft','Indoor Venue'],['Up to 13','Global Concepts'],['Up to 25 taps','Rotating Cider']].map(([n, l]) => (
            <div key={l} style={{ padding: '15px 20px', background: 'rgba(44,36,22,.62)', backdropFilter: 'blur(8px)', border: `1px solid rgba(245,236,215,.11)` }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 300, color: HP.terracotta, lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.22em', textTransform: 'uppercase', marginTop: 5, color: `${HP.wheat}48` }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#trustbar" aria-label="Scroll down" style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.3em', textTransform: 'uppercase', color: `${HP.wheat}40`, textDecoration: 'none', zIndex: 2 }}>
        <span>Explore</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'hp-bounce 1.8s ease-in-out infinite' }}><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </a>
    </section>
  );
}

function HPTrustBar() {
  const partners = ['City of Las Cruces','WESST Business Development','SCORE Mentors','Sandia National Laboratories','New Mexico State University','Elevate Las Cruces','Visit Las Cruces','NM MainStreet Program'];
  const doubled = [...partners, ...partners];
  return (
    <div id="trustbar" style={{ background: HP.bgDeep, borderTop: `1px solid ${HP.border}`, borderBottom: `1px solid ${HP.border}`, padding: '22px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        <div style={{ flexShrink: 0, padding: '0 36px 0 28px', borderRight: `1px solid ${HP.border}`, marginRight: 32 }}>
          <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.32em', textTransform: 'uppercase', color: `${HP.cream}28`, whiteSpace: 'nowrap' }}>Endorsed By</span>
        </div>
        <div style={{ overflow: 'hidden', flex: 1, WebkitMaskImage: 'linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%)', maskImage: 'linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%)' }}>
          <div style={{ display: 'flex', width: 'max-content', animation: 'hp-marquee 32s linear infinite' }}>
            {doubled.map((p, i) => (
              <span key={i} style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.28em', textTransform: 'uppercase', color: `${HP.cream}38`, padding: '0 40px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 40 }}>
                <span style={{ color: `${HP.gold}55`, fontSize: 10 }}>✦</span>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HPNav, HPHero, HPTrustBar, HPMobileCta });

function HPMobileCta() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById('hero');
      const ctaEl  = document.getElementById('cta');
      if (!heroEl) return;
      const heroPast = heroEl.getBoundingClientRect().bottom < 0;
      const ctaNear  = ctaEl ? ctaEl.getBoundingClientRect().top < window.innerHeight * 1.2 : false;
      setShow(heroPast && !ctaNear);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="hp-mob-cta" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90, background: 'rgba(16,10,5,.96)', backdropFilter: 'blur(14px)', borderTop: `1px solid rgba(196,98,45,.25)`, padding: 'clamp(10px,2vw,14px) 20px', paddingBottom: 'max(14px,env(safe-area-inset-bottom))', gap: 10, alignItems: 'center', transform: show ? 'translateY(0)' : 'translateY(100%)', transition: 'transform .4s ease' }}>
      <a href="#cta" style={{ flex: 1, fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', background: HP.terracotta, color: HP.parchment, textDecoration: 'none', padding: '14px', textAlign: 'center', fontWeight: 600, display: 'block', transition: 'background .2s' }}
        onMouseEnter={e => e.currentTarget.style.background='#a8521f'} onMouseLeave={e => e.currentTarget.style.background=HP.terracotta}
      >Apply for a Stall</a>
      <a href="Cider Club.html" style={{ flex: 1, fontFamily: "'Josefin Sans',sans-serif", fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', border: `1px solid rgba(212,168,75,.28)`, color: `${HP.gold}cc`, textDecoration: 'none', padding: '13px', textAlign: 'center', display: 'block', transition: 'all .2s' }}
        onMouseEnter={e => e.currentTarget.style.borderColor='rgba(212,168,75,.55)'} onMouseLeave={e => e.currentTarget.style.borderColor='rgba(212,168,75,.28)'}
      >Cider Club →</a>
    </div>
  );
}
