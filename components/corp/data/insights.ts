// Nexus Capital Group — Thought Leadership & Insights Data

export interface Insight {
  slug:      string;
  category:  'Capital Markets' | 'Strategy' | 'Risk' | 'Digital' | 'Global';
  title:     string;
  subtitle:  string;
  date:      string;
  readTime:  string;
  author:    string;
  authorTitle: string;
  authorInitials: string;
  excerpt:   string;
  body:      string[];  // paragraphs
  keyTakeaways: string[];
  featured?: boolean;
}

export const insights: Insight[] = [
  {
    slug:           'sovereign-wealth-allocation-2025',
    category:       'Capital Markets',
    title:          'The Sovereign Wealth Reallocation: Where $10 Trillion Is Moving in 2025',
    subtitle:       'Shifting mandates from the GCC to Norway are rewriting global capital flows — and creating the most significant advisory opportunity in a decade.',
    date:           'May 2025',
    readTime:       '12 min read',
    author:         'Marcus Vane',
    authorTitle:    'Chief Investment Officer',
    authorInitials: 'MV',
    featured:       true,
    excerpt:
      'Sovereign wealth funds are undergoing their most consequential portfolio reorientation since the 2008 financial crisis — moving away from passive index exposure toward alternatives, infrastructure, and direct co-investments in ways that are reshaping advisory relationships globally.',
    body: [
      'The world\'s 100 largest sovereign wealth funds collectively manage approximately $10.5 trillion in assets. Over the past 18 months, Nexus Capital Group\'s Global Markets Intelligence team has tracked a structural reorientation in how these funds deploy capital — one that has profound implications for investment advisers, asset managers, and the companies seeking their investment.',
      'Three forces are driving this shift. First, the prolonged low-yield environment has made traditional fixed-income allocations insufficient to meet long-term obligations, pushing funds toward illiquid alternatives where return premiums remain substantial. Second, geopolitical pressures — from de-globalization to sanctions regimes — are incentivizing domestic investment mandates that require entirely different advisory relationships than cross-border diversification. Third, the ESG imperative has matured from a compliance checkbox into a genuine portfolio construction framework, with carbon-transition investments now commanding a dedicated allocation sleeve in over 60% of major SWF mandates.',
      'The GCC funds represent the most dramatic realignment. The Abu Dhabi Investment Authority, Saudi Arabia\'s Public Investment Fund, and Kuwait Investment Authority have collectively committed over $1.2 trillion to alternative assets over the next five years — a number that would have seemed implausible in 2019. The advisory implication is significant: these mandates demand advisers with deep sectoral expertise, on-the-ground presence in target markets, and the operational capability to manage large, complex, multi-jurisdiction transactions simultaneously.',
      'Norway\'s Government Pension Fund Global (GPFG) presents a contrasting case study. Having long resisted alternatives in favor of a transparent, index-heavy approach, the GPFG is now making its most significant strategic shift in twenty years — cautiously opening to unlisted infrastructure and real estate at a scale that makes it an immediate force in those markets. For advisers, Norway\'s deliberate, governance-heavy approach requires a fundamentally different engagement model than the speed and discretion demanded by GCC mandates.',
      'The advisory opportunity in this environment is not simply about transaction volume — it is about genuine intellectual partnership. Sovereign wealth funds at this scale of reorientation require advisers who can synthesize macroeconomic insight, sectoral expertise, regulatory intelligence, and portfolio construction capability into a single coherent advisory relationship. This is precisely the model Nexus Capital Group was built to provide.',
    ],
    keyTakeaways: [
      '$10.5T in SWF assets undergoing structural reorientation toward alternatives and direct investment',
      'GCC funds committing $1.2T+ to alternatives — demanding advisers with on-the-ground operational capability',
      'Norway\'s GPFG making its most significant strategic shift in 20 years',
      'ESG transition investments now a dedicated sleeve in 60%+ of major SWF mandates',
      'Advisory relationships must combine macro, sectoral, regulatory, and portfolio construction expertise simultaneously',
    ],
  },
  {
    slug:           'enterprise-transformation-failure-rates',
    category:       'Strategy',
    title:          'Why 70% of Transformations Fail — and What the Successful 30% Do Differently',
    subtitle:       'After advising 180+ enterprise transformations, our research identifies the six factors that separate sustained value creation from expensive restructuring exercises.',
    date:           'April 2025',
    readTime:       '10 min read',
    author:         'Priya Nair',
    authorTitle:    'Chief Strategy Officer',
    authorInitials: 'PN',
    featured:       true,
    excerpt:
      'The 70% failure rate for enterprise transformations is one of the most cited — and most misunderstood — statistics in management consulting. After tracking 180+ transformations over 15 years, our research reveals that failure is rarely about strategy quality. It is almost always about execution architecture.',
    body: [
      'The statistic is familiar: approximately 70% of large-scale corporate transformations fail to achieve their stated objectives. It has been cited in academic papers, boardroom presentations, and consulting proposals for decades. What it rarely comes with is a rigorous explanation of why — or, more usefully, what the successful 30% do systematically differently.',
      'Nexus Capital Group\'s Strategic Transformation practice has tracked 187 large-scale enterprise transformations across 34 industries over 15 years. Our longitudinal research reveals six factors that, when present simultaneously, correlate with successful transformation at a statistically significant level — and whose absence in any combination predicts failure with uncomfortable reliability.',
      'Factor one is what we call \'burning ambition\' — a transformation aspiration that is genuinely transformational, not incremental dressed up in transformation language. Organizations that set ambitious but achievable targets (30-40% performance improvement, not 5-10%) activate fundamentally different organizational energy. The goal must be challenging enough to require new approaches, not just harder work on existing ones.',
      'Factor two is accountability architecture. Successful transformations establish a governance structure where accountability for outcomes is personal, visible, and consequential. Program Management Offices that track activities (milestones, deliverables, meetings attended) rather than outcomes (revenue generated, cost removed, capability built) are a reliable leading indicator of eventual failure.',
      'Factor three — perhaps the most consistently underestimated — is talent. Not the transformation team\'s talent, but the quality of client-side talent embedded in the program. Organizations that free their best people to drive transformation, rather than protecting those individuals for \'business as usual,\' outperform their peers by a factor of 2.3x on value delivered.',
      'The remaining three factors — change velocity, communication fidelity, and capability building — are interconnected. Transformations that move too slowly lose organizational energy and executive patience. Communication that is technically accurate but emotionally absent fails to build the organizational commitment that sustains transformation through inevitable setbacks. And transformations that do not systematically build client-side capability are, at best, a temporary improvement — not a lasting competitive advantage.',
    ],
    keyTakeaways: [
      '70% transformation failure rate is real — but failure is execution architecture, not strategy quality',
      '6 success factors identified across 187 transformations in 34 industries over 15 years',
      '\'Burning ambition\' — 30-40% improvement targets, not 5-10% — activates fundamentally different organizational energy',
      'Organizations that embed their best talent in transformation outperform peers 2.3× on value delivered',
      'Transformations that don\'t build capability are temporary improvements, not competitive advantage',
    ],
  },
  {
    slug:           'basel-iv-strategic-opportunity',
    category:       'Risk',
    title:          'Basel IV Is Not a Compliance Exercise — It Is a Strategic Opportunity',
    subtitle:       'Financial institutions that treat the Basel IV transition as a regulatory burden will surrender competitive advantage to peers who recognize it as a capital optimization platform.',
    date:           'March 2025',
    readTime:       '9 min read',
    author:         'Sophia Laurent',
    authorTitle:    'Chief Risk Officer',
    authorInitials: 'SL',
    excerpt:
      'With the full Basel IV framework entering force across major jurisdictions through 2025-2026, most financial institutions are in compliance mode — managing capital impacts, updating internal models, and preparing regulatory submissions. The institutions that will emerge stronger are approaching it entirely differently.',
    body: [
      'Basel IV represents the most comprehensive revision to the global banking capital framework since Basel II. Its full implementation across the EU, UK, US, and Asian jurisdictions through 2025-2026 will affect how banks calculate risk-weighted assets, model credit and operational risk, and ultimately how much capital they must hold against their portfolios.',
      'The compliance narrative is dominant. Most institutions are focused on quantifying the capital impact of the output floor, updating their standardized approach calculations, and ensuring their internal model approvals remain intact. These are necessary activities — but they represent a floor, not a ceiling, for what strategic institutions should be doing with Basel IV.',
      'The strategic opportunity lies in capital optimization at a business-mix level. The new framework changes the relative capital cost of different business lines, counterparties, and product structures in ways that are highly institution-specific. Banks that build genuine analytical capability to understand these shifts — not just in aggregate but at desk, product, and counterparty level — can make informed decisions about where to grow, where to price differently, and where to exit.',
      'Consider the treatment of trade finance. Under Basel IV\'s standardized approach, the credit conversion factors for trade finance instruments have been revised in ways that benefit institutions with strong documentary trade capabilities and penalize those relying on undifferentiated revolving credit facilities. The capital-efficient institution of 2026 will have restructured its trade finance offering to maximize exposure to the former and minimize the latter — a strategic shift that compliance-focused institutions will miss entirely.',
    ],
    keyTakeaways: [
      'Basel IV full implementation across major jurisdictions through 2025-2026',
      'Capital optimization at business-mix level is the strategic opportunity compliance mode misses',
      'Output floor and revised standardized approach create institution-specific winners and losers',
      'Trade finance restructuring example: material capital efficiency gains for analytically prepared institutions',
      'Institutions building genuine Basel IV analytical capability now will have 12-18 month advantage over peers',
    ],
  },
  {
    slug:           'ai-advisory-transformation',
    category:       'Digital',
    title:          'The AI Advisory Moment: How Artificial Intelligence Is Transforming Capital Markets Counsel',
    subtitle:       'The first generation of AI-native advisory tools is not replacing human judgment — it is creating a new class of adviser who can synthesize intelligence at a scale previously impossible.',
    date:           'February 2025',
    readTime:       '11 min read',
    author:         'Kai Tanaka',
    authorTitle:    'Chief Digital Officer',
    authorInitials: 'KT',
    excerpt:
      'We are 18 months into the most significant technology transition in the history of investment advisory. The advisers who are thriving are not the ones who have adopted AI fastest — they are the ones who have adopted it most intelligently.',
    body: [
      'Investment advisory has always been an intelligence business — the synthesis of market data, regulatory intelligence, industry knowledge, and client-specific context into advice that is both strategically sound and practically executable. What has changed in the past 18 months is not the nature of that synthesis, but the scale at which it can be performed.',
      'Nexus Capital Group\'s NexusAI decision-support engine, deployed across our Capital Markets and Strategic Transformation practices in 2023, has generated measurable and independently verifiable improvements in advisory quality. Engagement cycle times have decreased by 34%. First-draft quality of transaction documentation has improved measurably, reducing revision cycles. And our advisers report spending significantly more time on the highest-value activities — client relationship, strategic judgment, and complex negotiation — and less time on information synthesis and document preparation.',
      'The implications for how advisory firms staff, train, and develop talent are profound. The junior analyst role that involved significant hours of information synthesis and first-draft preparation is being permanently altered. The firms that treat this as primarily a cost reduction opportunity will hollow out the talent pipeline that produces their next generation of senior advisers. The firms that treat it as a capability amplifier — keeping their junior talent but fundamentally changing what they do with their time — will develop advisers who are materially more capable at every career stage.',
      'On the client side, the AI transition creates both a transparency opportunity and a risk. Clients who understand how their advisers are using AI — and can evaluate the quality of that usage — will extract significantly more value from their advisory relationships. Clients who remain passive recipients of advice without understanding the intelligence infrastructure behind it will lose the ability to hold their advisers accountable for the quality of their synthesis.',
    ],
    keyTakeaways: [
      'NexusAI deployment achieved 34% reduction in advisory cycle time — independently verifiable',
      'AI is amplifying adviser capability, not replacing adviser judgment',
      'Junior talent pipeline risk: firms treating AI as cost reduction will hollow future senior adviser cohorts',
      'Client transparency imperative: understanding adviser AI usage enables genuine accountability',
      'First-mover advantage in AI-native advisory is closing — 2025 is the critical adoption window',
    ],
  },
  {
    slug:           'india-capital-markets-decade',
    category:       'Global',
    title:          'India\'s Capital Markets Decade: The Advisory Infrastructure Gap',
    subtitle:       'With $1.4 trillion in infrastructure investment planned through 2030 and a rapidly maturing equity culture, India represents the single largest advisory opportunity in emerging markets.',
    date:           'January 2025',
    readTime:       '8 min read',
    author:         'Priya Nair',
    authorTitle:    'Chief Strategy Officer',
    authorInitials: 'PN',
    excerpt:
      'India\'s capital markets are at an inflection point that the global advisory community has consistently underestimated. The combination of demographic momentum, infrastructure ambition, digital financial infrastructure, and deepening equity culture is creating advisory demand that current institutional capacity cannot meet.',
    body: [
      'India\'s GDP is expected to reach $5 trillion by 2027, making it the world\'s third-largest economy. Behind that headline number is a capital formation story of extraordinary complexity — $1.4 trillion in planned infrastructure investment, a domestic equity market with 90 million retail investors (up from 35 million in 2020), and a regulatory environment that is simultaneously ambitious and evolving.',
      'The advisory infrastructure gap is real and material. India\'s largest transactions — infrastructure privatizations, cross-border M&A, capital markets listings — increasingly require the kind of integrated, conflict-free advisory that the global tier-one firms were built to provide. But the on-the-ground presence, regulatory understanding, and relationship infrastructure required to win and execute these mandates cannot be built quickly. The firms that have invested patiently in India over the past decade are now positioned to capture a disproportionate share of what will be one of the most active advisory markets of the next ten years.',
      'Three specific opportunities stand out. The infrastructure privatization pipeline — roads, ports, airports, and power — represents a decade of transaction flow that requires advisers with deep sectoral knowledge, government relationship capability, and the ability to structure transactions that satisfy both domestic regulatory requirements and international investor expectations. The outbound M&A market, as Indian corporates use their strong equity valuations to acquire internationally, requires advisers with the global footprint and target-market expertise to identify, negotiate, and close cross-border transactions. And the domestic capital markets, where the depth and sophistication of institutional investor participation is growing rapidly, require advisers who understand how to position Indian issuers to an increasingly demanding domestic institutional base.',
    ],
    keyTakeaways: [
      'India on track for $5T GDP by 2027 — world\'s third-largest economy',
      '$1.4T infrastructure investment planned through 2030 — most significant advisory pipeline in EM',
      '90M retail equity investors — up from 35M in 2020 — creating unprecedented domestic capital market depth',
      'Advisory infrastructure gap: integrated conflict-free capability cannot be built quickly',
      'Three priority mandates: infrastructure privatization, outbound M&A, and domestic capital markets advisory',
    ],
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find(i => i.slug === slug);
}

export const categoryColors: Record<Insight['category'], string> = {
  'Capital Markets': 'border-corp-gold/40 text-corp-gold',
  'Strategy':        'border-corp-platinum/20 text-corp-platinum',
  'Risk':            'border-corp-steel/30 text-corp-steel',
  'Digital':         'border-corp-azure/50 text-corp-steel',
  'Global':          'border-corp-gold/25 text-corp-gold/80',
};
